import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import {authOptions} from "@/lib/auth";
import { z } from 'zod';

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL

export const getUserProfile = () => {

}
export const createUser = async (payload: any) => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_APP_URL}/api/auth/register`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}
