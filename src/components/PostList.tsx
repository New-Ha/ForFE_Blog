import AuthContext from 'context/AuthContext';
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CATEGORIES, CategoryType } from './CreateForm';

interface PostListProps {
    hasNavigation?: boolean;
    defaultTab?: TabType | CategoryType;
}

type TabType = 'all' | 'my';

export interface CommentsInterface {
    content: string;
    uid: string;
    email: string;
    createdAt: string;
}
export interface PostProps {
    id?: string;
    title: string;
    email: string;
    summary: string;
    photo: string;
    blogUrl: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    uid: string;
    category?: CategoryType;
    comments?: CommentsInterface[];
}

export default function PostList({ hasNavigation = true, defaultTab = 'all' }: PostListProps) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType | CategoryType>(defaultTab);
    const [posts, setPosts] = useState<PostProps[]>([]);
    const { user } = useContext(AuthContext);

    const getPosts = async () => {
        setPosts([]);
        let postsRef = collection(db, 'posts');
        let postsQuery;

        if (activeTab === 'my' && user) {
            postsQuery = query(postsRef, where('uid', '==', user.uid), orderBy('createdAt', 'asc'));
        } else if (activeTab === 'all') {
            postsQuery = query(postsRef, orderBy('createdAt', 'asc'));
        } else {
            // 카테고리 글 보여주기
            postsQuery = query(postsRef, where('category', '==', activeTab), orderBy('createdAt', 'asc'));
        }

        const datas = await getDocs(postsQuery);
        datas?.forEach(doc => {
            const dataObj = { ...doc.data(), id: doc.id };
            setPosts(prev => [...prev, dataObj as PostProps]);
        });
    };

    const handleDelete = async (id: string) => {
        const confirm = window.confirm('게시글을 삭제하시겠습니까?');
        if (confirm && id) {
            await deleteDoc(doc(db, 'posts', id));
            toast.success('삭제되었습니다.');
            getPosts();
        }
    };

    useEffect(() => {
        getPosts();
    }, [activeTab]);

    return (
        <>
            {hasNavigation && (
                <div className="post__navigation">
                    <div
                        role="presentation"
                        onClick={() => setActiveTab('all')}
                        className={activeTab === 'all' ? 'post__navigation-active' : ''}>
                        전체글
                    </div>
                    <div
                        role="presentation"
                        onClick={() => setActiveTab('my')}
                        className={activeTab === 'my' ? 'post__navigation-active' : ''}>
                        내가 쓴 글
                    </div>
                    {CATEGORIES?.map(category => (
                        <div
                            key={category}
                            role="presentation"
                            onClick={() => setActiveTab(category)}
                            className={activeTab === category ? 'post__navigation-active' : ''}>
                            {category}
                        </div>
                    ))}
                </div>
            )}
            <div className="post__list">
                {posts?.length > 0 ? (
                    posts
                        .slice(0)
                        .reverse()
                        .map(post => (
                            <div key={post?.id} className="postcard">
                                <Link to={`/posts/${post?.id}`}>
                                    <div className="postcard__container">
                                        <div className="postcard__title">{post.title}</div>
                                        <div className="postcard__content-box">
                                            <div className="postcard__info-box">
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
                                            <div className="postcard__contents">{post.summary}</div>
                                        </div>
                                    </div>
                                    <div className="post__utils">
                                        {post?.email === user?.email && (
                                            <div className="post__utils-box">
                                                <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                                                    수정
                                                </Link>
                                                <div
                                                    className="post__delete"
                                                    role="presentation"
                                                    onClick={() => handleDelete(post.id as string)}>
                                                    삭제
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        ))
                ) : (
                    <div className="post__no-post">게시글이 없습니다.</div>
                )}
            </div>
        </>
    );
}
