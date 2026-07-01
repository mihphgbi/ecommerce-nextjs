export type ProductItem = {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    quality?: number;
    sold_items?: number;
    price?: number;
    is_sale?: boolean;
    sale_price?: number;
    saler_id?: string;
    saler?: {
        id?: string;
        username?: string;
        email?: string;
        full_name?: string | null;
    };
    product_type_id?: string;
    product_type?: ProductType;
};

export type ProductType = {
    id?: string;
    name?: string;
};
