import { Router } from 'express';
import { index, getPlaces, getPlaceById, filterPlaces, createPlace, updatePlace, deletePlace, search } from '../controllers/placesController.js';
const router = Router();
/*
    Place ROUTES
*/

// GET place home page.
router.get("/", index);

// GET request for list of all Places.
router.get('/all', getPlaces);

// GET request for search bar lookup of Place(s)
router.get('/search', search);

// GET request to filter Places when given check box options
// possibly not needed
router.get('/filter', filterPlaces); 

//POST request for creating a Place
router.post('/create', createPlace);

// GET request for one Place
router.get('/:placeId', getPlaceById);

//PUT request for updating a Place
router.put('/:placeId', updatePlace);

//DELETE request to delete a Place
router.delete('/:placeId', deletePlace);


export default router;