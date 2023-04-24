// Google API integration logic
import { Config, __dirname } from "../config.js";
import axios from "axios";
import fs from "fs";
import { parse } from "csv-parse";
import path from "path";
import {
  houstonLocationBias,
  PLACE_DETAILS_API_ENDPOINT,
  FIND_PLACE_REQUEST_API_ENDPOINT,
  neighborhoods,
} from "../globals.js";

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
const getPlacesDetails = async (csvFilenames, isSingle = false) => {
  const places = await getPlaces(csvFilenames, isSingle);
  var placesDetails = [];

  for (let place of places) {
    try {
      const params = {
        key: `${Config.googlePlaceAPIKey}`,
        place_id: place.place_id,
        fields:
          "name,place_id,formatted_address,formatted_phone_number,opening_hours,geometry,rating,url,photo,types",
      };

      await axios
        .get(PLACE_DETAILS_API_ENDPOINT, { params })
        .then((response) => {
          if (response.data) {
            const data = response.data;
            data.comment = place.comment;
            placesDetails.push(data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }

  if (placesDetails.length > 0) {
    return calculateNeighborhood(placesDetails);
  }
  console.log("Finished getting Details for Places from Google API");
  return placesDetails;
};

async function handleTakeoutData(csvFilenames) {
  //handle JSON from Google Takeout
  let takeoutDetails = [];
  for (const filename of csvFilenames) {
    let filepath = path.join(
      __dirname,
      "api",
      "Takeout",
      "Saved",
      `${filename}.csv`
    );
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

async function getPlaces(csvFilenames, isSingle) {
  let takeoutDetails;
  if (!isSingle) {
    // not a single entry. Need to get info from csv files
    takeoutDetails = await handleTakeoutData(csvFilenames);
  } else {
    takeoutDetails = [{ name: csvFilenames, comment: "" }];
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
            if (Array.isArray(data.candidates) && data.candidates.length > 0) {
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
  console.log("Finished getting Places from Google API");
  return places;
}

// Calculates the distance between two sets of coordinates using the Haversine formula
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function calculateNeighborhood(placesDetails) {
	let updatedPlaces = [];
  // Loop through each place and calculate the distance to each neighborhood
  for (var placeDetail of placesDetails) {
	let place = placeDetail.result;
    let closestNeighborhoods = [];
    let shortestDistance = Number.MAX_VALUE;

    for (let neighborhood of neighborhoods) {
      if (place.hasOwnProperty("geometry")) {
        let placeLat = place.geometry.location.lat;
        let placeLong = place.geometry.location.lng;

        const distance = getDistance(
          placeLat,
          placeLong,
          neighborhood.lat,
          neighborhood.lng
        );

        if (distance < shortestDistance) {
          shortestDistance = distance;
          closestNeighborhoods = [neighborhood.name];
        } else if (distance <= shortestDistance * 1.15) {
          closestNeighborhoods.push(neighborhood.name);
        }
      }
    }
    place.neighborhood = closestNeighborhoods;
	  updatedPlaces.push(place);
  }
  return updatedPlaces;
}

export default getPlacesDetails;
