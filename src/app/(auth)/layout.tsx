import React from "react";
import './layout.style.scss';

export default function AuthLayout({children}: React.PropsWithChildren) {
    return (
        <>
            <div className={'w-[100%] h-[100vh] justify-center items-center flex flex-col bg'}>
                {children}
            </div>
        </>
    )
}