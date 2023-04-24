import Place from "../models/place.js";
import getPlacesDetails from "./google.js";

//Get the data here
// then make the places objects
// push each place object into an array
// then insertMany

// WE SHOULD CHECK IF THE NAME / ADDY Is already in the DB before inserting!!!
// This way we can reduce the list if there is already info in the db! or we could update it

//store files in S3 bucket
const csvFilenames = [
  "HTXBars",
  "HTXBrunch",
  "HTXFood",
  "HTXNightlife",
  "HTXTodo",
];

function formatPlaces(details) {
  const places = [];

  for (let newplaceDetails of details) {
    //for getting types
    let types = getTypes(newplaceDetails);
    let photos = getPhotoIds(newplaceDetails);

    let newPlace = {
      name: newplaceDetails.name,
      place_id: newplaceDetails.place_id,
      address: newplaceDetails.hasOwnProperty("formatted_address")
        ? newplaceDetails.formatted_address
        : null,
      phone_number: newplaceDetails.hasOwnProperty("formatted_phone_number")
        ? newplaceDetails.formatted_phone_number
        : null,
      hours: newplaceDetails.hasOwnProperty("opening_hours")
        ? newplaceDetails.opening_hours.weekday_text
        : null,
      geolocation: newplaceDetails.hasOwnProperty("geometry")
        ? newplaceDetails.geometry.location
        : null,
      rating: newplaceDetails.hasOwnProperty("rating")
        ? newplaceDetails.rating
        : null,
      url: newplaceDetails.hasOwnProperty("url") ? newplaceDetails.url : null,
      neighborhood: newplaceDetails.neighborhood,
      types: types,
      photo: photos,
      comments: newplaceDetails.hasOwnProperty("comment")
        ? newplaceDetails.comment
        : null,
    };

    places.push(newPlace);
  }
  return places;
}

const getTypes = (newplaceDetails) => {
  if (newplaceDetails.types && newplaceDetails.types.length > 0) {
    if (
      newplaceDetails.types[1] === "point_of_interest" ||
      newplaceDetails.types.length === 1
    ) {
      return newplaceDetails.types.slice(0, 1);
    } else if (newplaceDetails.types.length >= 2) {
      return newplaceDetails.types.slice(0, 2);
    }
  }
  return null;
};

const getPhotoIds = (newplaceDetails) => {
  let photoItems = null;

  if (newplaceDetails.photos && newplaceDetails.photos.length > 0) {
    if (newplaceDetails.photos.length >= 3) {
      photoItems = newplaceDetails.photos.slice(0, 3);
    } else {
      photoItems = newplaceDetails.photos.slice(0, 1);
    }
  }
  if (photoItems != null) {
    //go through object items in photoItems and get the photo_refernece id
    return photoItems.map((obj) => obj.photo_reference);
  }
  return null;
};

// Use the insertMany method to save multiple Place objects at once
const insertManyPlaces = async (filename = csvFilenames) => {
  //retreieve details
  const details = await getPlacesDetails(filename);
  if (details.length > 0) {
    //format details into Place schema format
    const manyPlaces = formatPlaces(details);
    //console.log(manyPlaces);
    try {
      const result = await Place.insertMany(manyPlaces, { ordered: false });
      console.log('# of Places Inserted:', result.length);
    } catch (err) {
      console.error(err);
    }
  }
};

const insertPlace = async (placeName) => {
  //retreieve details
  const details = await getPlacesDetails(placeName, True);
  if (details.length > 0) {
    const formatedPlace = formatPlaces(details)[0];
    const place = new Place(formatedPlace);

    place
      .save()
      .then(() => console.log("Place saved successfully"))
      .catch((err) => console.error("Error saving Place:", err));
  }
};

//insertManyPlaces();

export default insertManyPlaces;
