import React from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export default function IndexLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            <NavBar/>
            {children}
            <Footer/>
        </>
    )
}