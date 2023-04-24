// Defines the routes for the API. Each route is associated with a specific HTTP method
// (get, post, put, delete) and a corresponding controller function that handles the request.

// example
import { Router } from 'express';
const router = Router();
//const google = require('./api/google.js')
// const eventController = require('./controllers/event');



/*
    Place ROUTES
 */
// GET place home page.
router.get("/", placeController.index);

// GET request for list of all Places.
router.get('/places', placeController.getPlaces);

// GET request for one Place
router.get('/places/:placeId', placeController.getPlaceById);

// GET request for search bar lookup of Place(s)
router.get('/places/search', placeController.search);

// GET request to get all Places in a specific category
router.get('/places/category/:category', placeController.getPlacesByCategory);

// GET request to filter Places when given check box options
router.get('/places/filter', placeController.filterPlaces); 

//POST request for creating a Place
router.post('/place', placeController.createPlace);

//PUT request for updating a Place
router.put('/places/:placeId', placeController.updatePlace);

//DELETE request to delete a Place
router.delete('/places/:placeId', placeController.deletePlace);



/*
    CATEGORY ROUTES
 */

// GET request to retrieve a list of available event categories for filtering
router.get('/categories', categoriesController.getCategory);

export default router;