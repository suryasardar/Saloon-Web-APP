
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Salon {
  id: string;
  name: string;
  image: string;
  address: string;
  phone: string;
  email: string;
  currentQueue: number;
  averageWaitTime: number;
  services: Service[];
  stylists: Stylist[];
  reviews: Review[];
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

export interface Stylist {
  id: string;
  name: string;
  image: string;
  rating: number;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

interface SalonState {
  salons: Salon[];
  selectedSalon: Salon | null;
  queueData: QueueUser[];
}

export interface QueueUser {
  id: string;
  name: string;
  service: string;
  estimatedTime: number;
}

const initialState: SalonState = {
  salons: [
    {
      id: '1',
      name: 'Golden Scissors',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
      address: '123 Style Street, Fashion District',
      phone: '+1 (555) 123-4567',
      email: 'info@goldenscissors.com',
      currentQueue: 5,
      averageWaitTime: 25,
      services: [
        { id: '1', name: 'Haircut', duration: 45, price: 50 },
        { id: '2', name: 'Hair Color', duration: 120, price: 120 },
        { id: '3', name: 'Highlights', duration: 90, price: 80 },
        { id: '4', name: 'Blowout', duration: 30, price: 35 },
      ],
      stylists: [
        { id: '1', name: 'Sarah Johnson', image: 'https://images.unsplash.com/photo-1494790108755-2616b612c0c0?w=200', rating: 4.9 },
        { id: '2', name: 'Mike Chen', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', rating: 4.7 },
      ],
      reviews: [
        { id: '1', customerName: 'Emma Wilson', rating: 5, comment: 'Amazing service! Sarah did an incredible job with my highlights.', date: '2024-01-15' },
        { id: '2', customerName: 'David Lee', rating: 4, comment: 'Great atmosphere and professional staff.', date: '2024-01-10' },
      ]
    },
    {
      id: '2',
      name: 'Urban Edge Salon',
      image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400',
      address: '456 Trendy Ave, Downtown',
      phone: '+1 (555) 987-6543',
      email: 'hello@urbanedge.com',
      currentQueue: 3,
      averageWaitTime: 15,
      services: [
        { id: '1', name: 'Modern Cut', duration: 60, price: 65 },
        { id: '2', name: 'Beard Trim', duration: 30, price: 25 },
        { id: '3', name: 'Hair Wash', duration: 20, price: 15 },
        { id: '4', name: 'Styling', duration: 45, price: 40 },
      ],
      stylists: [
        { id: '1', name: 'Alex Rivera', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', rating: 4.8 },
        { id: '2', name: 'Luna Park', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200', rating: 4.6 },
      ],
      reviews: [
        { id: '1', customerName: 'Chris Johnson', rating: 5, comment: 'Best haircut I\'ve ever had! Alex is a true artist.', date: '2024-01-12' },
        { id: '2', customerName: 'Maria Garcia', rating: 4, comment: 'Love the modern vibe and excellent service.', date: '2024-01-08' },
      ]
    },
    {
      id: '3',
      name: 'Luxe Hair Studio',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
      address: '789 Luxury Lane, Uptown',
      phone: '+1 (555) 456-7890',
      email: 'contact@luxehair.com',
      currentQueue: 7,
      averageWaitTime: 35,
      services: [
        { id: '1', name: 'Premium Cut', duration: 75, price: 85 },
        { id: '2', name: 'Balayage', duration: 150, price: 180 },
        { id: '3', name: 'Deep Treatment', duration: 60, price: 70 },
        { id: '4', name: 'Updo Styling', duration: 90, price: 95 },
      ],
      stylists: [
        { id: '1', name: 'Isabella Martinez', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200', rating: 5.0 },
        { id: '2', name: 'James Wilson', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200', rating: 4.9 },
      ],
      reviews: [
        { id: '1', customerName: 'Sophia Brown', rating: 5, comment: 'Absolutely stunning results! Isabella is incredibly talented.', date: '2024-01-14' },
        { id: '2', customerName: 'Robert Davis', rating: 5, comment: 'Premium service worth every penny. Highly recommend!', date: '2024-01-11' },
      ]
    }
  ],
  selectedSalon: null,
  queueData: [
    { id: '1', name: 'Alice Cooper', service: 'Haircut', estimatedTime: 15 },
    { id: '2', name: 'Bob Smith', service: 'Hair Color', estimatedTime: 45 },
    { id: '3', name: 'Carol Davis', service: 'Highlights', estimatedTime: 75 },
    { id: '4', name: 'Dan Wilson', service: 'Blowout', estimatedTime: 90 },
    { id: '5', name: 'Eva Martinez', service: 'Haircut', estimatedTime: 105 },
  ]
};

const salonSlice = createSlice({
  name: 'salon',
  initialState,
  reducers: {
    setSelectedSalon: (state, action: PayloadAction<string>) => {
      state.selectedSalon = state.salons.find(salon => salon.id === action.payload) || null;
    },
    updateQueue: (state, action: PayloadAction<QueueUser[]>) => {
      state.queueData = action.payload;
    }
  },
});

export const { setSelectedSalon, updateQueue } = salonSlice.actions;
export default salonSlice.reducer;
