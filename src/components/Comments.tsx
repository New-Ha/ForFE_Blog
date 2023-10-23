import { useState } from 'react';

const COMMENTS = [
    {
        id: 1,
        email: 'test@test.com',
        createdAt: '2023-10-22 오전 06:11:12',
        content: '댓글입니다.',
    },
    {
        id: 2,
        email: 'test@test.com',
        createdAt: '2023-10-22 오전 06:11:13',
        content: '댓글입니다.',
    },
    {
        id: 3,
        email: 'test@test.com',
        createdAt: '2023-10-22 오전 06:11:14',
        content: '댓글입니다.',
    },
];

export default function Comments() {
    const [comment, setComment] = useState<string>('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {
            target: { name, value },
        } = e;

        if (name === 'comment') setComment(value);
    };

    return (
        <>
            <div className="comments">
                <form className="comments__form" onSubmit={onSubmit}>
                    <div className="form__block">
                        <label htmlFor="comment">댓글 입력</label>
                        {/* 입력했을 때 항상 필수값을 가지도록 required */}
                        <textarea name="comment" id="comment" value={comment} onChange={onChange} required></textarea>
                    </div>
                    <div className="form__block">
                        <input type="submit" value="입력" className="form__btn-submit" />
                    </div>
                </form>
                <div className="comments__list">
                    {COMMENTS?.map(comment => (
                        <div key={comment.id} className="comment__box">
                            <div className="comment__profile-box">
                                <div className="comment__email">{comment?.email}</div>
                                <div className="comment__date">{comment?.createdAt}</div>
                                <div className="comment__delete">삭제</div>
                            </div>
                            <div className="comment__text">{comment?.content}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
