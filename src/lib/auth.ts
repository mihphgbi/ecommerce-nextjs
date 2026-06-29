import {getServerSession, NextAuthOptions} from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db/prisma";

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
                    if (!credentials?.username || !credentials?.password) {
                        return null;
                    }

                    const user = await prisma.user.findFirst({
                        where: {
                            username: credentials.username,
                        }
                    });

                    if (user) {
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
            const t: any = token as any;

            if (user) {
                const u: any = user as any;
                t.id = u.id
                t.email = u.email
                t.username = u.username
                t.isAgent = u.isAgent
            } else if (t.id) {
                const currentUser = await prisma.user.findUnique({
                    where: {
                        id: t.id,
                    },
                });

                if (currentUser) {
                    t.isAgent = currentUser.is_agent;
                }
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
        redirect({url, baseUrl}) {
            if (url.startsWith('/')) {
                return `${baseUrl}${url}`;
            }

            if (new URL(url).origin === baseUrl) {
                return url;
            }

            return baseUrl;
        },
    },
};
export const getAuthSession = () => getServerSession(authOptions)
