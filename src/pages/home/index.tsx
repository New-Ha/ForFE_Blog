import Header from 'components/Header';
import Footer from 'components/Footer';
import PostList from 'components/PostList';
import Carousel from 'components/Carousel';
export default function Home() {
    return (
        <>
            <Header />
            <Carousel />
            <div className="home__web_info"></div>
            <div className="home__recommend">
                <PostList hasNavigation={false} />
            </div>
            <div className="home__web_caution"></div>
            <Footer />
        </>
    );
}
