import '@/asset/css/home/banner.css';
import bannerVideo from '@/asset/vid/Banner.mp4';

const Banner = () => {
    return (
    <section className="video-banner">
      <video className="video-bg" autoPlay loop muted playsInline>
        <source src={bannerVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
    )
}

export default Banner;