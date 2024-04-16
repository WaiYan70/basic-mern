import express from 'express';
import { Product } from '../models/product.model.js';

const router = express.Router();

// Route for add a new Product
router.post('/', async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author || 
            !req.body.publishYear
        ){
            return res.status(400).send({message : 'Send all required fields : title, author, publishYear'});
        }
        const newProduct = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const product = await Product.create(newProduct);
        // console.log(`New Product : ${product}`);
        return res.status(201).send(product);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
});

// Route for Get All Products from database
router.get('/', async (req, res) => {
    try{
        const products = await Product.find({});
        // console.log(`Get All Products : ${products}`);
        return res.status(200).json({
            count : products.length,
            data : products,
        });
    } 
    catch(error){
        console.log(error.message);
        res.status(500).send({ message : error.message});
    }
});

// Route for Get One Product from DataBase by ID
router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        // console.log(`Get A Specific Product : ${product}`);
        return res.status(200).json(product);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
})

// Route for Update/Edit Product from DataBase by ID
router.put('/:id', async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author || 
            !req.body.publishYear
        ){
            return res.status(400).send({
                message : 'Send all required fields: title, author, publishYear'
            });
        }
        const { id } = req.params;
        const updateProduct = await Product.findByIdAndUpdate(id, req.body);
        if(!updateProduct){
            return res.status(404).send({ message : 'Product is not found'});
        }
        // console.log(`Updated Product : ${updateProduct}`);
        return res.status(200).send({message: 'Product is updated successfully'});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message})
    }
});

// Route for Delete Product from DataBase by ID
router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const deleteProduct = await Product.findByIdAndDelete(id);
        if(!deleteProduct){
            res.status(404).json({message : 'Product is not found'})
        }
        return res.status(200).send({message: 'Product is deleted Successfully'});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router; 