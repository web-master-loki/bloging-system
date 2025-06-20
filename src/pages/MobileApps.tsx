import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Tablet, Download, Bell, Wifi, Star } from 'lucide-react';

const MobileApps = () => {
  const features = [
    {
      icon: <Smartphone className="h-8 w-8 text-blue-600" />,
      title: "Native Development",
      description: "iOS and Android native apps for optimal performance and user experience."
    },
    {
      icon: <Tablet className="h-8 w-8 text-blue-600" />,
      title: "Cross-Platform",
      description: "React Native and Flutter solutions for efficient multi-platform development."
    },
    {
      icon: <Download className="h-8 w-8 text-blue-600" />,
      title: "Offline Capability",
      description: "Apps that work seamlessly even without internet connectivity."
    },
    {
      icon: <Bell className="h-8 w-8 text-blue-600" />,
      title: "Push Notifications",
      description: "Keep users engaged with targeted and personalized notifications."
    },
    {
      icon: <Wifi className="h-8 w-8 text-blue-600" />,
      title: "API Integration",
      description: "Seamless integration with third-party services and your existing systems."
    },
    {
      icon: <Star className="h-8 w-8 text-blue-600" />,
      title: "App Store Optimization",
      description: "Get your app discovered with our ASO strategies and best practices."
    }
  ];

  const platforms = ["iOS", "Android", "React Native", "Flutter", "Xamarin"];

  return (
    <div>
      <SEOHead 
        title="Mobile App Development - WCC"
        description="Professional mobile app development for iOS and Android. Native and cross-platform solutions with modern features."
        keywords="mobile app development, iOS, Android, React Native, Flutter, native apps"
        type="website"
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Mobile App Development
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create powerful mobile experiences that engage your users and grow your business. 
              We develop native and cross-platform apps for iOS and Android.
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Build Your App
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mobile App Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive mobile solutions with cutting-edge features and functionality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Platforms Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platforms We Support</h2>
            <p className="text-lg text-gray-600">
              We develop for all major mobile platforms and frameworks
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {platforms.map((platform, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border text-center min-w-[120px]"
              >
                <span className="text-lg font-semibold text-gray-700">{platform}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Development Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Strategy", desc: "Define app goals and user requirements" },
              { step: "2", title: "Design", desc: "Create intuitive UI/UX designs" },
              { step: "3", title: "Develop", desc: "Build and test your mobile app" },
              { step: "4", title: "Launch", desc: "Deploy to app stores and monitor" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-purple-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Mobile App?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create a mobile experience that your users will love
            </p>
            <Button size="lg" variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
              Start Your App Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApps;
