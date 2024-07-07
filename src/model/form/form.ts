export type SignUpFieldType = {
    username: string;
    password: string;
    fullName: string;
    rePassword: string;
    email: string;
    phone: string;
    address: string;
    isSeller?: boolean;
};
export type SignInFieldType = {
    username: string;
    password: string;
    remember?: boolean;
};