import {getServerSession, NextAuthOptions} from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";

// Resolve an app base URL for server-side usage. Prefer explicit env vars, then fallback to localhost.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || `http://localhost:${process.env.PORT || 3000}`;
export const authOptions: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials: any) {
                try {
                    // Build URL safely using the resolved APP_URL so we don't accidentally call "undefined/..."
                    const endpoint = new URL('/api/user', APP_URL);
                    endpoint.searchParams.set('name', credentials.username || '');

                    // Optional debug: if APP_URL looks suspicious, surface it in logs
                    if (!APP_URL) console.error('APP_URL is not defined (processed to empty string). Check NEXT_PUBLIC_APP_URL or NEXTAUTH_URL env vars.');

                    const response = await fetch(endpoint.toString(), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json()
                    const user = data.data;

                    if (user && Object.keys(user).length > 0) {
                        const bcrypt = require('bcrypt');
                        const passwordCorrect = await bcrypt.compare(credentials.password, user.password);
                        if (passwordCorrect) {
                            return {
                                id: user.id,
                                username: user.username,
                                email: user.email,
                                isAgent: user.is_agent,
                                isAuthenticate: user.is_authenticate,
                                phone: user.phone,
                                fullName: user.full_name
                            };
                        }
                        // incorrect password -> return null to indicate failed auth
                        return null;
                    }

                    // user not found -> return null (NextAuth will treat as failed credentials)
                    return null;
                } catch (error) {
                    // log and return null so NextAuth doesn't throw and redirect to error page
                    console.error('Authorize error', error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 2 * 24 * 60 * 60
    },
    pages: {
        signIn: '/sign-in',
        // When authentication fails, keep the user on the sign-in page (or point to a custom error page)
        error: '/sign-in'
    },
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                const t: any = token as any;
                const u: any = user as any;
                t.id = u.id
                t.email = u.email
                t.username = u.username
                t.isAgent = u.isAgent
            }

            return token
        },
        async session({token, session}) {
            if (session.user) {
                const s: any = session;
                const t: any = token as any;
                s.user.id = t.id
                s.user.username = t.username
                s.user.email = t.email
                s.user.isAgent = t.isAgent
            }

            return session
        },
        redirect() {
            return '/'
        },
    },
};
export const getAuthSession = () => getServerSession(authOptions)