import AuthContext from 'context/AuthContext';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { CommentsInterface, PostProps } from './PostList';

interface CommentProps {
    post: PostProps;
    getPost: (id: string) => Promise<void>;
}

export default function Comments({ post, getPost }: CommentProps) {
    const [comment, setComment] = useState<string>('');
    const { user } = useContext(AuthContext);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (post && post?.id) {
                const postRef = doc(db, 'posts', post.id);
                if (user?.uid) {
                    const newComment = {
                        content: comment,
                        uid: user.uid,
                        email: user.email,
                        createdAt: new Date().toLocaleDateString('ko', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        }),
                    };
                    await updateDoc(postRef, {
                        comments: arrayUnion(newComment),
                        updateDate: new Date().toLocaleDateString('ko', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        }),
                    });
                    await getPost(post.id);
                }
            }
            toast.success('댓글을 등록했습니다.');
            setComment('');
        } catch (err: any) {
            console.log(err);
            toast.error(err?.code);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {
            target: { name, value },
        } = e;

        if (name === 'comment') setComment(value);
    };

    const handleDeleteComment = async (data: CommentsInterface) => {
        const confirm = window.confirm('댓글을 삭제하시겠습니까?');
        if (confirm && post.id) {
            const postRef = doc(db, 'posts', post.id);
            await updateDoc(postRef, {
                comments: arrayRemove(data),
            });
            toast.success('댓글을 삭제했습니다.');
            await getPost(post.id);
        }
    };

    return (
        <>
            <div className="comments">
                <form className="comments__form" onSubmit={onSubmit}>
                    <div className="form__block">
                        <label htmlFor="comment">댓글 입력</label>
                        <textarea name="comment" id="comment" value={comment} onChange={onChange} required></textarea>
                    </div>
                    <div className="form__block">
                        <input type="submit" value="입력" className="form__btn-submit" />
                    </div>
                </form>
                <div className="comments__list">
                    {post?.comments
                        ?.slice(0)
                        .reverse()
                        .map(comment => (
                            <div key={comment.createdAt} className="comment__box">
                                <div className="comment__profile-box">
                                    <div className="comment__email">{comment?.email}</div>
                                    <div className="comment__date">{comment?.createdAt}</div>
                                    {comment.uid === user?.uid && (
                                        <div className="comment__delete" onClick={() => handleDeleteComment(comment)}>
                                            삭제
                                        </div>
                                    )}
                                </div>
                                <div className="comment__text">{comment?.content}</div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
