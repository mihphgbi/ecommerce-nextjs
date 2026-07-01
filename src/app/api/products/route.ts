import prisma from "@/lib/db/prisma";
import {getAuthSession} from "@/lib/auth";
import {NextRequest, NextResponse} from "next/server";

const parseOptionalString = (value: unknown) => {
    return typeof value === "string" && value.trim() ? value.trim() : null;
}

const parseRequiredString = (value: unknown, fieldName: string) => {
    if (typeof value !== "string" || !value.trim()) {
        throw new Error(`${fieldName} is required`);
    }

    return value.trim();
}

const parseNumber = (value: unknown, fieldName: string) => {
    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue)) {
        throw new Error(`${fieldName} must be a number`);
    }

    return parsedValue;
}

const parsePositiveInteger = (value: string | null, fallback: number, maxValue?: number) => {
    const parsedValue = Number(value);

    if (!Number.isInteger(parsedValue) || parsedValue < 1) {
        return fallback;
    }

    return maxValue ? Math.min(parsedValue, maxValue) : parsedValue;
}

const isValidObjectId = (value: string) => /^[a-f\d]{24}$/i.test(value);

const parseProductData = (body: any) => {
    const isSale = Boolean(body.is_sale);

    return {
        name: parseRequiredString(body.name, "name"),
        description: parseOptionalString(body.description),
        image: parseOptionalString(body.image),
        quality: parseNumber(body.quality, "quality"),
        sold_items: body.sold_items === undefined ? 0 : parseNumber(body.sold_items, "sold_items"),
        price: parseNumber(body.price, "price"),
        is_sale: isSale,
        sale_price: isSale ? parseNumber(body.sale_price, "sale_price") : null,
        product_type_id: parseOptionalString(body.product_type_id),
    };
}

const requireAgent = async () => {
    const session = await getAuthSession();

    if (!(session?.user as any)?.isAgent) {
        return NextResponse.json(
            {error: "Forbidden"},
            {status: 403}
        );
    }

    return null;
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const productTypeId = searchParams.get('product_type_id') || searchParams.get('type_id') || '';
    const isSale = searchParams.get('is_sale');
    const sortBy = searchParams.get('sort_by');
    const isAgentOnly = searchParams.get('agent_only') === 'true';
    const page = parsePositiveInteger(searchParams.get('page'), 1);
    const limit = parsePositiveInteger(searchParams.get('limit'), 12, 100);
    const skip = (page - 1) * limit;

    if (productTypeId && !isValidObjectId(productTypeId)) {
        return NextResponse.json(
            {error: "product_type_id must be a valid ObjectId"},
            {status: 400}
        );
    }

    let salerId = '';

    if (isAgentOnly) {
        const session = await getAuthSession();
        salerId = (session?.user as any)?.id;

        if (!(session?.user as any)?.isAgent || !salerId) {
            return NextResponse.json(
                {error: "Forbidden"},
                {status: 403}
            );
        }

        if (!isValidObjectId(salerId)) {
            return NextResponse.json(
                {error: "Agent id must be a valid ObjectId"},
                {status: 400}
            );
        }
    }

    const where = {
        ...(productTypeId ? {product_type_id: productTypeId} : {}),
        ...(isSale === 'true' ? {is_sale: true} : {}),
        ...(isSale === 'false' ? {is_sale: false} : {}),
        ...(isAgentOnly ? {saler_id: salerId} : {}),
    };

    try {
        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where: Object.keys(where).length ? where : undefined,
                select: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    quality: true,
                    sold_items: true,
                    price: true,
                    is_sale: true,
                    sale_price: true,
                    saler_id: true,
                    saler: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                            full_name: true,
                        },
                    },
                    product_type_id: true,
                    product_type: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                orderBy: sortBy === 'sold_items' ? [
                    {sold_items: "desc"},
                    {id: "desc"},
                ] : {
                    id: "desc",
                },
                skip,
                take: limit,
            }),
            prisma.product.count({where: Object.keys(where).length ? where : undefined}),
        ]);
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            data: products,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        );
    }
}

export async function DELETE(req: NextRequest) {
    const forbiddenResponse = await requireAgent();
    if (forbiddenResponse) return forbiddenResponse;
    const session = await getAuthSession();
    const salerId = (session?.user as any)?.id;

    if (!salerId) {
        return NextResponse.json(
            {error: "Agent id is required"},
            {status: 401}
        );
    }

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id') || '';

    if (!id) {
        return NextResponse.json(
            {error: "Product id is required"},
            {status: 400}
        );
    }

    try {
        const product = await prisma.product.deleteMany({
            where: {
                id: id,
                saler_id: salerId,
            }
        })

        if (product.count === 0) {
            return NextResponse.json(
                {error: "Product not found"},
                {status: 404}
            );
        }

        return NextResponse.json({data: product});
    } catch (error) {
        return NextResponse.json(
            {error: 'Internal server error - delete'},
            {status: 500}
        );
    }
}

export async function POST(req: NextRequest) {
    const forbiddenResponse = await requireAgent();
    if (forbiddenResponse) return forbiddenResponse;

    try {
        const session = await getAuthSession();
        const salerId = (session?.user as any)?.id;

        if (!salerId) {
            return NextResponse.json(
                {error: "Agent id is required"},
                {status: 401}
            );
        }

        const body = await req.json()
        const product = await prisma.product.create({
            data: {
                ...parseProductData(body),
                saler_id: salerId,
            }
        })

        return NextResponse.json({data: product}, {status: 201})
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {error: error.message},
                {status: 400}
            );
        }

        return NextResponse.json(
            {error: 'Internal server error - create'},
            {status: 500}
        );
    }
}

export async function PUT(req: NextRequest) {
    const forbiddenResponse = await requireAgent();
    if (forbiddenResponse) return forbiddenResponse;
    const session = await getAuthSession();
    const salerId = (session?.user as any)?.id;

    if (!salerId) {
        return NextResponse.json(
            {error: "Agent id is required"},
            {status: 401}
        );
    }

    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get('id') || '';

        if (!id) {
            return NextResponse.json(
                {error: "Product id is required"},
                {status: 400}
            );
        }

        const body = await req.json()
        const product = await prisma.product.updateMany({
            where: {
                id: id,
                saler_id: salerId,
            },
            data: parseProductData(body),
        })

        if (product.count === 0) {
            return NextResponse.json(
                {error: "Product not found"},
                {status: 404}
            );
        }

        return NextResponse.json({data: product})
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {error: error.message},
                {status: 400}
            );
        }

        return NextResponse.json(
            {error: 'Internal server error - update'},
            {status: 500}
        );
    }
}
