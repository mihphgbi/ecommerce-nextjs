"use client"

import React from "react";
import {Session} from "next-auth";
import {SessionProvider} from "next-auth/react"

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import StoreProvider from "@/providers/provider-store";

interface ProvidersProps {
    children: React.ReactNode;
    session?: Session | null;
}

const ClientProvider = ({children, session}: ProvidersProps) => {
    // const queryClient = new QueryClient()

    return (
        // <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
            <StoreProvider>
                {children}
            </StoreProvider>
        </SessionProvider>
        // </QueryClientProvider>
    )
}

export default ClientProvider