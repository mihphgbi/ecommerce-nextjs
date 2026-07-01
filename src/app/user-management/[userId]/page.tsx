import React from "react";
import {redirect} from "next/navigation";
import {getAuthSession} from "@/lib/auth";
import prisma from "@/lib/db/prisma";
import UserInformation from "@/app/user-management/[userId]/user-information";

type UserManagementProps = {
    params: {
        userId: string;
    };
};

const objectIdRegex = /^[a-f\d]{24}$/i;

export default async function UserManagement({params}: UserManagementProps) {
    const session = await getAuthSession();
    const sessionUser = session?.user as any;
    const sessionUserId = sessionUser?.id;
    const currentPath = `/user-management/${params.userId}`;
    const requestedUserId = decodeURIComponent(params.userId).replace(/^useId=/, '');

    if (!sessionUser) {
        redirect(`/sign-in?callbackUrl=${encodeURIComponent(currentPath)}`);
    }

    const userFilters = [
        ...(sessionUserId && objectIdRegex.test(sessionUserId) ? [{id: sessionUserId}] : []),
        ...(sessionUser.email ? [{email: sessionUser.email}] : []),
        ...(sessionUser.username ? [{username: sessionUser.username}] : []),
    ];

    if (userFilters.length === 0) {
        redirect('/sign-in');
    }

    const user = await prisma.user.findFirst({
        where: {
            OR: userFilters,
        },
        select: {
            id: true,
            username: true,
            email: true,
            full_name: true,
            phone: true,
            address: true,
            is_agent: true,
            is_authenticate: true,
            createdAt: true,
        },
    });

    if (!user) {
        redirect('/sign-in');
    }

    if (requestedUserId !== 'me' && requestedUserId !== user.id) {
        redirect(`/user-management/useId=${user.id}`);
    }

    if (requestedUserId === 'me') {
        redirect(`/user-management/useId=${user.id}`);
    }

    return <UserInformation user={{
        ...user,
        createdAt: user.createdAt.toISOString(),
    }}/>
}
