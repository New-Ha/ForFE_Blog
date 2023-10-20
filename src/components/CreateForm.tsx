import AuthContext from 'context/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CreateForm() {
    const [title, setTitle] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // firestore로 데이터 생성
            await addDoc(collection(db, 'posts'), {
                title: title,
                summary: summary,
                content: content,
                createAt: new Date()?.toLocaleDateString(),
                email: user?.email,
            });
            toast.success('게시글이 생성되었습니다.');
            navigate('/');
        } catch (err: any) {
            console.log(err);
            toast.error(err);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    };

    return (
        <>
            <form onSubmit={onSubmit} className="form">
                <div className="form__block">
                    <label htmlFor="title">제목</label>
                    <input type="text" onChange={onChange} value={title} name="title" id="title" required />
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
                    <input type="submit" value="submit" className="form__btn-submit" />
                </div>
            </form>
        </>
    );
}
