
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setSelectedSalon } from '@/store/salonSlice';
import { createBooking } from '@/store/bookingSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Phone, Mail, Clock, Users, Star, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SalonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedSalon, queueData } = useSelector((state: RootState) => state.salon);
  
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedStylist, setSelectedStylist] = useState<string>('');

  useEffect(() => {
    if (id) {
      dispatch(setSelectedSalon(id));
    }
  }, [id, dispatch]);

  const handleBooking = () => {
    if (!selectedSalon || !selectedDate || !selectedTime || !selectedService || !selectedStylist) {
      toast({
        title: "Missing Information",
        description: "Please fill in all booking details.",
        variant: "destructive"
      });
      return;
    }

    const service = selectedSalon.services.find(s => s.id === selectedService);
    const stylist = selectedSalon.stylists.find(s => s.id === selectedStylist);
    
    if (!service || !stylist) return;

    const booking = {
      id: Date.now().toString(),
      salonName: selectedSalon.name,
      service: service.name,
      stylist: stylist.name,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      queuePosition: selectedSalon.currentQueue + 1,
      estimatedWaitTime: service.duration + (selectedSalon.currentQueue * 15),
      status: 'upcoming' as const
    };

    dispatch(createBooking(booking));
    navigate('/booking-confirmation');
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  if (!selectedSalon) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Salon not found</h2>
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
      <header className="bg-black border-b border-yellow-500/20 py-4">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:text-yellow-400 hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Salons
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Salon Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <img 
              src={selectedSalon.image} 
              alt={selectedSalon.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">{selectedSalon.name}</h1>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-yellow-400 mr-3" />
                <span>{selectedSalon.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-yellow-400 mr-3" />
                <span>{selectedSalon.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-yellow-400 mr-3" />
                <span>{selectedSalon.email}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-yellow-400 mr-3" />
                <span>{selectedSalon.currentQueue} people in queue</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-yellow-400 mr-3" />
                <span>Average wait: {selectedSalon.averageWaitTime} minutes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services & Booking */}
          <div className="lg:col-span-2">
            {/* Services */}
            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-yellow-400">Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedSalon.services.map((service) => (
                    <div key={service.id} className="p-4 bg-gray-800 rounded-lg">
                      <h4 className="font-semibold text-white">{service.name}</h4>
                      <p className="text-gray-400 text-sm">{service.duration} minutes</p>
                      <p className="text-yellow-400 font-bold">${service.price}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stylists */}
            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-yellow-400">Our Stylists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedSalon.stylists.map((stylist) => (
                    <div key={stylist.id} className="flex items-center p-4 bg-gray-800 rounded-lg">
                      <img 
                        src={stylist.image} 
                        alt={stylist.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-white">{stylist.name}</h4>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-gray-400">{stylist.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-yellow-400">Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedSalon.reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-white">{review.customerName}</h5>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{review.comment}</p>
                      <p className="text-gray-500 text-xs mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form & Queue */}
          <div>
            {/* Booking Form */}
            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-yellow-400">Book Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
                          !selectedDate && "text-gray-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Time</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Choose time" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time} className="text-white hover:bg-gray-700">
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Service</label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Choose service" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {selectedSalon.services.map((service) => (
                        <SelectItem key={service.id} value={service.id} className="text-white hover:bg-gray-700">
                          {service.name} - ${service.price} ({service.duration}min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Stylist Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Stylist</label>
                  <Select value={selectedStylist} onValueChange={setSelectedStylist}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Choose stylist" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {selectedSalon.stylists.map((stylist) => (
                        <SelectItem key={stylist.id} value={stylist.id} className="text-white hover:bg-gray-700">
                          {stylist.name} (⭐ {stylist.rating})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleBooking}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>

            {/* Live Queue */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-yellow-400">Live Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {queueData.map((user, index) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-gray-400 text-sm">{user.service}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-yellow-400 font-semibold">#{index + 1}</p>
                        <p className="text-gray-400 text-sm">{user.estimatedTime}min</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonDetail;
