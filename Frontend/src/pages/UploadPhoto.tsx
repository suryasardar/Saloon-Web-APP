
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Upload, Sparkles, ArrowLeft, ImageIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';

const UploadPhoto = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<string>('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setRecommendation(''); // Clear previous recommendation
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please upload an image first.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock API response - in real app, this would be an actual ML service
      const mockRecommendations = [
        "Based on your face shape, we recommend a layered bob cut with side-swept bangs. This style will enhance your natural features and add volume.",
        "Your oval face shape is perfect for a long layered cut with highlights. Consider adding some golden tones to complement your skin tone.",
        "We suggest a modern pixie cut with textured layers. This edgy style will accentuate your cheekbones and give you a contemporary look.",
        "A shoulder-length cut with curtain bangs would suit you perfectly. This versatile style can be styled both casual and formal.",
        "Consider a lob (long bob) with subtle waves. This trendy cut is perfect for your face shape and easy to maintain."
      ];
      
      const randomRecommendation = mockRecommendations[Math.floor(Math.random() * mockRecommendations.length)];
      setRecommendation(randomRecommendation);
      
      toast({
        title: "Analysis Complete!",
        description: "Your personalized hairstyle recommendation is ready.",
      });
      
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
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
              <Link to="/profile" className="text-white hover:text-yellow-400 transition-colors">
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-400/10 p-4 rounded-full">
              <Sparkles className="w-12 h-12 text-yellow-400" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">AI Hair Recommendations</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Upload your photo and let our AI analyze your face shape to recommend the perfect hairstyle for you
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Upload Your Photo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* File Input */}
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="bg-gray-800 border-gray-700 text-white file:bg-yellow-400 file:text-black file:border-0 file:mr-4 file:py-2 file:px-4 file:rounded file:font-semibold"
                    />
                  </div>

                  {/* Upload Area */}
                  {!imagePreview && (
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center">
                      <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">Drag and drop your photo here</p>
                      <p className="text-gray-500 text-sm">Supports JPG, PNG, GIF up to 10MB</p>
                    </div>
                  )}

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setImagePreview('');
                            setSelectedImage(null);
                            setRecommendation('');
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Analyze Button */}
                  <Button 
                    onClick={analyzeImage}
                    disabled={!selectedImage || isAnalyzing}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                        Analyzing Your Face Shape...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Get Hairstyle Recommendation
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Your Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!recommendation && !isAnalyzing && (
                  <div className="text-center py-12">
                    <div className="bg-yellow-400/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-yellow-400" />
                    </div>
                    <p className="text-gray-400 mb-4">Upload a photo to get your personalized hairstyle recommendation</p>
                    <p className="text-gray-500 text-sm">Our AI will analyze your face shape and suggest the perfect cut for you</p>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="text-center py-12">
                    <div className="animate-pulse">
                      <div className="bg-yellow-400/20 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-yellow-400" />
                      </div>
                    </div>
                    <p className="text-yellow-400 font-semibold mb-2">Analyzing your photo...</p>
                    <p className="text-gray-400 text-sm">This may take a few moments</p>
                  </div>
                )}

                {recommendation && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 p-6 rounded-lg border border-yellow-500/30">
                      <h3 className="text-yellow-400 font-semibold text-lg mb-3">Recommended Hairstyle</h3>
                      <p className="text-white leading-relaxed">{recommendation}</p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-white font-semibold">Next Steps:</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                          <p className="text-gray-300">Save this recommendation or take a screenshot</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                          <p className="text-gray-300">Browse our partner salons to find the right stylist</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                          <p className="text-gray-300">Book your appointment and show this recommendation</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Link to="/">
                        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                          <Upload className="w-4 h-4 mr-2" />
                          Book Appointment Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tips Section */}
          <Card className="bg-gray-900 border-gray-800 mt-8">
            <CardHeader>
              <CardTitle className="text-yellow-400">Photo Tips for Best Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="bg-yellow-400/10 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h5 className="text-white font-semibold mb-2">Good Lighting</h5>
                  <p className="text-gray-400 text-sm">Use natural light for best face detection</p>
                </div>
                <div className="text-center p-4">
                  <div className="bg-yellow-400/10 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h5 className="text-white font-semibold mb-2">Clear Photo</h5>
                  <p className="text-gray-400 text-sm">Ensure your face is clearly visible</p>
                </div>
                <div className="text-center p-4">
                  <div className="bg-yellow-400/10 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h5 className="text-white font-semibold mb-2">Front Facing</h5>
                  <p className="text-gray-400 text-sm">Look directly at the camera</p>
                </div>
                <div className="text-center p-4">
                  <div className="bg-yellow-400/10 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h5 className="text-white font-semibold mb-2">No Filters</h5>
                  <p className="text-gray-400 text-sm">Use an unfiltered photo for accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
