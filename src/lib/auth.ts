// import { PrismaAdapter } from '@next-auth/prisma-adapter'
import {getServerSession, NextAuthOptions} from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db/prisma";


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
            async authorize(credentials, req) {
                // console.log({ credentials });

                /* GET User details */
                const user = await prisma.User.findFirst({
                    where: {
                        email: credentials.username,
                    }
                });

                // console.log(user);

                if (user.length > 0) {
                    console.log("USER FOUND");
                    const passwordCorrect = await compare(credentials.password, user.password);

                    console.log(passwordCorrect);  // True or False

                    if (passwordCorrect) {
                        return {
                            id: user.id,
                            name: user.username,
                            email: user.email,
                        };
                    }
                }

                console.log("USER NOT FOUND");
                return null;
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