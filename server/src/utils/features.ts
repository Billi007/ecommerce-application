import { Order } from "../models/order.models.js";
import { Product } from "../models/product.model.js";
import { nodeCache } from "../app.js";
import { invalidcacheType, orderItemType } from "../types/types.js"

const revaliadteCache = async ({product, order, admin, userId, orderId,productId}: invalidcacheType) => {
if(product){
const productArr: string[] = ["latest-product","admin-product", "categories"];

if(typeof productId === "string") productArr.push(`product-${productId}`);
if(typeof productId === "object") productId.forEach(i => productArr.push(`product-${i}`))
nodeCache.del(productArr);
};

if(order){
const orderArr: string[] = ["all-order", `my-order-${userId}`, `order-${orderId}`];
const order = await Order.find({}).select("_id");

order.forEach((i)=> {
orderArr.push()
});
nodeCache.del(orderArr);
};

if(admin){

}
};

const reduceStock = async(orderItems: orderItemType[]) => {
for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if(!product) throw new Error('Product not found');
    product.stock -= order.quantity;
    await product.save();
 }
};

const calculatePercentage = (thisMonth:number, lastMonth:number) => {
if(lastMonth === 0) return thisMonth*100;                            // ((5-0) / 0) * 100 = 500%
const percent = ((thisMonth-lastMonth)/lastMonth) * 100;             // ((5-1) / 1) * 100 = 400%
return Number(percent.toFixed(0));            
}

export {revaliadteCache,reduceStock, calculatePercentage}