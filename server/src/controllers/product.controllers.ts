import {Request, Response} from 'express'
import { Product } from '../models/product.model.js';
import { NewProductRequestBody, searchREquestQuerry, BaseQuery } from '../types/types.js';
import {rm} from 'fs'
//import {faker} from '@faker-js/faker'
import { nodeCache } from '../app.js';
import { revaliadteCache } from '../utils/features.js';

const newProduct = async (req:Request<{}, {}, NewProductRequestBody>, res:Response) => {
const {name, price, category, stock, description} = req.body;
const image = req.file;
try {
    if(!image){
        return res.json({
            status: 401,
            error: " Please Upload image"
        })}

    if(!name || !price || !stock || !category || !description){
    rm(image.path, () => {
        console.log('Deleted image file');
    })

   return res.json({
    status : 401,
    error: "All fields are required."
})};

  const product = await Product.create({
    name,
    price,
    category: category.toLowerCase(),
    stock,
    description,
    image: image.path,
  });
  await revaliadteCache({product: true});

  res.json({
    status: 201,
    message: "Product created successfully",
    product,
  });
} catch (error) {
return res.json({
    status: 500,
    error: 'Error creating product'
});
  }
};

const getLatestProduct = async (req:Request, res:Response) => {
    try {
        let products;
        if(nodeCache.has('latest-products')) products = JSON.parse(nodeCache.get('latest-product')!);

     else{
        products = await Product.findOne({}).sort({createdAt: -1}).limit(5);
        nodeCache.set('latest-products', JSON.stringify(products));
     }

    if(!products){
        return res.json({
        status: 404,
        message: "Product not found"
        })
    }
   
    res.json({
        status: 200,
        products,
    });
} catch (error) {
    return res.json({
    status: 500,
    error: 'Error fetching product'
    })
}
};

const getAllCategories = async (req:Request, res:Response) => {
    try {
        let categories;
        if(nodeCache.has('categories'))
        categories = await JSON.parse(nodeCache.get('categories')!);
        else{
        categories = await Product.distinct("category");
        nodeCache.set('categories', JSON.stringify(categories));
        }
    if(!categories){
       return res.json({
           status : 401,
           error: "No categories found."
       });
    }
       return res.json({
           status: 200,
           categories
       })
    } catch (error) {
       return res.json({
           status: 500,
           error: "something went wrong"
       })
    }
 };
 //ADMIN PRODUCT
 const getAdminProduct = async (req:Request, res:Response) => {
        try {
            let product;
            if(nodeCache.has('admin-product'))
                product = JSON.parse(nodeCache.get('admin-product')!);
            else{
                product = await Product.distinct("admin-product");
            nodeCache.set('product', JSON.stringify(product));
            }
        product = await Product.find({});
 
       return res.json({
           status: 200,
           product
       })
    } catch (error) {
       return res.json({
           status: 500,
           error: "something went wrong"
       })
    }
 };
 const getProductDetails = async (req:Request, res:Response) => {
    const id = req.params.id;
    try {
        let product;
        if(nodeCache.has(`product-${id}`)) product = JSON.parse(nodeCache.get(`product-${id}`)!);

     else{
        product = await Product.findById(id);
        nodeCache.set(`product-${id}`, JSON.stringify(product));
     }
     if(!product){
        return res.json({
        status: 404,
        message: "Product not found"
        })
     }
 
       return res.json({
           status: 200,
           product
       })
    } catch (error) {
       return res.json({
           status: 500,
           error: "can't fetch product details"
       })
    }
 };

 //UPDATE PRODUCTS
const updateProduct = async (req:Request, res:Response) => {
    try {
       const {name, price, stock, description, category} = req.body;
       const image = req.files;
       const {id} = req.params;

       
       const product = await Product.findById(id);
       if(!product){
           return res.json({
               status : 404,
               error: "Product not found."
            });
        };

        if(!image){
        rm(product.image, () => {
            console.log('Deleted old image');
        })
         
        product.image = image.path;
        if(name) product.name = name;
        if(price) product.price = price;
        if(stock) product.stock = stock;
        if(description) product.description = description;
        if(category) product.category = category.toLowerCase();

        await product.save();
        await revaliadteCache({
            product: true, 
            productId: String(product._id)
        });
 
      return res.json({
        status: 200,
        message: "Product updated successfully.",
        product
      });
    }
       
    } catch (error) {
       return res.json({
           status: 500,
           error: "something went wrong while updating product"
       });
    }
}

 //DELETE PRODUCTS
const deleteProduct = async (req:Request, res:Response) => {
    try {
       const {id} = req.params;
 
       const product = await Product.findById(id);
       if(!product){
          return res.json({
              status : 404,
              error: "Product not found."
          });
       }
 
         await product.deleteOne();
         await revaliadteCache({
            product: true, 
            productId: String(product._id)
        });
         
         return res.json({
             status : 201,
             message: "Product deleted successfully."
         });
 
    } catch (error) {
       return res.json({
           status: 500,
           error: "something went wrong while deleting product"
       })
    }
 };

 const searchProduct = async(req:Request<{},{},{}, searchREquestQuerry>, res:Response) => {
    const {price, search, sortBy, category} = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8; 
    const skip = (page - 1) * limit;

    const baseQuery:BaseQuery = {}

  try {
    if(search)
    baseQuery.name = {
    $regex: search,
    $options: 'i'
    };

    if(price)
    baseQuery.price = {
    $lte: Number(price)
    };
    
    if(category)
    baseQuery.category = category;
 
 const [product, filteredProduct] = await Promise.all([
         Product.find(baseQuery)
        .sort(sortBy?
        {price:sortBy === "asc" ? 1 : -1}: undefined)
        .limit(limit)
        .skip(skip),
        Product.find(baseQuery),
    ])
  const totalPage = Math.ceil(filteredProduct.length / limit);

 return res.json({
    status: 200,
    product,
    totalPage,
    currentPage: page
 })
} catch (error) {
return res.json({
    status: 500,
    error: 'Error fetching products'
})
}};

// const createRandomProduct = async(count: number = 10) =>{
// const products = [];

// for (let i = 0; i < count; i++) {
// const product = {
//     name: faker.commerce.productName(),
//     image: "Public\faishon.PNG",
//     price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
//     stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
//     description: faker.commerce.productDescription,
//     category: faker.commerce.department(),
//     createdAt: new Date(faker.date.past()),
//     updatedAt: new Date(faker.date.recent()),
//     __v: 0,
// }
// products.push(product);
// }
// await Product.create(products);
// console.log({ succecss: true });
// };
// createRandomProduct(40);

// const deleteRandomsProducts = async (count: number = 10) => {
//   const products = await Product.find({}).skip(2);

//   for (let i = 0; i < products.length; i++) {
//     const product = products[i];
//     await product.deleteOne();
//   }

//   console.log({ succecss: true });
// }
// deleteRandomsProducts(35)
    
export {newProduct, getLatestProduct, getAdminProduct, getAllCategories,updateProduct,getProductDetails,deleteProduct, searchProduct}