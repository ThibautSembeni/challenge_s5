import Navbar from "@/components/molecules/Navbar/index.jsx";
import HeroSection from "@/components/organisms/Home/HeroSection.jsx";
import FeatureSections from "@/components/organisms/Home/FeatureSections.jsx";
import Footer from "@/components/molecules/Footer/index.jsx";
import Chatbot from "../../components/organisms/Home/Chatbot";

export default function Home() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <FeatureSections />
            <Chatbot />
            <Footer />
        </>
    );
}
