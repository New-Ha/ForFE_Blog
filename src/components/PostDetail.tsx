export default function PostDetail() {
    return (
        <>
            <div className="post__detail">
                <div className="post__box">
                    <div className="post__title">Lorem ipsum dolor sit amet</div>
                </div>
                <div className="post__profile-box">
                    <div className="post__profile" />
                    <div className="post__author-name">작성자</div>
                    <div className="post__date">2023.10.17 오후 05:01:17</div>
                </div>
                <div className="post__utils-box">
                    <div className="post__edit">수정</div>
                    <div className="post__delete">삭제</div>
                </div>
                <div className="post__contents">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto tenetur provident molestiae
                    recusandae animi eos magnam delectus numquam odio explicabo reprehenderit soluta eaque neque sit
                    dignissimos dolor sapiente, fugiat fuga.
                </div>
            </div>
        </>
    );
}
