import React from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export default function LobbyLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <NavBar/>
                {children}
            <Footer/>
        </div>
    )
}