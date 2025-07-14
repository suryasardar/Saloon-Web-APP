
import { configureStore } from '@reduxjs/toolkit';
import salonReducer from './salonSlice';
import bookingReducer from './bookingSlice';

export const store = configureStore({
  reducer: {
    salon: salonReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
