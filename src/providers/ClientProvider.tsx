"use client"

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {SessionProvider} from "next-auth/react"
// import { Toaster } from "react-hot-toast"
import React from "react";
import StoreProvider from "@/app/ProviderStore";

const ClientProvider = ({children}: { children: React.ReactNode }) => {
    // const queryClient = new QueryClient()

    return (
        // <QueryClientProvider client={queryClient}>
        <SessionProvider>
            <StoreProvider>
                {/*<Toaster />*/}
                {children}
            </StoreProvider>
        </SessionProvider>
        // </QueryClientProvider>
    )
}

export default ClientProvider