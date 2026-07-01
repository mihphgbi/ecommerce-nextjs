'use client';
import {useEffect} from "react";
import {signOut, useSession} from "next-auth/react";

const SessionExpirationGuard = () => {
    const {data: session, status} = useSession();

    useEffect(() => {
        if (status !== 'authenticated' || !session?.expires) {
            return;
        }

        const expiresAt = new Date(session.expires).getTime();
        const timeout = expiresAt - Date.now();

        if (timeout <= 0) {
            signOut({callbackUrl: '/sign-in'});
            return;
        }

        const timer = window.setTimeout(() => {
            signOut({callbackUrl: '/sign-in'});
        }, timeout);

        return () => window.clearTimeout(timer);
    }, [session?.expires, status]);

    return null;
};

export default SessionExpirationGuard;
