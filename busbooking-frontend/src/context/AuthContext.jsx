import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await API.post("/login", { email, password });
        const data = response.data;
        localStorage.setItem("token", data.token);
        
        const userData = { email: data.email, name: data.name, role: data.role };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return userData;
    };

    const register = async (userData) => {
        const response = await API.post("/register", userData);
        const data = response.data;
        localStorage.setItem("token", data.token);
        
        const userObj = { email: data.email, name: data.name, role: data.role };
        localStorage.setItem("user", JSON.stringify(userObj));
        setUser(userObj);
        return userObj;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;