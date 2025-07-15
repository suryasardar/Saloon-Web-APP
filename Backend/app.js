// app.js

import express from 'express';
import cors from 'cors';

// import bookingRoutes from './routes/bookingRoutes.js';
import authRoutes from './routes/authRoutes.js';
import saloon from './routes/salonadminRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/salons', saloon);

export default app;
