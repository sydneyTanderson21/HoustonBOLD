import Place from "../models/place.js";

const getPlaceCount = async () => {
  const count = await Place.countDocuments().exec();
  return count;
};

const getPlace = async (eventId) => {
  const placesQuery = Place.findById(eventId, '-place_id');
  const place = await placesQuery.exec();
  return place;
};

const getPlacesPagination = async (offset, limit) => {
  const places = await Place.find().skip(offset).limit(limit).exec();
  const count = await getPlaceCount();
  return [places, count];

};

export {
getPlaceCount,
getPlace,
getPlacesPagination
};


// exports.getPlaceCount = async (keyword, category, startDate, endDate) => {
//   const query = Event.find();

//   if (keyword) {
//     query.where('title', new RegExp(keyword, 'i'));
//   }

//   if (category) {
//     query.where('category', category);
//   }

//   if (startDate && endDate) {
//     query.where('date').gte(startDate).lte(endDate);
//   }

//   const events = await query.exec();
//   return events;
// };