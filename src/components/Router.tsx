import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'pages/home';
import CreatePost from 'pages/posts/create';
import EditPost from 'pages/posts/edit';
import Login from 'pages/login';
import SignUp from 'pages/signUp.tsx';
import Post from 'pages/posts/detail';
import ProfilePage from 'pages/profile';
import PostsPage from 'pages/posts';
import Main from 'pages/main';

export interface RouterProps {
    isAuthenticated: boolean;
}
export default function Router({ isAuthenticated }: RouterProps) {
    return (
        <>
            <Routes>
                {isAuthenticated ? (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/posts" element={<PostsPage />} />
                        <Route path="/posts/:id" element={<Post />} />
                        <Route path="/posts/create" element={<CreatePost />} />
                        <Route path="/posts/edit/:id" element={<EditPost />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="*" element={<Navigate replace to="/" />} />
                    </>
                ) : (
                    <>
                        <Route path="/main" element={<Main />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="*" element={<Navigate replace to="/main" />} />
                    </>
                )}
            </Routes>
        </>
    );
}
