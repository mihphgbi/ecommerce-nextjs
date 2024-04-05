import React from "react";
import NavBar from "@/components/layout/NavBar";

export default function LobbyLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <NavBar/>
                {children}
        </div>
    )
}