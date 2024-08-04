import { Request, Response } from "express";
import { nodeCache } from "../app.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.models.js";
import { calculatePercentage } from "../utils/features.js";

const getDashboard = async (req:Request, res:Response) => {
    try {
    let stats = {};
    if(nodeCache.has('admin-dashboard')) stats = JSON.parse(nodeCache.get('admin-dashboard')!);
    
    else{
    const today = new Date();
    const lastSixMonth = new Date();
    lastSixMonth.setMonth(lastSixMonth.getMonth() - 6);

    const thisMonth = {
        start: new Date(today.getFullYear(), today.getMonth(), 1),
        end : today
    };

    const lastMonth = {
        start: new Date(today.getFullYear(), today.getMonth()-1, 1),
        end : new Date(today.getFullYear(), today.getMonth(), 0)
    };

    //PRODUCTS
    const thisMonthProductsPromise = await Product.find({
        createdAt: {
            $gte: thisMonth.start,
            $lte: thisMonth.end
        }
    });

    const lastMonthProductsPromise = await Product.find({
        createdAt: {
            $gte: lastMonth.start,
            $lte: lastMonth.end
        }
    });

    //USERS
    const thisMonthUsersPromise = await User.find({
        createdAt: {
            $gte: thisMonth.start,
            $lte: thisMonth.end
        }
    });

    const lastMonthUsersPromise = await User.find({
        createdAt: {
            $gte: lastMonth.start,
            $lte: lastMonth.end
        }
    });

    //ORDERS
    const thisMonthOrdersPromise = await Order.find({
        createdAt: {
            $gte: thisMonth.start,
            $lte: thisMonth.end
        }
    });

    const lastMonthOrdersPromise = await Order.find({
        createdAt: {
            $gte: lastMonth.start,
            $lte: lastMonth.end
        }
    });
    const lastSixMonthOrdersPromise = await Order.find({
        createdAt: {
            $gte: lastSixMonth,
            $lte: today
        }
    });

    const latestTransactionsPromise = await Order.find({}).select(['orderItems', 'discount' ,'total' ,'status']).limit(4);
    const [
        thisMonthProducts,
        lastMonthProducts,
        thisMonthUsers,
        lastMonthUsers,
        thisMonthOrders,
        lastMonthOrders,
        productCount,
        UserCount,
        allOrders,
        lastSixMonthOrders,
        categories,
        FemaleUserCount,
        latestTransactions
    ] 
    = await Promise.all([
        thisMonthProductsPromise,
        lastMonthProductsPromise,
        thisMonthUsersPromise,
        lastMonthUsersPromise,
        thisMonthOrdersPromise,
        lastMonthOrdersPromise,
        Product.countDocuments(),
        User.countDocuments(),
        Order.find({}).select('total'),
        lastSixMonthOrdersPromise,
        Product.distinct("category"),
        User.countDocuments({gender: "Female"}),
        latestTransactionsPromise
    ]);

    const thisMonthRevenue = thisMonthOrders.reduce((total, order) => total + (order.total || 0), 0);
    const lastMonthRevenue = lastMonthOrders.reduce((total, order) => total + (order.total || 0), 0);

    const percent = {
        revenue: calculatePercentage(thisMonthRevenue,lastMonthRevenue),
        user: calculatePercentage(
            thisMonthUsers.length,
            lastMonthUsers.length,
        ),
        order: calculatePercentage(
            thisMonthOrders.length,
            lastMonthOrders.length,
        ),
        product: calculatePercentage(
            thisMonthProducts.length,
            lastMonthProducts.length,
         )
    };

    const countOrderMonths = new Array(6).fill(0);
    const countRevenueMonths = new Array(6).fill(0);

    lastSixMonthOrders.forEach((order) => {
    const createdAt = order.createdAt ;
    const monthDiff = today.getMonth() - createdAt.getMonth();

    if(monthDiff < 6){
     countOrderMonths[6 - monthDiff - 1] += 1;
     countRevenueMonths[6 - monthDiff - 1] += order.total || 0;
    }
    });

    const categoryCountPromise = categories.map(category => Product.countDocuments({category}));
    const categoryCount = await Promise.all(categoryCountPromise)

    const revenue = allOrders.reduce((total, order) => total + (order.total || 0), 0);

    const count = {
        revenue,
        user: UserCount,
        product: productCount,
        order: allOrders.length
    };

    const categoryArr: Record<string,number>[] = [];

    categories.forEach((category, i) => {
        categoryArr.push({
           [category] : Math.round((categoryCount[i]/productCount) * 100) ,
        })
    });

    const ratio = {
        male: UserCount - FemaleUserCount,
        female: FemaleUserCount,
        total: UserCount,
    };

    const mondifyLatestTransaction = latestTransactions.map(i => ({
        _id: i._id,
        discount: i.discount,
        total: i.total,
        status: i.status,
        quantity: i.orderItems.length,
    }));

    stats = {
        categories,
       categoryArr,
        percent, 
        count,
        chart: {
         order: countOrderMonths,
         revenue: countRevenueMonths
        },
        ratio,
        latestTransactions: mondifyLatestTransaction
    };

    nodeCache.set('admin-stats', JSON.stringify(stats));
};
    return res.json({
        status: 200,
        stats,
    });
    
    } catch (error) {
        return res.json({
            status: 500,
            error: 'Failed to fetch dashboard data.'
        })
    }
};

const getPieChart = async (req:Request, res:Response) => {

};

const getBarChart = async (req:Request, res:Response) => {};

const getLineChart = async (req:Request, res:Response) => {};

export {getDashboard,getBarChart,getLineChart,getPieChart}