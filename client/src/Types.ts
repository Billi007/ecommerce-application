export type OrderItemType = {
    name: string;
    photo: string;
    price: number;
    quantity: number;
    _id: string;
}

export type OrderType = {
    name: string;
    address: string;
    city: string;
    country: string;
    state: string;
    pincode: number;
    status: "Processing" | "Shipped" | "Delivered";
    subTotal: number;
     discount: number;
     tax: number;
     totalAmount: number;
    shippingCharge: number;
    orderItem: OrderItemType[];
    _id: string;
}