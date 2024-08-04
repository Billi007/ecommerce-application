import {Request, Response, NextFunction} from 'express'
export interface NewUserRequestBody {
    userName: string;
    password: string;
    email: string;
    image: string;
    gender: string;
    _id: string;
    dob: Date;
  }
  export interface NewProductRequestBody {
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
    image: string;
  }
  
  export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response<any, Record<string, any>>>;

  export type searchREquestQuerry ={
    search?: string;
    price? :number;
    category?: string;
    sortBy? : string;
    page?: string;
  }

  export interface BaseQuery {
    name? :{
      $regex: string;
      $options: string;
    }
    price?:{
      $lte: number;
  }
  category?: string
  }

  export type invalidcacheType = {
  product? : boolean;
  order? : boolean;
  admin? : boolean;
  userId? : string;
  orderId? : string;
  productId? : string | string[];
  }
   
  export type orderItemType = {
    name: string;
    image: string;
    price: number;
    quantity: number;
    productId: string;
  }

  export type shippingInfoType = {
   address: string;
   city: string;
   state: string;
   country: string;
   pincode: number;
  }

  export interface NewOrderRequestBody {
  shippingInfo: shippingInfoType;
  user: string;
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  orderItems: orderItemType[];
  }