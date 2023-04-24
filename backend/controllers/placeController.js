//maybe import express-async-handler
import Place from "../models/place";


const getPlaces = ((req, res) => {
    res.json(Place);
})

const getPlaceById = ((req, res) => {
    const id = Number(req.params.productID)
    const product = products.find(product => product.id === id)

        if (!product) {
        return res.status(404).send('Product not found')
    }
    res.json(product);
})

const getPlacesByCategory = ((req, res) => {
    res.send("NOT IMPLEMENTED: getPlacesByCategory");
})

const filterPlaces = ((req, res) => {
    res.send("NOT IMPLEMENTED: filterPlaces");
})

const createPlace = ((req, res) => {
    res.send("NOT IMPLEMENTED: createPlace");
})


const updatePlace = ((req, res) => {
    res.send("NOT IMPLEMENTED: updatePlace");
})


const deletePlace = ((req, res) => {
    res.send("NOT IMPLEMENTED: deletePlace");
})


const search = ((req, res) => {
    res.send("NOT IMPLEMENTED: search");
})


module.exports = {
    getPlaces,
    getPlaceById,
    getPlacesByCategory,
    filterPlaces,
    createPlace,
    updatePlace,
    deletePlace,
    search
};