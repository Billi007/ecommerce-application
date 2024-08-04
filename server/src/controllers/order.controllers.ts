import { Request,Response } from "express";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.models.js";
import { reduceStock, revaliadteCache } from "../utils/features.js";
import { nodeCache } from "../app.js";

const newOrder = async(req:Request<{},{}, NewOrderRequestBody>,res:Response) => {
const {shippingCharges,shippingInfo,orderItems,tax,discount,subTotal,total,user} = req.body;

try {
if(!user || !shippingInfo || !orderItems || !tax || !subTotal || !total){
    return res.json({
        status: 400,
        message: 'Missing required fields'
    });
}
const order = await Order.create({
    shippingCharges,
    shippingInfo,
    tax,
    discount,
    orderItems,
    user,
    subTotal,
    total
});
await reduceStock(orderItems);
await revaliadteCache({
    admin: true, 
    order: true, 
    product: true, 
    userId: order.user,
    productId: order.orderItems.map(i => String(i.productId))
});

return res.json({
    status: 201,
    message: 'Order placed successfully',
    order
});

} catch (error) {
    return res.status(500).json({
        status: 500,
        message: 'Failed to create new order'
    });
}
}

const myOrder = async(req: Request,res:Response) => {
    const {id} = req.query;
    const key = `my-order-${id}`
    
    try {
    let order = [];
    if(nodeCache.has(key)) order = JSON.parse(nodeCache.get(key)!);
    else{
    order = await Order.find({user: id});
    nodeCache.set(key, JSON.stringify(order));
    }

    return res.json({
        status: 201,
        order
    });
    
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'error fetching orders'
        });
    }
}

const allOrder = async(req: Request,res:Response) => {
    const key = `all-order`

    try {
    let order = [];
    if(nodeCache.has(key)) order = JSON.parse(nodeCache.get(key)!);

    else{
     order = await Order.find().populate("user", "name");
     nodeCache.set(key, JSON.stringify(order));
    }

    return res.json({
        status: 201,
        order
    });
    
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'error fetching orders'
        });
    }
};

const singleOrder = async(req: Request,res:Response) => {
    const {id} = req.params;
    const key = `order-${id}`

    try {
    let order;
    if(nodeCache.has(key)) order = JSON.parse(nodeCache.get(key)!);

    else{
     order = await Order.findById(id).populate("user", "name");
     if(!order){
        res.json({
            status: 404,
            message: 'Order not found.'
        });
     }
     nodeCache.set(key, JSON.stringify(order));
    }

    return res.json({
        status: 201,
        order
    });
    
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'error fetching orders'
        });
    }
};

const processOrder = async(req: Request, res:Response) => {
const { id } = req.params;
try {
const order = await Order.findById(id);
if(!order){
    return res.json({
        status: 404,
        message: 'Order not found.'
    });
}
switch (order.status) {
    case "Processing":
      order.status = "Shipped";
      break;
    case "Shipped":
      order.status = "Delivered";
      break;
    default:
      order.status = "Delivered";
      break;
  }
await order.save();
await revaliadteCache({
    product: false,
    order: true,
    admin: true, 
    userId: order.user, 
    orderId: String(order._id)
});

return res.json({
    status: 200,
    message: 'Order processed successfully.',
});
} catch (error) {
return res.json({
    status: 500,
    message: 'Failed to process order.'
});
}};

const deleteOrder = async(req: Request, res:Response) => {
    const { id } = req.params;
    try {
    const order = await Order.findById(id);
    if(!order){
        return res.json({
            status: 404,
            message: 'Order not found.'
        });
    }
    await order.deleteOne();
    await revaliadteCache({
        product: false,
        order: true,
        admin: true, 
        userId: order.user, 
        orderId: String(order._id)
    });
    
    return res.json({
        status: 200,
        message: 'Order deleted successfully.',
    });
    } catch (error) {
    return res.json({
        status: 500,
        message: 'Failed to delete order.'
    });
    }}
export {newOrder, myOrder,allOrder, singleOrder, processOrder, deleteOrder}
