import { Link } from 'react-router-dom';

// interface로 props의 타입체커만들기
interface PostListProps {
    hasNavigation?: boolean;
}

export default function PostList({ hasNavigation = true }: PostListProps) {
    return (
        <>
            {/* navigation은 기본값은 보이지만, profile page에서는 보이면 안되므로 파라미터로 hasNavigagion 값을 true로 주고 profile page에서 false로 보이지 않게 해준다. */}
            {hasNavigation && (
                <div className="post__navigation">
                    <div className="post__navigation-active">전체글</div>
                    <div>내가 쓴 글</div>
                </div>
            )}
            <div className="post__list">
                {[...Array(10)].map((_, idx) => (
                    <div key={idx} className="post__box">
                        <Link to={`/posts/${idx}`}>
                            <div className="post__profile-box">
                                <div className="post__profile" />
                                <div className="post__author-name">작성자</div>
                                <div className="post__date">2023.10.17 오후 05:01:17</div>
                            </div>
                            <div className="post__title">게시물 {idx}</div>
                            <div className="post__contents">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto tenetur provident
                                molestiae recusandae animi eos magnam delectus numquam odio explicabo reprehenderit
                                soluta eaque neque sit dignissimos dolor sapiente, fugiat fuga.
                            </div>
                            <div className="post__utils-box">
                                <div className="post__edit">수정</div>
                                <div className="post__delete">삭제</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
