/**
 * ProductController
 */

import Status from '../configs/statuses';
import Product from '../models/product.model';
import Category from '../models/category.model';
import ApiError from '../services/error';
import mongoose from 'mongoose';
import chalk from 'chalk';
import Response from '../services/response';

export async function findAll(req, res, next) {
    try {
        const products = await Product.getLists();
        return res.status(Status.OK).json(
            Response(products, 'product')
        );
    } catch (e) {
        e.status = Status.BAD_REQUEST;
        return next(e);
    }
}

export async function findById(req, res, next) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json(ApiError({
                "status": Status.BAD_REQUEST,
                "title": "Id is invalid",
                "detail": "Product ID must be an ObjectID"
            }))
        }
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.json(ApiError({
                "status": Status.NOT_FOUND,
                "title": "Product is not found"
            }));
        } else {
            return res.status(Status.OK).json(
                Response(product, 'product')
            );
        }
    } catch (e) {
        e.status = Status.BAD_REQUEST;
        return next(e);
    }
}

export async function create(req, res, next) {
    try {
        const product = req.body;
        const { categoryId } = product;
        if (!categoryId) {
            return res.json(ApiError({
                "status": Status.BAD_REQUEST,
                "title": "categoryId is required",
                "detail": "categoryId is required"
            }))
        }
        const newProduct = await Product.createProduct(product, categoryId)
        
        return res.status(Status.CREATED).json(Response(newProduct, 'product'));
    } catch (e) {
        e.status = Status.BAD_REQUEST;
        return next(e);
    }
}

export async function update(req, res, next) {
    try {
        const body = req.body;

        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.json(ApiError({
                "status": Status.NOT_FOUND,
                "title": "Product is not found"
            }));
        }
        Object.keys(body).forEach(key => {
            product[key] = body[key];
        });
        const response = await product.save();
        return res.json(Response(response, 'product'));
    } catch (e) {
        e.status = Status.BAD_REQUEST;
        return next(e);
    }
}

export async function deleteById(req, res, next) {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.json(ApiError({
                "status": Status.NOT_FOUND,
                "title": "Product is not found"
            }));
        } else {
            await product.remove();
            return res.sendStatus(Status.OK);
        }
    } catch (e) {
        e.status = Status.BAD_REQUEST;
        return next(e);
    }
}

export async function getCategoryById(req, res, next) {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate('category');
        if (!product) {
            return res.json(ApiError({
                status: Status.NOT_FOUND,
                title: 'Product not found'
            }))
        }

        return res.json(product.category);
    } catch (e) {
        e.status = Status.BAD_REQUEST;
        return next(e);
    }
}