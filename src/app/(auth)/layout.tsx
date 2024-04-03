import React from "react";

export default async function AuthLayout({children}: React.PropsWithChildren) {
    // const session = await getAuthSession()
    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    )
}