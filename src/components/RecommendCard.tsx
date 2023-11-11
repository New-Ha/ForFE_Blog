import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostProps } from './PostList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'firebaseApp';

export default function RecommendCard() {
    const cardsId = ['D3eNqusstjttgLEz5tSd', 'NzzbnBJhehf909FT4CFZ', 'deL1RHyq2PeQVZKR3hMb'];
    const [posts, setPosts] = useState<PostProps[]>([]);

    const getPosts = async () => {
        let postsRef = collection(db, 'posts');
        let postsQuery = query(postsRef);
        const datas = await getDocs(postsQuery);
        datas.docs.forEach(doc => {
            const dataObj = { ...doc.data(), id: doc.id };
            setPosts(prev => [...prev, dataObj as PostProps]);
        });
    };

    const recommends = posts.filter(el => cardsId.includes(el.id));

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <div className="home__recommend_container">
                <h1 className="home__recommend_title">RECOMMEND POST</h1>
                <div className="home__recommend_box">
                    <div className="home__recommend_sub_title">
                        <div className="home__recommend_card_title">JavaScript</div>
                        <div className="home__recommend_card_title">React</div>
                        <div className="home__recommend_card_title">TypeScript</div>
                    </div>
                    <div className="home__recommend_card_posts">
                        {recommends.length > 0 &&
                            recommends.map(post => (
                                <div key={post.id} className="recommend_card">
                                    <Link to={`/posts/${post?.id}`}>
                                        <div className="recommend_card_container">
                                            <div className="recommend_title">{post.title}</div>

                                            <div className="recommend_content_box">
                                                <div className="recommend__info-box">
                                                    <div className="postcard__info-fir">
                                                        <div className="post__profile">
                                                            {post.photo ? (
                                                                <img src={post.photo} />
                                                            ) : (
                                                                <svg
                                                                    fill="#b2a995"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    aria-hidden="true">
                                                                    <path
                                                                        clipRule="evenodd"
                                                                        fillRule="evenodd"
                                                                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="postcard__info-sec">
                                                        <div className="postcard__author-name">{post.email}</div>
                                                        <div className="postcard__date">{post.createdAt}</div>
                                                    </div>
                                                </div>
                                                <div className="recommend_contents">{post.summary}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
