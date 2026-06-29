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

const parseProductData = (body: any) => {
    const isSale = Boolean(body.is_sale);

    return {
        name: parseRequiredString(body.name, "name"),
        description: parseOptionalString(body.description),
        image: parseOptionalString(body.image),
        quality: parseNumber(body.quality, "quality"),
        price: parseNumber(body.price, "price"),
        is_sale: isSale,
        sale_price: isSale ? parseNumber(body.sale_price, "sale_price") : null,
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

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({data: products})
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

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id') || '';

    if (!id) {
        return NextResponse.json(
            {error: "Product id is required"},
            {status: 400}
        );
    }

    try {
        const product = await prisma.product.delete({
            where: {
                id: id
            }
        })
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
        const body = await req.json()
        const product = await prisma.product.create({data: parseProductData(body)})

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
        const product = await prisma.product.update({
            where: {
                id: id,
            },
            data: parseProductData(body),
        })
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
