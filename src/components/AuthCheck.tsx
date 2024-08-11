import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { clientApp } from '@/firebase/client';

const AuthCheck: React.FC = () => {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); // New state to track loading

    useEffect(() => {
        const auth = getAuth(clientApp);

        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.email) {
                setUserEmail(user.email);
            }
            setIsLoading(false); // Stop loading once the auth state is known
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    return (
        // <></>
        <p id="auth-message">
            {isLoading
                ? 'Loading...'
                : userEmail
                ? `You are currently logged in as: ${userEmail}`
                : 'Already have an account? Sign in'}
        </p>
    );
};

export default AuthCheck;
