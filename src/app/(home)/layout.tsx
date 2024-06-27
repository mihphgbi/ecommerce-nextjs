import React from "react";
import NavBar from "@/app/components/layout/NavBar";
import Footer from "@/app/components/layout/Footer";


export default function IndexLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            <NavBar/>
            {children}
            <Footer/>
        </>
    )
}