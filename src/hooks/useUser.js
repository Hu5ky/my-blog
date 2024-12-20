import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useUser = () => {
    const [user, setUser] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            // setIsLoading(false);
        });
        return unsubscribe; //Clean up user when removed from DOM
    }, []); //Call only when component is mounted
    return { user };
}

export default useUser;