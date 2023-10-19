import { getAuth, signOut } from 'firebase/auth';
import { app } from 'firebaseApp';
import { toast } from 'react-toastify';

export default function Profile() {
    const auth = getAuth(app);

    const onSignOut = async () => {
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
                        <div className="profile__email">{auth?.currentUser?.email}</div>
                        <div className="profile__name">{auth?.currentUser?.displayName || 'Guest'}</div>
                    </div>
                </div>
                <div role="presentation" onClick={onSignOut} className="profile__logout">
                    로그아웃
                </div>
            </div>
        </>
    );
}
