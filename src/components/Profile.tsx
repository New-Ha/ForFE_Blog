import AuthContext from 'context/AuthContext';
import { getAuth, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { app, db, storage } from 'firebaseApp';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

export default function Profile({ hasNavigation = true, defaultTab = 'profile' }) {
    // const auth = getAuth(app); 대신에 useContext를 사용해 바로 유저값을 가져올 수 있다.
    const { user } = useContext(AuthContext);
    const [avatar, setAvatar] = useState(user?.photoURL);
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === 'email') {
            setEmail(value);
        }
        if (name === 'name') {
            setName('');
        }
        if (name === 'password') {
            setPassword('');
        }
    };

    const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!user) return;
        if (files && files.length === 1) {
            const file = files[0];
            const locationRef = ref(storage, `avatars/${user.uid}`);
            const result = await uploadBytes(locationRef, file);
            const avatarUrl = await getDownloadURL(result.ref);
            setAvatar(avatarUrl);
            await updateProfile(user, {
                photoURL: avatarUrl,
            });
        }
    };

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
                    <label className="profile__img" htmlFor="avatar">
                        {avatar ? (
                            <img src={avatar} />
                        ) : (
                            <svg
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true">
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                />
                            </svg>
                        )}
                        <input
                            type="file"
                            id="avatar"
                            className="profile__avatar_input"
                            accept="image/*"
                            onChange={onAvatarChange}
                        />
                    </label>
                </div>
                <div role="presentation" onClick={onSignOut} className="profile__logout">
                    로그아웃
                </div>
                <form className="profile__form">
                    <div>
                        <div className="profile__content_box">
                            <div className="profile__block">
                                <label htmlFor="name">이 름</label>
                                <input type="text" onChange={onChange} value={name} name="name" id="name" required />
                            </div>
                            <div className="profile__block">
                                <label htmlFor="email"> 이메일 </label>
                                <input
                                    type="email"
                                    onChange={onChange}
                                    value={email}
                                    name="email"
                                    id="email"
                                    required
                                />
                            </div>
                            <div className="profile__block">
                                <label htmlFor="password">비밀번호</label>
                                <input
                                    type="password"
                                    onChange={onChange}
                                    value={password}
                                    name="password"
                                    id="password"
                                    required
                                />
                            </div>
                            <div className="profile__submit_box">
                                <input type="submit" value="수정" className="profile__btn-submit" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
