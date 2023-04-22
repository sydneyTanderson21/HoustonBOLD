import { fileURLToPath } from 'url';
import path from 'path';
import getPlacesDetails from '../api/google.js';
import Place from '../models/place.js';
import mongoose from 'mongoose';


// const firstPlace = new Place({
//     name: 'Belle Station',
//     place_id: 'ChIJqfr-ekG_QIYRj7go0qHRAoc',
//     address: '207 Gray St, Houston, TX 77002, USA',
//     phone_number: '(346) 204-4792',
//     hours: [
//       'Monday: Closed',
//       'Tuesday: 4:00 PM – 2:00 AM',
//       'Wednesday: 4:00 PM – 2:00 AM',
//       'Thursday: 4:00 PM – 2:00 AM',
//       'Friday: 4:00 PM – 2:00 AM',
//       'Saturday: 11:00 AM – 2:00 AM',
//       'Sunday: 11:00 AM – 12:00 AM'
//     ],
//     geolocation: { lat: 29.7528295, lng: -95.3777049 },
//     rating: 4,
//     url: 'https://maps.google.com/?cid=9728568638019516559',
//     types: [ 'bar', 'night_club' ],
//     photo: [
//       'AUjq9jmXWsr3USoBVrA6OM2w-GVR5sOES5YfgwJGm054nmcny8kLA8n9UA0-IizxELJEbShf6sQK4fRA2ZdlAOgfDVztLTJNNlFb8z0T_ObTvdANxOv-_u2z6ZNfR7I7xcN_ICwv0A-UIVS-qIovBO1by-ZEUhAJHM46RFSdIhso_CHJtVsx',
//       'AUjq9jk4s1l3o-TDJurc4q6z0qUhaw7lxctIkyRL6n1JOa40Rm1DqgZxe0R2aeTSO7mwp61JrLtFJojlSd_7G8fGHyoRCkcH7l5B0sMmo1OK_TaYpvu_ULV_bqLXCuyRQn6KOQv254IZwkZaUL3FY1yS75av_9rmc6OepEffens04ZjKHsDA',
//       'AUjq9jngiiZLfp_zp5NST6PF3I2toGN_AyvDMRtmdJMmKBOORg7d1Ng9f_xoNDt79NvE6oOkc7_kfQdQZvBXcBpJVB0iq4Q2YnnBXNlP_dO5tjcTS5l7cPUP5RyIVHjHJJltNRHxJQWLY5yLXctQN21sW_xXhndvETkPKg-7uUWfClF4171K'
//     ],
//     comments: null
//   });

//   firstPlace.save()
//   .then(() => console.log('Document saved successfully'))
//   .catch(err => console.error('Error saving document:', err));