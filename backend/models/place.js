// The place model will store place data such as name, location, rating, hours,
// description, and images. It will also be responsible for querying and returning place
//  data to the server for display on the front-end.
import mongoose from "mongoose";
const { Schema } = mongoose;

const geolocation = new mongoose.Schema({
  lat: Number,
  lng: Number
});

const placeSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  place_id: {
    type: String,
    required: true,
  },
  address: String,
  phone_number: String,
  hours: [String], //opening_hours.weekday_text
  geolocation: geolocation,
  rating: Number,
  url: String,
  types: [String],
  photo: [String], //array of photo.photo_references (pick top 3)
  comments: String
});

//export Model
const Place = mongoose.model("Place", placeSchema);
export default Place;
