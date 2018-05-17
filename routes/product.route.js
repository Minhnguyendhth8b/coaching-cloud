/**
 * Product Route
 */

import { Router } from 'express';

import * as ProductController from '../controllers/product.controller';


const routes = new Router();

/**
 * CRUD Product
 */

routes.get('/', ProductController.findAll) // Get all products
routes.get('/:id', ProductController.findById); // Get Product By Id
routes.post('/', ProductController.create);
routes.patch('/:id', ProductController.update);
routes.delete('/:id', ProductController.deleteById); 

export default routes;