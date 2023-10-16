import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <header>
                <div>
                    <Link to="/posts/create">글쓰기</Link>
                    <Link to="/posts">게시글</Link>
                    <Link to="/profile">프로필</Link>
                </div>
            </header>
            <div className="post__list">Post List</div>
            <footer>
                <div>Menu1</div>
                <div>Menu2</div>
                <div>Menu3</div>
            </footer>
        </div>
    );
}
