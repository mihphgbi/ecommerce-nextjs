import React from "react";
import NavBar from "@/app/components/navigations/nav-bar";
import Footer from "@/app/components/footer/footer";


export default function IndexLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            <NavBar/>
            {children}
            <Footer/>
        </>
    )
}