import { useState } from 'react';

const IMAGE1_URL =
    'https://plus.unsplash.com/premium_photo-1668473366796-636e38929ddd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3132&q=80';
const IMAGE2_URL =
    'https://images.unsplash.com/photo-1696280292021-76c29fb11f99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2971&q=80';
const IMAGE3_URL =
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80';

export default function Carousel() {
    const [activeImg, setActiveImg] = useState(1);

    return (
        <>
            <div className="carousel">
                <ul className="carousel__slides">
                    <input type="radio" name="radio-btn" id="img1" checked={activeImg === 1} readOnly />
                    <li className="carousel__slide-container">
                        <div className="carousel__slide-img">
                            <img alt="scenery 1" src={IMAGE1_URL} />
                        </div>
                        <div className="carousel__controls">
                            <label onClick={() => setActiveImg(3)} className="carousel__slide-prev">
                                <span>&lsaquo;</span>
                            </label>
                            <label onClick={() => setActiveImg(2)} className="carousel__slide-next">
                                <span>&rsaquo;</span>
                            </label>
                        </div>
                    </li>
                    <input type="radio" name="radio-btn" id="img2" checked={activeImg === 2} readOnly />
                    <li className="carousel__slide-container">
                        <div className="carousel__slide-img">
                            <img alt="scenery 2" src={IMAGE2_URL} />
                        </div>
                        <div className="carousel__controls">
                            <label onClick={() => setActiveImg(1)} className="carousel__slide-prev">
                                <span>&lsaquo;</span>
                            </label>
                            <label onClick={() => setActiveImg(3)} className="carousel__slide-next">
                                <span>&rsaquo;</span>
                            </label>
                        </div>
                    </li>
                    <input type="radio" name="radio-btn" id="img3" checked={activeImg === 3} readOnly />
                    <li className="carousel__slide-container">
                        <div className="carousel__slide-img">
                            <img alt="scenery 3" src={IMAGE3_URL} />
                        </div>
                        <div className="carousel__controls">
                            <label onClick={() => setActiveImg(2)} className="carousel__slide-prev">
                                <span>&lsaquo;</span>
                            </label>
                            <label onClick={() => setActiveImg(1)} className="carousel__slide-next">
                                <span>&rsaquo;</span>
                            </label>
                        </div>
                    </li>
                    <div className="carousel__dots">
                        <label onClick={() => setActiveImg(1)} className="carousel__dot" id="img-dot1"></label>
                        <label onClick={() => setActiveImg(2)} className="carousel__dot" id="img-dot2"></label>
                        <label onClick={() => setActiveImg(3)} className="carousel__dot" id="img-dot3"></label>
                    </div>
                </ul>
            </div>
        </>
    );
}
