import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className="footer__container">
            <footer>
                <div className="footer__line-fir">
                    <span>ABOUT</span>
                    <span>CONTACT</span>
                </div>
                <div className="footer__line-sec">
                    <span>Copyright by uha</span>
                </div>
            </footer>
        </div>
    );
}
