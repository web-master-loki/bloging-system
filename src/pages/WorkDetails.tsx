
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import SEOHead from '@/components/SEOHead';
import BrandingSection from "@/components/WorkDetails/BrandingSection";
import NutPackagingShowcase from "@/components/WorkDetails/NutPackagingShowcase";
import ConclusionSection from "@/components/WorkDetails/ConclusionSection";
import ServiceSlider from "@/components/WorkDetails/ServiceSlider";
import CallToAction from "@/components/parts/CallToAction";
import { workProjectService } from "@/services/workProjectService";

import topImage from "@/asset/img/topImage.png";
import bottomLeft from "@/asset/img/bottomLeft.png";
import bottomRight from "@/asset/img/bottomRight.png";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const WorkDetails = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const { data: project, isLoading, error } = useQuery({
        queryKey: ['work-project', slug],
        queryFn: () => workProjectService.getProjectBySlug(slug!),
        enabled: !!slug,
    });

    if (isLoading) {
        return (
            <div className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Loading...</h1>
                    <p className="text-gray-600">Please wait while we load the project details.</p>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
                    <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
                    <Button onClick={() => navigate('/work')}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Work
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEOHead
                title={`${project.title} - WCC`}
                description={project.short_description}
                keywords={project.category.join(', ')}
                type="website"
            />
            <BrandingSection 
                title={project.title}
                shortDescription={project.short_description}
                tools={project.tools}
                challenge={project.challenge || ''}
                What_we_did={project.what_we_did || ''}
                topImage={project.top_image || ''}
                category={project.category}
                gallary={project.gallery}
            />
            <NutPackagingShowcase
                topImage={topImage}
                bottomLeftImage={bottomLeft}
                bottomRightImage={bottomRight}
                altTextTop="Main Nut Pack"
                altTextLeft="Secondary Nut Pack"
                altTextRight="Tertiary Nut Pack"
            />
            <ConclusionSection
                title="Final Thoughts"
                text={project.final_thoughts || "This project demonstrates our commitment to delivering high-quality solutions."}
            />
            <ServiceSlider />
            <CallToAction />
        </>
    );
}

export default WorkDetails;
