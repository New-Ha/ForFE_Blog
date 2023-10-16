import { Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/posts">Posts</Link>
                </li>
                <li>
                    <Link to="/posts/:id">Post Detail</Link>
                </li>
                <li>
                    <Link to="/posts/new">New Posts</Link>
                </li>
                <li>
                    <Link to="/posts/edit/:id">Edit Posts</Link>
                </li>
                <li>
                    <Link to="/profile">profile</Link>
                </li>
            </ul>
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/posts" element={<h1>Post List</h1>} />
                <Route path="/posts/:id" element={<h1>Post Detail</h1>} />
                <Route path="/posts/new" element={<h1>Post New</h1>} />
                <Route path="/posts/edit/:id" element={<h1>Post Edit</h1>} />
                <Route path="/profile" element={<h1>Profile</h1>} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </>
    );
}

export default App;
