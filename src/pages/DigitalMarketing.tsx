import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Share2, BarChart, Mail, Target, TrendingUp } from 'lucide-react';

const DigitalMarketing = () => {
  const services = [
    {
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: "SEO Optimization",
      description: "Improve your search engine rankings and drive organic traffic to your website."
    },
    {
      icon: <Share2 className="h-8 w-8 text-blue-600" />,
      title: "Social Media Marketing",
      description: "Build brand awareness and engage with your audience across social platforms."
    },
    {
      icon: <Mail className="h-8 w-8 text-blue-600" />,
      title: "Email Marketing",
      description: "Nurture leads and retain customers with targeted email campaigns."
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "PPC Advertising",
      description: "Drive immediate traffic and conversions with strategic paid advertising."
    },
    {
      icon: <BarChart className="h-8 w-8 text-blue-600" />,
      title: "Analytics & Reporting",
      description: "Track performance and optimize campaigns with detailed analytics."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Content Strategy",
      description: "Create compelling content that resonates with your target audience."
    }
  ];

  const platforms = ["Google Ads", "Facebook", "Instagram", "LinkedIn", "Twitter", "YouTube"];

  return (
    <div>
      <SEOHead 
        title="Digital Marketing Services - WCC"
        description="Professional digital marketing services including SEO, social media marketing, PPC advertising, and content strategy."
        keywords="digital marketing, SEO, social media marketing, PPC, content strategy, email marketing"
        type="website"
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-red-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Digital Marketing Services
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Grow your online presence and reach your target audience with our comprehensive 
              digital marketing strategies. From SEO to social media, we've got you covered.
            </p>
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              Boost Your Marketing
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Marketing Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital marketing solutions to help your business thrive online
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Results That Matter</h2>
            <p className="text-lg text-gray-600">
              We focus on metrics that actually impact your business growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { metric: "Traffic Increase", value: "150%", desc: "Average organic traffic growth" },
              { metric: "Lead Generation", value: "3x", desc: "Increase in qualified leads" },
              { metric: "ROI Improvement", value: "400%", desc: "Return on marketing investment" },
              { metric: "Conversion Rate", value: "65%", desc: "Higher conversion rates" }
            ].map((item, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-orange-600 mb-2">{item.value}</div>
                <h3 className="text-lg font-semibold mb-2">{item.metric}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platforms Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platforms We Work With</h2>
            <p className="text-lg text-gray-600">
              We leverage the most effective marketing platforms for your business
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {platforms.map((platform, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border text-center min-w-[140px]"
              >
                <span className="text-lg font-semibold text-gray-700">{platform}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Marketing Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Analyze", desc: "Audit your current marketing performance" },
              { step: "2", title: "Strategy", desc: "Develop a customized marketing plan" },
              { step: "3", title: "Execute", desc: "Implement campaigns across channels" },
              { step: "4", title: "Optimize", desc: "Monitor and improve performance" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
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
          <div className="bg-orange-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create a digital marketing strategy that delivers real results
            </p>
            <Button size="lg" variant="outline" className="bg-white text-orange-600 hover:bg-gray-100">
              Get Your Marketing Audit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketing;
