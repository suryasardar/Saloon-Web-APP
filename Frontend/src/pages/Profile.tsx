
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { updateBookingStatus } from '@/store/bookingSlice';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Scissors, MapPin, Star, User, Phone, Mail, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const dispatch = useDispatch();
  const { userBookings } = useSelector((state: RootState) => state.booking);

  const upcomingBookings = userBookings.filter(booking => booking.status === 'upcoming');
  const pastBookings = userBookings.filter(booking => booking.status === 'completed');

  const handleCheckIn = (bookingId: string) => {
    dispatch(updateBookingStatus({ id: bookingId, status: 'completed' }));
    toast({
      title: "Check-in Successful",
      description: "You've been checked in for your appointment!",
    });
  };

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    memberSince: "January 2024",
    totalBookings: userBookings.length
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-yellow-500/20 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-yellow-400">SalonQueue</h1>
            <nav className="flex space-x-6">
              <Link to="/" className="text-white hover:text-yellow-400 transition-colors">
                Home
              </Link>
              <Link to="/upload-photo" className="text-white hover:text-yellow-400 transition-colors">
                Hair Recommendations
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* User Profile Section */}
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6 mb-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-yellow-400 text-black text-xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
                <div className="flex items-center text-gray-300 mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-gray-300 mb-4">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-yellow-400 text-black">
                    Member since {user.memberSince}
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    {user.totalBookings} total bookings
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <div>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No upcoming appointments</p>
                    <Link to="/">
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-white font-semibold text-lg">{booking.salonName}</h4>
                            <p className="text-gray-400">{booking.service}</p>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Confirmed
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-yellow-400 mr-2" />
                            <span className="text-gray-300">{booking.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-yellow-400 mr-2" />
                            <span className="text-gray-300">{booking.time}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-yellow-400 mr-2" />
                            <span className="text-gray-300">{booking.stylist}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-yellow-400 font-semibold">#{booking.queuePosition}</span>
                            <span className="text-gray-400 ml-2">in queue</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">
                            Est. wait: {booking.estimatedWaitTime} min
                          </span>
                          <Button 
                            onClick={() => handleCheckIn(booking.id)}
                            size="sm"
                            className="bg-yellow-400 hover:bg-yellow-500 text-black"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Check-In
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Past Bookings */}
          <div>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Past Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pastBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No past appointments</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pastBookings.map((booking) => (
                      <div key={booking.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-white font-semibold">{booking.salonName}</h4>
                            <p className="text-gray-400">{booking.service}</p>
                          </div>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            Completed
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-yellow-400 mr-2" />
                            <span className="text-gray-300 text-sm">{booking.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-yellow-400 mr-2" />
                            <span className="text-gray-300 text-sm">{booking.time}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-yellow-400 mr-2" />
                            <span className="text-gray-300 text-sm">{booking.stylist}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-gray-300 text-sm">Rate Service</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gray-900 border-gray-800 mt-8">
          <CardHeader>
            <CardTitle className="text-yellow-400">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/">
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                  <Scissors className="w-4 h-4 mr-2" />
                  Book New Appointment
                </Button>
              </Link>
              <Link to="/upload-photo">
                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
                  <User className="w-4 h-4 mr-2" />
                  Get Hair Recommendations
                </Button>
              </Link>
              <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
                <Star className="w-4 h-4 mr-2" />
                Leave Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
