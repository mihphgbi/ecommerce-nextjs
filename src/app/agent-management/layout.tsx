'use client';
import React from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";


export default function AgentManagementLayout({children}: {children: React.ReactNode}) {
    const {data: session} = useSession();
    const router = useRouter();

    return (
        <>
            {!session ? children : router.push('/')}
        </>
    )
}