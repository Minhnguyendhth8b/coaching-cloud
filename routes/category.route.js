/**
 * Category Routes
 */

import { Router } from 'express';

import * as CategoryController from '../controllers/category.controller';


const routes = new Router();

/**
 * CRUD Category
 */

routes.get('/', CategoryController.findAll) // Get all categories
routes.get('/:id', CategoryController.findById); // Get Category By Id
routes.get('/:id/products', CategoryController.getProductsById); // Get All Products By CategoryID
routes.post('/', CategoryController.create); // Create Category
routes.patch('/:id', CategoryController.update); // Update Category By Id
routes.delete('/:id', CategoryController.deleteById); // Delete Category By Id

export default routes;