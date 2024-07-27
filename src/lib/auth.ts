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
                        console.log("USER FOUND");
                            return {
                                id: user.id,
                                name: user.username,
                                email: user.email,
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
                token.name = user.name
            }

            return token
        },
        async session({ token, session }) {
            if (session.user) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
            }

            return session
        },
        redirect() {
            return '/'
        },
    },
};
export const getAuthSession = () => getServerSession(authOptions)