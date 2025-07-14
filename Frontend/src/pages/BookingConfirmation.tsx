
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Clock, User, Scissors, MapPin } from 'lucide-react';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { currentBooking } = useSelector((state: RootState) => state.booking);

  if (!currentBooking) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No booking found</h2>
          <Button onClick={() => navigate('/')} className="bg-yellow-400 hover:bg-yellow-500 text-black">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-yellow-500/20 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-yellow-400">SalonQueue</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-2">Booking Confirmed!</h2>
            <p className="text-gray-300 text-lg">Your appointment has been successfully booked</p>
          </div>

          {/* Booking Details Card */}
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-yellow-400 text-2xl">Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-yellow-400 mr-4" />
                <div>
                  <p className="text-white font-semibold text-lg">{currentBooking.salonName}</p>
                  <p className="text-gray-400">Salon</p>
                </div>
              </div>

              <div className="flex items-center">
                <Scissors className="w-6 h-6 text-yellow-400 mr-4" />
                <div>
                  <p className="text-white font-semibold text-lg">{currentBooking.service}</p>
                  <p className="text-gray-400">Service</p>
                </div>
              </div>

              <div className="flex items-center">
                <User className="w-6 h-6 text-yellow-400 mr-4" />
                <div>
                  <p className="text-white font-semibold text-lg">{currentBooking.stylist}</p>
                  <p className="text-gray-400">Stylist</p>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-yellow-400 mr-4" />
                <div>
                  <p className="text-white font-semibold text-lg">{currentBooking.date}</p>
                  <p className="text-gray-400">Date</p>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="w-6 h-6 text-yellow-400 mr-4" />
                <div>
                  <p className="text-white font-semibold text-lg">{currentBooking.time}</p>
                  <p className="text-gray-400">Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Queue Information */}
          <Card className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border-yellow-500/30 mb-8">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">Queue Position</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white mb-2">#{currentBooking.queuePosition}</p>
                    <p className="text-gray-300">Position in Queue</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white mb-2">{currentBooking.estimatedWaitTime}</p>
                    <p className="text-gray-300">Estimated Wait (min)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/profile')}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 text-lg"
            >
              Go to Profile
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full border-gray-600 text-white hover:bg-gray-800 py-3 text-lg"
            >
              Book Another Appointment
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-gray-900 rounded-lg border border-gray-800">
            <h4 className="text-yellow-400 font-semibold mb-3">What's Next?</h4>
            <ul className="text-gray-300 space-y-2">
              <li>• You'll receive SMS updates about your queue position</li>
              <li>• Arrive 10 minutes before your estimated time</li>
              <li>• Check-in at the salon when you arrive</li>
              <li>• View your booking details anytime in your profile</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
