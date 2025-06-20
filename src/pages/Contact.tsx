import BannerSection from "@/components/parts/BannerSection"
import ContactSection from "@/components/parts/Contact/ContactSection";
import EnquiryTabs from "@/components/parts/Contact/EnquiryTabs";
import SEOHead from "@/components/SEOHead";

const Contact = () => {

    return (
        <div className="contact">
            <SEOHead
                title="Contact Us - WCC"
                description="Learn about WCC team, our mission, and how we help businesses succeed in the digital world."
                keywords="about us, team, company, mission, digital agency"
                type="website"
            />

            <BannerSection />
            <EnquiryTabs />
            <ContactSection />
        </div>
    )
}

export default Contact;