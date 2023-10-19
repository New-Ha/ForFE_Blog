import AuthContext from 'context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { app } from 'firebaseApp';
import { useContext } from 'react';
import { toast } from 'react-toastify';

export default function Profile() {
    // const auth = getAuth(app); 대신에 useContext를 사용해 바로 유저값을 가져올 수 있다.
    const { user } = useContext(AuthContext);

    const onSignOut = async () => {
        const auth = getAuth(app);
        try {
            await signOut(auth);
            toast.success('로그아웃 되었습니다.');
        } catch (err: any) {
            console.log(err);
            toast.error(err?.code);
        }
    };

    return (
        <>
            <div className="profile__box">
                <div className="flex__box-lg">
                    <div className="profile__img" />
                    <div>
                        <div className="profile__email">{user?.email}</div>
                        <div className="profile__name">{user?.displayName || 'Guest'}</div>
                    </div>
                </div>
                <div role="presentation" onClick={onSignOut} className="profile__logout">
                    로그아웃
                </div>
            </div>
        </>
    );
}
