// The nearby model is for Kafka, Spark processed object. 
// When a user clicks a place, but wants to know other places nearby, this object will have simple details
// may not need object, we'll have to see
// I dont wanna store this info long term, I just wanna grab it. format it. and share with user
// maybe short-lived data that expires after a day or so...
// set expiration on this collection? 
import mongoose from "mongoose";
const { Schema } = mongoose;

const nearbySchema = new Schema({
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
  rating: Number,
  url: String,
});

//making place_id mandatory to be unique
nearbySchema.index({ place_id: 1 }, { unique: true });
//export Model
const Nearby = mongoose.model("Nearby", nearbySchema);
export default Nearby;
