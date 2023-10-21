import AuthContext from 'context/AuthContext';
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface PostListProps {
    hasNavigation?: boolean;
    defaultTab?: TabType;
}

type TabType = 'all' | 'my';

export interface PostProps {
    id?: string;
    title: string;
    email: string;
    summary: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    uid: string;
}

export default function PostList({ hasNavigation = true, defaultTab = 'all' }: PostListProps) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
    const [posts, setPosts] = useState<PostProps[]>([]);
    const { user } = useContext(AuthContext);

    const getPosts = async () => {
        setPosts([]);
        let postsRef = collection(db, 'posts');
        let postsQuery;

        if (activeTab === 'my' && user) {
            postsQuery = query(postsRef, where('uid', '==', user.uid), orderBy('createdAt', 'asc'));
        } else {
            postsQuery = query(postsRef, orderBy('createdAt', 'asc'));
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
                </div>
            )}
            <div className="post__list">
                {posts?.length > 0 ? (
                    posts.map(post => (
                        <div key={post?.id} className="post__box">
                            <Link to={`/posts/${post?.id}`}>
                                <div className="post__profile-box">
                                    <div className="post__profile" />
                                    <div className="post__author-name">{post.email}</div>
                                    <div className="post__date">{post.createdAt}</div>
                                </div>
                                <div className="post__title">{post.title}</div>
                                <div className="post__contents">{post.summary}</div>
                            </Link>
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
                    ))
                ) : (
                    <div className="post__no-post">게시글이 없습니다.</div>
                )}
            </div>
        </>
    );
}
