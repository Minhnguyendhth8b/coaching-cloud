import { Router } from 'express';
import Status from '../configs/statuses';
import ApiError from '../services/error';

import ProductRoutes from './product.route';
import CategoryRoutes from './category.route';

const routes = new Router();

const isDev = process.env.NODE_ENV === 'dev';
const isTest = process.env.NODE_ENV === 'test';

routes.get('/', (req, res, next) => {
    res.json({
        Welcome: 'Welcome to Coaching Cloud API'
    })
})

routes.use('/products', ProductRoutes);

routes.use('/categories', CategoryRoutes);

routes.all('*', (req, res, next) => {
    next(new ApiError('Not Found', Status.NOT_FOUND, true));
})

export default routes;