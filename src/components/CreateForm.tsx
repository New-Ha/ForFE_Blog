import AuthContext from 'context/AuthContext';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PostProps } from './PostList';

export type CategoryType = 'HTML/CSS' | 'JavaScript' | 'React' | 'TypeScript';
export const CATEGORIES: CategoryType[] = ['HTML/CSS', 'JavaScript', 'React', 'TypeScript'];

export default function CreateForm() {
    const params = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [post, setPost] = useState<PostProps | null>(null);
    const [category, setCategory] = useState<CategoryType>('JavaScript');
    const { user } = useContext(AuthContext);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (post && post.id) {
                const postRef = doc(db, 'posts', post?.id);
                await updateDoc(postRef, {
                    title: title,
                    summary: summary,
                    content: content,
                    updatedAt: new Date()?.toLocaleDateString('ko', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    }),
                    category: category,
                });
                toast.success('게시글이 수정되었습니다.');
                navigate(`/posts/${post?.id}`);
            } else {
                await addDoc(collection(db, 'posts'), {
                    title: title,
                    summary: summary,
                    content: content,
                    createdAt: new Date()?.toLocaleDateString('ko', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    }),
                    email: user?.email,
                    uid: user?.uid,
                    category: category,
                });
                toast.success('게시글이 생성되었습니다.');
                navigate('/');
            }
        } catch (err: any) {
            console.log(err);
            toast.error(err);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === 'title') {
            setTitle(value);
        }
        if (name === 'summary') {
            setSummary(value);
        }
        if (name === 'content') {
            setContent(value);
        }
        if (name === 'category') {
            setCategory(value as CategoryType);
        }
    };

    const getPost = async (id: string) => {
        if (id) {
            const docRef = doc(db, 'posts', id);
            const docSnap = await getDoc(docRef);
            setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
        }
    };

    useEffect(() => {
        if (params?.id) getPost(params?.id);
    }, []);

    useEffect(() => {
        if (post) {
            setTitle(post?.title);
            setSummary(post?.summary);
            setContent(post?.content);
            setCategory(post?.category as CategoryType);
        }
    }, [post]);

    return (
        <>
            <form onSubmit={onSubmit} className="form">
                <div className="form__block">
                    <label htmlFor="title">제목</label>
                    <input type="text" onChange={onChange} value={title} name="title" id="title" required />
                </div>
                <div className="form__block">
                    <label htmlFor="category">카테고리</label>
                    <select name="category" id="category" onChange={onChange} defaultValue={category}>
                        <option value="">카테고리를 선택해주세요</option>
                        {CATEGORIES?.map(category => (
                            <option value={category} key={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form__block">
                    <label htmlFor="summary">요약</label>
                    <input type="text" onChange={onChange} value={summary} name="summary" id="summary" required />
                </div>
                <div className="form__block">
                    <label htmlFor="content">내용</label>
                    <textarea name="content" onChange={onChange} value={content} id="content" required />
                </div>
                <div className="form__block">
                    <input type="submit" value={post ? '수정' : '등록'} className="form__btn-submit" />
                </div>
            </form>
        </>
    );
}
