import React from "react";
import './layout.style.scss';

export default function AuthLayout({children}: React.PropsWithChildren) : React.ReactElement{
    return (
        <>
            <div className={'auth-layout bg'}>
                {children}
            </div>
        </>
    )
}
