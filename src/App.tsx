import { useEffect, useState } from 'react';
import { app } from 'firebaseApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Router from 'components/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const auth = getAuth(app);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
    }, [auth]);

    return (
        <>
            <ToastContainer />
            <Router isAuthenticated={isAuthenticated} />
        </>
    );
}

export default App;
