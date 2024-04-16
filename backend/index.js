import express, { response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { Product } from './models/product.model.js';

import productRoutes from './routes/product.route.js'; 

import { port, mongoDBurl } from './config.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use(cors());

// Adding CORS policy
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (req, res) => {
    console.log(req);
    return res.status(202).send('Learning How to Use MERN Stack');
});

app.use('/products', productRoutes);

mongoose.connect(mongoDBurl).then(() => {
    console.log('Server is connected to database');
    app.listen(port, () => {
        console.log(`the app is listening on ${port} PORT`);
    });
}).catch((error) => {
    console.log(error);
});