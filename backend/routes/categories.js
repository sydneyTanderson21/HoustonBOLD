
import { Router } from "express";
const router = Router();
import { getCategories, getPlacesByCategory } from '../controllers/categoriesController.js';

/*
    CATEGORY ROUTES
 */

// GET request for list of all Categories / Categories home page.
router.get('/', getCategories);

// GET request to get all Places in a specific category
router.get('/:category', getPlacesByCategory);

export default router;