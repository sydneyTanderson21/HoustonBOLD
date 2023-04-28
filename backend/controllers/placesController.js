//maybe import express-async-handler
import Place from "../models/place.js";
import * as placesService from "../services/placesService.js";

export const index = async (req, res) => {
  const indexCount = await placesService.getPlaceCount();
  //res.json(count);
  res.send(`# of Places: ${indexCount}`);
};

export const getPlaces = async (req, res) => {
  // ?offset=${offset}&limit=${limit}
  //http://localhost:3000/places/all?offset=0&limit=3
  const offset = parseInt(req.query.offset) || 0; // default to 0
  const limit = parseInt(req.query.limit) || 20; // default to 20
  
  const [places, count] = await placesService.getPlacesPagination(offset, limit);

  res.json({ places, count });
};

export const getPlaceById = async (req, res) => {
  try {
    const place = await placesService.getPlace(req.params.placeId);
    if (!place) {
      return res.status(404).send("Place not found");
    }
    res.json(place);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const filterPlaces = (req, res) => {
  res.send("NOT IMPLEMENTED: filterPlaces");
};

export const createPlace = (req, res) => {
  res.send("NOT IMPLEMENTED: createPlace");
};

export const updatePlace = (req, res) => {
  res.send("NOT IMPLEMENTED: updatePlace");
};

export const deletePlace = (req, res) => {
  res.send("NOT IMPLEMENTED: deletePlace");
};

export const search = (req, res) => {
  res.send("NOT IMPLEMENTED: search");
};
