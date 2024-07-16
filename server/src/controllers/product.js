import { Product } from '../models/product.models.js';
import {rm} from 'fs'

//CREATE NEW PRODUCT
const newProduct = async(req,res,next) => {

const {name, price, stock, category, description} = req.body;
const image = req.file;

 try {
if(!name || !price || !image || !stock || !category || !description)
return res.json({
    status : 401,
     error: "All fields are required."
});
const product = await Product.create({
    name,
    price,
    image: image.path,
    stock,
    category: category.toLowerCase(),
    description,
 });

 return res.json({
    status : 201,
    message: "Product created successfully.",
    product
 })

 } catch (error) {
    return res.json({
     status: 500,
     error: "Error creating product"
    })
 }
};

// GET LATEST PRODUCT
const getLatestProduct = async (req,res) => {
   try {
      const product = await Product.find({}).sort({createdAt: -1}).limit(6);
      if(!product){
         return res.json({
             status : 401,
             error: "No products found."
         });
      }
      return res.json({
          status: 200,
          product
      });
   } catch (error) {
      return res.json({
          status: 500,
          error: "something went wrong"
      });
   }
};

//GET CATEGORY
const getAllCategories = async (req,res) => {
   try {
   const category = await Product.distinct("category");
   if(!category){
      return res.json({
          status : 401,
          error: "No categories found."
      });
   }
      return res.json({
          status: 200,
          category
      })
   } catch (error) {
      return res.json({
          status: 500,
          error: "something went wrong"
      })
   }
};

//GET ADMIN PRODUCT
const getAdminProduct = async (req,res) => {
   try {
   const category = await Product.find({});

      return res.json({
          status: 200,
          category
      })
   } catch (error) {
      return res.json({
          status: 500,
          error: "something went wrong"
      })
   }
};

//GET PRODUCT DETAILS
const getProductDetails = async (req,res) => {
   try {
   const product = await Product.findById(req.params.id);

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
const updateProduct = async (req,res) => {
   try {
      const {name, price, stock, description, category} = req.body;
      const {id} = req.params;
      const image = req.files;

      const product = await Product.findById(id);
      if(!product){
         return res.json({
             status : 404,
             error: "Product not found."
         });
      }
     if(image){
      rm(product.image, () => {
         console.log("old image Deleted")
      })
      product.image = image.path
     }
     if(name) product.name = name;
     if(price) product.price = price;
     if(stock) product.stock = stock;
     if(description) product.description = description;
     if(category) product.category = category.toLowerCase();

     await product.save();

     return res.json({
       status: 200,
       message: "Product updated successfully.",
       product
     });
      
   } catch (error) {
      return res.json({
          status: 500,
          error: "something went wrong while updating product"
      });
   }
};


//DELETE PRODUCTS
const deleteProduct = async (req,res) => {
   try {
      const {id} = req.params;
      const image = req.files;

      const product = await Product.findById(id);
      if(!product){
         return res.json({
             status : 404,
             error: "Product not found."
         });
      }
      if(image){
         rm(product.image, () => {
            console.log("product image Deleted")
         })
         product.image = image.path
        }

        await product.deleteOne();
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

export {newProduct, getLatestProduct, getAllCategories,getAdminProduct,getProductDetails, deleteProduct, updateProduct}