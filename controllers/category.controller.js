/**
 * CategoryController
 */

import Status from '../configs/statuses';
import Product from '../models/product.model';
import Category from '../models/category.model';

export async function findAll(req, res, next) {
    try {
        
    } catch (e) {
        e.status = Status.BAD_REQUEST;
        return next(e);
    }
}

export async function findById(req, res, next) {
    try {

    } catch (e) {
        e.status = Status.BAD_REQUEST;
        return next(e);
    }
}

export async function create(req, res, next) {
    try {

    } catch (e) {
        e.status = Status.BAD_REQUEST;
        return next(e);
    }
}

export async function update(req, res, next) {

}

export async function deleteById(req, res, next) {

}