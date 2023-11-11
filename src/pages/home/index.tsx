import Header from 'components/Header';
import Footer from 'components/Footer';
import Carousel from 'components/Carousel';
import RecommendCard from 'components/RecommendCard';

export default function Home() {
    return (
        <>
            <Header />
            <Carousel />
            <div className="home__web_info"></div>
            <div className="home__recommend">
                <RecommendCard />
            </div>
            <div className="home__web_caution"></div>
            <Footer />
        </>
    );
}
