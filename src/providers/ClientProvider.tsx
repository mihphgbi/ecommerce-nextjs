"use client"

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
// import { Toaster } from "react-hot-toast"
import React from "react";
import {getServerSession} from "next-auth";

const ClientProvider = ({children}: { children: React.ReactNode }) => {
    // const queryClient = new QueryClient()
    const session = getServerSession();

    return (
        // <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
                {/*<Toaster />*/}
                {children}
            </SessionProvider>
        // </QueryClientProvider>
    )
}

export default ClientProvider