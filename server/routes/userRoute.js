
// server/routes/userRoute.js
import express from 'express';
import {
  bookVisit,
  cancelBooking,
  createUser,
  getAllBookings,
  getAllFavorites,
  toFav,
} from '../controllers/userCntrl.js';
import jwtCheck from '../config/auth0Config.js';

const router = express.Router();

// User registration
router.post('/register', jwtCheck, createUser);

// Book a visit to a property
router.post('/bookVisit/:id', jwtCheck, bookVisit);

// Get all bookings
router.post('/allBookings', getAllBookings);

// Cancel a booking
router.post('/removeBooking/:id', jwtCheck, cancelBooking);

// Toggle favorite
router.post('/toFav/:rid', jwtCheck, toFav);

// Get all favorites
router.post('/allFav', jwtCheck, getAllFavorites);

export { router as userRoute };
