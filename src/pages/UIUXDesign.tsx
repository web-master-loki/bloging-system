import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Users, Eye, Lightbulb, Target, Award } from 'lucide-react';

const UIUXDesign = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "User Research",
      description: "Deep understanding of your users through interviews, surveys, and analytics."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-blue-600" />,
      title: "Wireframing",
      description: "Strategic layout planning to optimize user flow and functionality."
    },
    {
      icon: <Palette className="h-8 w-8 text-blue-600" />,
      title: "Visual Design",
      description: "Beautiful, on-brand interfaces that captivate and engage users."
    },
    {
      icon: <Eye className="h-8 w-8 text-blue-600" />,
      title: "Prototyping",
      description: "Interactive prototypes to test and refine the user experience."
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Usability Testing",
      description: "Validate designs with real users to ensure optimal usability."
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Design Systems",
      description: "Scalable design systems for consistent brand experiences."
    }
  ];

  const tools = ["Figma", "Adobe XD", "Sketch", "InVision", "Principle", "Framer"];

  return (
    <div>
      <SEOHead 
        title="UI/UX Design Services - WCC"
        description="Professional UI/UX design services. User research, wireframing, prototyping, and usability testing for optimal user experiences."
        keywords="UI UX design, user experience, user interface, wireframing, prototyping, usability testing"
        type="website"
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-teal-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              UI/UX Design Services
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create intuitive and beautiful user experiences that drive engagement and conversions. 
              Our design process is user-centered and data-driven.
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Start Your Design Project
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Design Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From research to final design, we follow a proven process to create exceptional user experiences
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

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Good Design Matters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                stat: "38%",
                desc: "Increase in user engagement with good UI/UX design"
              },
              {
                stat: "200%",
                desc: "ROI improvement from investing in UX design"
              },
              {
                stat: "67%",
                desc: "Reduction in development costs with proper planning"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{item.stat}</div>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Design Tools We Use</h2>
            <p className="text-lg text-gray-600">
              Industry-leading tools for professional design and prototyping
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {tools.map((tool, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border text-center min-w-[120px]"
              >
                <span className="text-lg font-semibold text-gray-700">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-green-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Improve Your User Experience?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create designs that your users will love and that drive business results
            </p>
            <Button size="lg" variant="outline" className="bg-white text-green-600 hover:bg-gray-100">
              Get a Design Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIUXDesign;
