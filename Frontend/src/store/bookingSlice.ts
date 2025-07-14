
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Booking {
  id: string;
  salonName: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  queuePosition: number;
  estimatedWaitTime: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface BookingState {
  currentBooking: Booking | null;
  userBookings: Booking[];
}

const initialState: BookingState = {
  currentBooking: null,
  userBookings: [
    {
      id: '1',
      salonName: 'Golden Scissors',
      service: 'Haircut',
      stylist: 'Sarah Johnson',
      date: '2024-01-20',
      time: '14:00',
      queuePosition: 3,
      estimatedWaitTime: 45,
      status: 'upcoming'
    },
    {
      id: '2',
      salonName: 'Urban Edge Salon',
      service: 'Hair Color',
      stylist: 'Alex Rivera',
      date: '2024-01-05',
      time: '10:30',
      queuePosition: 0,
      estimatedWaitTime: 0,
      status: 'completed'
    }
  ]
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    createBooking: (state, action: PayloadAction<Booking>) => {
      state.currentBooking = action.payload;
      state.userBookings.unshift(action.payload);
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    updateBookingStatus: (state, action: PayloadAction<{ id: string; status: 'upcoming' | 'completed' | 'cancelled' }>) => {
      const booking = state.userBookings.find(b => b.id === action.payload.id);
      if (booking) {
        booking.status = action.payload.status;
      }
    }
  },
});

export const { createBooking, clearCurrentBooking, updateBookingStatus } = bookingSlice.actions;
export default bookingSlice.reducer;
