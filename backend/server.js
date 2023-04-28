//  initializes the server and starts listening for requests
// The app.js file initializes the Express.js server and middleware, and sets up routing for the API.
import {Config} from './config.js';
import express from 'express';
import mongoose from 'mongoose';
import indexRouter from './routes/index.js';
import placesRouter from './routes/places.js';
import categoriesRouter from './routes/categories.js';
// import insertManyPlaces from './api/index.js';

const app = express();
const PORT = process.env.PORT || 3000; //OR port 5000

const mongoUrl = `mongodb+srv://${Config.mongoUser}:${Config.mongoPass}@${Config.mongoHost}/myprojectdb?retryWrites=true&w=majority`

app.use(express.json());
app.use('/', indexRouter);
app.use('/places', placesRouter);
app.use('/categories', categoriesRouter);


mongodb_atlas_connect()
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.log('Error connecting to MongoDB Atlas', err));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


async function mongodb_atlas_connect(){
  await mongoose.connect(mongoUrl, {
    bufferCommands: false,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log(mongoose.connection.name);
  //insertManyPlaces();
} 
