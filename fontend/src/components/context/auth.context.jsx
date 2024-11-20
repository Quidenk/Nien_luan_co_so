import { createContext, useState } from "react";

export const AuthContext = createContext({
    isAutheticated: false,
    user: {
        email: "",
        name: "",
        phone: "",
        address: "",
        avatar: "",
    }
})

export function AuthWrapper(props) {
    const [auth, setAuth] = useState({
        isAutheticated: false,
        user: {
            email: "",
            name: "",
            phone: "",
            address: "",
            avatar: "",
        }
    });

    const [appLoading, setAppLoading] = useState(true);

    return (
        <AuthContext.Provider value={{
            auth, setAuth, appLoading, setAppLoading
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}