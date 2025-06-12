// server/controllers/userCntrl.js
import { prisma } from '../config/prismaConfig.js';
import asyncHandler from 'express-async-handler';

// 1. Create a new user or indicate if already exists
export const createUser = asyncHandler(async (req, res) => {
  console.log("Creating a user");
  const { email } = req.body;

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    return res.send({ message: "User created successfully", user });
  }

  res.status(201).send({ message: "User already exists" });
});

// 2. Book a visit for a residency
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  const alreadyBooked = await prisma.user.findUnique({
    where: { email },
    select: { bookedVisits: true }
  });

  if (alreadyBooked.bookedVisits.some(v => v.id === id)) {
    return res.status(400).json({ message: "Already booked" });
  }

  await prisma.user.update({
    where: { email },
    data: { bookedVisits: { push: { id, date } } }
  });
  res.status(200).send({ message: "Booked successfully" });
});

// 3. Retrieve all bookings for a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const bookings = await prisma.user.findUnique({
    where: { email },
    select: { bookedVisits: true }
  });
  res.status(200).send(bookings);
});

// 4. Cancel an existing booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { bookedVisits: true }
  });

  const idx = user.bookedVisits.findIndex(v => v.id === id);
  if (idx === -1) {
    return res.status(400).json({ message: "Not booked" });
  }

  user.bookedVisits.splice(idx, 1);
  await prisma.user.update({
    where: { email },
    data: { bookedVisits: user.bookedVisits }
  });
  res.status(200).send({ message: "Cancelled successfully" });
});

// 5. Toggle a residency as favorite
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  const user = await prisma.user.findUnique({ where: { email } });
  if (user.favResidenciesID.includes(rid)) {
    const updated = await prisma.user.update({
      where: { email },
      data: {
        favResidenciesID: {
          set: user.favResidenciesID.filter(id => id !== rid)
        }
      }
    });
    return res.status(200).send({ message: "Removed from fav", user: updated });
  }

  const updated = await prisma.user.update({
    where: { email },
    data: { favResidenciesID: { push: rid } }
  });
  res.status(200).send({ message: "Added to fav", user: updated });
});

// 6. Retrieve all favorites for a user
export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
    select: { favResidenciesID: true }
  });
  res.status(200).send(user);
});

