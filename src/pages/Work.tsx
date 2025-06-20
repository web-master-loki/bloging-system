
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { workProjectService, WorkProjectWithServices } from '@/services/workProjectService';

const Work = () => {
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['work-projects'],
    queryFn: workProjectService.getAllProjects,
  });

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Work</h1>
            <p className="text-xl text-gray-600">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Work</h1>
            <p className="text-xl text-red-600">Error loading projects. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SEOHead 
        title="Our Work - WCC"
        description="Explore our portfolio of successful projects including web applications, mobile apps, and digital solutions."
        keywords="portfolio, projects, web development, mobile apps, case studies"
        type="website"
      />
      
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Work</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a look at some of our recent projects and see how we've helped businesses achieve their digital goals.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No projects available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {project.top_image && (
                    <img 
                      src={project.top_image} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      {project.category && project.category.length > 0 && (
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {project.category[0]}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.short_description}</p>
                    {project.tools && project.tools.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tools.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link to={`/work/${project.slug}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Work;
