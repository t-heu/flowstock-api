import { Hono } from 'hono';

import { productsController } from './products.controller';

import { authenticate } from '../../core/middlewares/authenticate';
import { allowRoles } from '../../core/middlewares/permission';
import { validate } from '../../core/middlewares/validate';

import { ProductSchema, ProductUpdateSchema } from './products.schema';

const productsRoutes = new Hono();

productsRoutes.get(
  '/',
  authenticate,
  allowRoles('admin', 'manager', 'operator'),
  productsController.getAllProducts
);

productsRoutes.post(
  '/',
  authenticate,
  allowRoles('admin', 'manager'),
  validate(ProductSchema),
  productsController.createProduct
);

productsRoutes.put(
  '/:id',
  authenticate,
  allowRoles('admin', 'manager'),
  validate(ProductUpdateSchema),
  productsController.updateProduct
);

productsRoutes.delete(
  '/:id',
  authenticate,
  allowRoles('admin'),
  productsController.deleteProduct
);

export default productsRoutes;