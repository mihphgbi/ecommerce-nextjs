'use client';
import React from "react";
import NavBar from "@/app/components/navigations/nav-bar";
import Footer from "@/app/components/footer/footer";
import ToastAlert from "@/app/components/toast/toast";
import {useAppSelector} from "@/lib/redux/hook";


export default function IndexLayout({children}: {children: React.ReactNode}) {
    const {alertStatus, isOpenAlert, msgAlert} = useAppSelector((state: any) => state.layout)
    return (
        <>
            <NavBar/>
            {
                isOpenAlert &&
				<ToastAlert  open={isOpenAlert} type={alertStatus} message={msgAlert}></ToastAlert>
            }
            {children}
            <Footer/>
        </>
    )
}