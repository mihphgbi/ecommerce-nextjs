"use client"

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {SessionProvider} from "next-auth/react"
// import { Toaster } from "react-hot-toast"
import React from "react";
import StoreProvider from "@/app/ProviderStore";
import {Session} from "next-auth";

interface ProvidersProps {
    children: React.ReactNode;
    session?: Session | null;
}

const ClientProvider = ({ children, session }: ProvidersProps) => {
    // const queryClient = new QueryClient()

    return (
        // <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
            <StoreProvider>
                {/*<Toaster />*/}
                {children}
            </StoreProvider>
        </SessionProvider>
        // </QueryClientProvider>
    )
}

export default ClientProvider