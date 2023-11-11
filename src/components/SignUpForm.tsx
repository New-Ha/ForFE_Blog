import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { app } from 'firebaseApp';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../assets/LOGO.svg';

export default function SignUpForm() {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const auth = getAuth(app);
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(credentials.user, {
                displayName: name,
            });
            toast.success('회원가입이 완료되었습니다.');
            navigate('/');
        } catch (err: any) {
            console.log(err);
            toast.error(err?.code);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;

        if (name === 'name') {
            setName(value);
            if (value?.length < 2) setError('이름은 두 글자 이상이어야 합니다.');
            else setError('');
        }
        if (name === 'email') {
            setEmail(value);
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!value?.match(validRegex)) setError('이메일 형식이 올바르지 않습니다.');
            else setError('');
        }
        if (name === 'password') {
            setPassword(value);
            if (value?.length < 8) setError('비밀번호는 8자리 이상이어야 합니다.');
            else if (confirm?.length > 0 && value !== confirm)
                setError('입력한 비밀번호가 다릅니다. 다시 확인해주세요.');
            else setError('');
        }
        if (name === 'password_confirm') {
            setConfirm(value);
            setPassword(value);
            if (value?.length < 8) setError('비밀번호는 8자리 이상이어야 합니다.');
            else if (value !== password) setError('입력한 비밀번호가 다릅니다. 다시 확인해주세요.');
            else setError('');
        }
    };

    return (
        <>
            <form onSubmit={onSubmit} className="form form-lg">
                <img src={logo} className="auth__logo" />
                <h1 className="form__title">회원가입</h1>
                <div className="from__auth_container">
                    <div className="form__block">
                        <label htmlFor="name">이름</label>
                        <input type="text" name="name" id="name" onChange={onChange} required />
                    </div>
                    <div className="form__block">
                        <label htmlFor="email">이메일</label>
                        <input type="email" name="email" id="email" onChange={onChange} required />
                    </div>
                    <div className="form__block">
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" name="password" id="password" onChange={onChange} required />
                    </div>
                    <div className="form__block">
                        <label htmlFor="password_confirm">비밀번호 확인</label>
                        <input
                            type="password"
                            name="password_confirm"
                            id="password_confirm"
                            onChange={onChange}
                            required
                        />
                    </div>
                    {error && error?.length > 0 && (
                        <div className="form__block">
                            <div className="form__error">{error}</div>
                        </div>
                    )}
                </div>
                <div className="form__block-center">
                    계정이 이미 있으신가요? 
                    <Link to="/login" className="form__link">
                        로그인하기
                    </Link>
                </div>
                <div className="form_btn_box">
                    <div className="form__btn_block">
                        <input
                            type="submit"
                            value="회원가입"
                            className="form__btn-submit"
                            disabled={error?.length > 0}
                        />
                    </div>
                </div>
            </form>
        </>
    );
}
