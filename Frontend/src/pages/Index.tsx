
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, MapPin, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { salons } = useSelector((state: RootState) => state.salon);
  // const {user}=useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-yellow-500/20 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-yellow-400">SalonQueue</h1>
            <nav className="flex space-x-6">
              <Link to="/profile" className="text-white hover:text-yellow-400 transition-colors">
                Profile
              </Link>
              <Link to="/upload-photo" className="text-white hover:text-yellow-400 transition-colors">
                Hair Recommendations
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Find Your Perfect <span className="text-yellow-400">Salon</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Skip the wait, book your appointment, and track your queue position in real-time
          </p>
        </div>
      </section>

      {/* Salons Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12 text-center">Available Salons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {salons.map((salon) => (
              <Card key={salon.id} className="bg-gray-900 border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={salon.image} 
                    alt={salon.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {salon.currentQueue} in queue
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-white mb-2">{salon.name}</h4>
                  <div className="flex items-center text-gray-400 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{salon.address}</span>
                  </div>
                  <div className="flex items-center text-gray-400 mb-4">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{salon.phone}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-yellow-400 mr-2" />
                      <span className="text-sm text-gray-300">{salon.currentQueue} waiting</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-yellow-400 mr-2" />
                      <span className="text-sm text-gray-300">{salon.averageWaitTime} min avg</span>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-300">
                      {(salon.reviews.reduce((acc, review) => acc + review.rating, 0) / salon.reviews.length).toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">({salon.reviews.length} reviews)</span>
                  </div>

                  <Link to={`/salon/${salon.id}`}>
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                      View Details & Book
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2024 SalonQueue. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
