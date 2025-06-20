import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Smartphone, Globe, Zap, Shield, Users } from 'lucide-react';

const WebDevelopment = () => {
  const features = [
    {
      icon: <Code className="h-8 w-8 text-blue-600" />,
      title: "Modern Technologies",
      description: "We use cutting-edge frameworks like React, Vue.js, and Node.js to build fast, scalable applications."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-blue-600" />,
      title: "Responsive Design",
      description: "Every website we build looks perfect on desktop, tablet, and mobile devices."
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "Performance Optimized",
      description: "Lightning-fast loading times and smooth user experiences across all devices."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Security First",
      description: "Built with security best practices to protect your data and users."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "SEO Ready",
      description: "Optimized for search engines to help your business get discovered online."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "User-Centric",
      description: "Designed with your users in mind for maximum engagement and conversion."
    }
  ];

  const technologies = [
    "React", "Vue.js", "Angular", "Node.js", "Python", "PHP", 
    "MongoDB", "PostgreSQL", "AWS", "Docker", "TypeScript", "Next.js"
  ];

  return (
    <div>
      <SEOHead 
        title="Web Development Services - WCC"
        description="Professional web development services using modern technologies. Custom web applications, responsive design, and performance optimization."
        keywords="web development, React, Vue.js, Node.js, responsive design, custom websites"
        type="website"
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Web Development Services
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your ideas into powerful web applications with our expert development team. 
              We create custom solutions that drive business growth and deliver exceptional user experiences.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Your Project
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive web development solutions tailored to your business needs
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

      {/* Technologies Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technologies We Use</h2>
            <p className="text-lg text-gray-600">
              We stay up-to-date with the latest technologies to deliver cutting-edge solutions
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <span 
                key={index}
                className="bg-white px-4 py-2 rounded-full text-gray-700 shadow-sm border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-blue-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss how we can bring your web application ideas to life
            </p>
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
              Get a Free Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDevelopment;
