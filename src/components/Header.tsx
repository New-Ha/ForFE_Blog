import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from 'firebaseApp';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const auth = getAuth(app);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
    const [init, setInit] = useState<boolean>(false);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setInit(true);
        });
    }, [auth]);

    return (
        <header className="header">
            <Link to="/" className="header__logo">
                ForFe
            </Link>
            {isAuthenticated ? (
                <div>
                    <Link to="/posts/create">글쓰기</Link>
                    <Link to="/posts">게시글</Link>
                    <Link to="/profile">프로필</Link>
                </div>
            ) : (
                <div>
                    <Link to="/login">로그인</Link>
                    <Link to="/signup">회원가입</Link>
                </div>
            )}
        </header>
    );
}
