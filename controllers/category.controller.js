/**
 * CategoryController
 */

import Status from '../configs/statuses';
import Product from '../models/product.model';
import Category from '../models/category.model';
import Response from '../services/response';
import mongoose from 'mongoose';

export async function findAll(req, res, next) {
    try {
        const categories = await Category.getLists();
        return res.status(Status.OK).json(
            Response(categories, 'category')
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
                "detail": "Category ID must be an ObjectID"
            }))
        }
        const category = await Category.findById(req.params.id).populate('products');
        if (!category) {
            return res.json(ApiError({
                "status": Status.NOT_FOUND,
                "title": "Category is not found"
            }));
        } else {
            return res.status(Status.OK).json(
                Response(category, 'category')
            );
        }
    } catch (e) {
        e.status = Status.BAD_REQUEST;
        return next(e);
    }
}

export async function create(req, res, next) {
    try {
        const category = req.body;
        const newCategory = await Category.createCategory(category);

        return res.status(Status.CREATED).json(Response(newCategory, 'category'));
    } catch (e) {
        e.status = Status.BAD_REQUEST;
        return next(e);
    }
}

export async function update(req, res, next) {
    try {
        const body = req.body;

        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.json(ApiError({
                "status": Status.NOT_FOUND,
                "title": "Category is not found"
            }));
        }
        Object.keys(body).forEach(key => {
            product[key] = body[key];
        });
        const response = await category.save();
        return res.json(Response(response, 'category'));
    } catch (e) {
        e.status = Status.BAD_REQUEST;
        return next(e);
    }
}

export async function deleteById(req, res, next) {
    try {
        const categoryId = req.params.id;
        const category = await Product.findById(categoryId);

        if (!category) {
            return res.json(ApiError({
                "status": Status.NOT_FOUND,
                "title": "Product is not found"
            }));
        } else {
            await category.remove();
            return res.sendStatus(Status.OK);
        }
    } catch (e) {
        e.status = Status.BAD_REQUEST;
        return next(e);
    }
}

export async function getProductsById(req, res, next) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json(ApiError({
                "status": Status.BAD_REQUEST,
                "title": "Id is invalid",
                "detail": "Category ID must be an ObjectID"
            }))
        }
        const category = await Category.findById(req.params.id).populate('products');
        if (!category) {
            return res.json(ApiError({
                "status": Status.NOT_FOUND,
                "title": "Category is not found"
            }));
        } else {
            return res.status(Status.OK).json(
                Response(category.products, 'category')
            );
        }
    } catch (e) {
        e.status = Status.BAD_REQUEST;
        return next(e);
    }
}