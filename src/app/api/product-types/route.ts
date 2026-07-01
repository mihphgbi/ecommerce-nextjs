import prisma from "@/lib/db/prisma";
import {getAuthSession} from "@/lib/auth";
import {NextRequest, NextResponse} from "next/server";

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
        const productTypes = await prisma.productType.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: "asc",
            },
        });

        return NextResponse.json({data: productTypes});
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        );
    }
}

export async function POST(req: NextRequest) {
    const forbiddenResponse = await requireAgent();
    if (forbiddenResponse) return forbiddenResponse;

    try {
        const body = await req.json();
        const name = typeof body.name === "string" ? body.name.trim() : "";

        if (!name) {
            return NextResponse.json(
                {error: "name is required"},
                {status: 400}
            );
        }

        const productType = await prisma.productType.create({
            data: {
                name,
            },
        });

        return NextResponse.json({data: productType}, {status: 201});
    } catch (error) {
        return NextResponse.json(
            {error: "Internal server error - create product type"},
            {status: 500}
        );
    }
}
