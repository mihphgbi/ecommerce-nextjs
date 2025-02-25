import {getServerSession, NextAuthOptions} from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL
export const authOptions: NextAuthOptions= {
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
            async authorize(credentials: any, req) {
                try {
                    const response = await fetch(`${NEXT_PUBLIC_APP_URL}/api/user?name=${credentials.username}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json()
                    const user = data.data;

                    if (Object.keys(user).length > 0) {
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
                    } else {
                        return new Error('User not found');
                    }
                }
                catch (error) {
                    throw new Error ('Login fail')
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 2 * 24 * 60 * 60
    },
    pages: {
        signIn: '/sign-in'
    },
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.username = user.username
                token.isAgent = user.isAgent
            }

            return token
        },
        async session({ token, session }) {
            console.log("=========token",token)
            if (session.user) {
                session.user.id = token.id
                session.user.username = token.username
                session.user.email = token.email
                session.user.isAgent = token.isAgent
            }

            return session
        },
        redirect() {
            return '/'
        },
    },
};
export const getAuthSession = () => getServerSession(authOptions)