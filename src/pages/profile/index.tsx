import Footer from 'components/Footer';
import Header from 'components/Header';
import PostList from 'components/PostList';
import Profile from 'components/Profile';
import { useState } from 'react';

type ProfileTab = 'profile' | 'posts';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<ProfileTab>('profile');
    return (
        <>
            <Header />
            <div className="profile__navigation">
                <div
                    role="presentation"
                    onClick={() => setActiveTab('profile')}
                    className={activeTab === 'profile' ? 'profile__navigation-active' : ''}>
                    내 프로필
                </div>
                <div
                    role="presentation"
                    onClick={() => setActiveTab('posts')}
                    className={activeTab === 'posts' ? 'profile__navigation-active' : ''}>
                    내 활동
                </div>
            </div>
            {activeTab === 'profile' ? <Profile /> : <PostList hasNavigation={false} defaultTab="my" />}
            <Footer />
        </>
    );
}
