import React from "react";

export default function AuthLayout({children}: React.PropsWithChildren) {
    return (
        <>
            <div className={'w-[100%] h-[100vh] justify-center items-center flex flex-col'}>
                {children}
            </div>
        </>
    )
}