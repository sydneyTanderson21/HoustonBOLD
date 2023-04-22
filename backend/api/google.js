// Google API integration logic
import {Config, __dirname} from '../config.js';
import axios from "axios";
import fs from "fs";
import { parse } from "csv-parse";
import path from 'path';

//Houston Lat and Long. With 20,000 circleRadius
const houstonLocationBias = "circle:20000@29.7604N,95.3698";
const PLACE_DETAILS_API_ENDPOINT = "https://maps.googleapis.com/maps/api/place/details/json";
const FIND_PLACE_REQUEST_API_ENDPOINT = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";


/*
To get details of a place from the Google Places API

Input: [Strings] or String
	- Array of .csv file names located in api/Takout/Saved/
	- .csv file should at least have a name and comment column. 
	- Name is mandatory, comment is optional
	OR
	- A String name of a place
Output: [Objects]
	- An Array of Objects w/ details returned from Google Places API 
*/
const getPlacesDetails = async (csvFilenames, isSingle = False) => {
	
	const places = await getPlaces(csvFilenames, isSingle);
	var placesDetails = [];

  for (let place of places){
	try {
		const params = {
			key: `${Config.googlePlaceAPIKey}`,
			place_id: place.place_id,
			fields: "name,place_id,formatted_address,formatted_phone_number,opening_hours,geometry,rating,url,photo,types"
		  };

		await axios.get(PLACE_DETAILS_API_ENDPOINT, {params})
		.then(response =>{
			if (response.data){
				const data = response.data;
				data.comment = place.comment;
				placesDetails.push(data);
			}
		}).catch(e =>{
			console.log(e);
		});
	} catch (error) {
		console.log(error);
	}
  }
  console.log('Finished getting Details for Places from Google API');
  return placesDetails;
}

async function handleTakeoutData(csvFilenames) {
  //handle JSON from Google Takeout
  let takeoutDetails = [];
  for (const filename of csvFilenames) {
	let filepath = path.join(__dirname, 'api', 'Takeout','Saved',`${filename}.csv`);
	console.log(filename);
	const stream = fs.createReadStream(filepath);
    const parser = stream.pipe(parse({ delimiter: ",", from_line: 2 }));
	for await (const row of parser) {
		takeoutDetails.push({
		  name: row[0], //Name
		  comment: row[1], //comments
		});
	  }

	  stream.on("close", () => {
		console.log(`Finished reading ${filename}.csv`);
	  });
  }
  return takeoutDetails;
}

async function getPlaces(csvFilenames, isSingle){
  let takeoutDetails;
  if(!isSingle){
	// not a single entry. Need to get info from csv files
	takeoutDetails = await handleTakeoutData(csvFilenames);
  }else{
	takeoutDetails = [{name: csvFilenames, comment:''}]
  }
  
  //console.log(takeoutDetails);
  var places = [];

  for (let takeoutObj of takeoutDetails) {
    try {
      let params = {
        key: `${Config.googlePlaceAPIKey}`,
        input: takeoutObj.name,
        inputtype: "textquery",
        fields: "name,place_id",
        locationbias: houstonLocationBias,
      };
      await axios
        .get(FIND_PLACE_REQUEST_API_ENDPOINT, { params })
        .then((response) => {
		  if (response.data) {
			//console.log(response.data)
			const data = response.data;
			if ( Array.isArray(data.candidates) && data.candidates.length > 0){
				takeoutObj.place_id = data.candidates[0].place_id;
          		places.push(takeoutObj);
			} 
		  }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  console.log('Finished getting Places from Google API');
  return places;
};



export default getPlacesDetails;
