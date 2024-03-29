import React, { createContext, useContext, useEffect, useState } from 'react'
import { USER_INFO } from '../contants';

export interface BaseTodoProps {
    id: string;
    text: string;
    isChecked: boolean;
}
export interface TodoProps extends BaseTodoProps {
    children: BaseTodoProps[];
}
interface UserInfo {
    username: string;
    password: string;
}


interface GlobalProps {
    todos: TodoProps[];
    setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
    userData: UserInfo;
    setUserData: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export const GlobalContext = createContext({} as GlobalProps);

const GlobalContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [todos, setTodos] = useState<TodoProps[]>([]);
    const [userData, setUserData] = useState<UserInfo>({
        username: "",
        password: ""
    });

    // initial check 
    useEffect(() => {
        const user = localStorage.getItem(USER_INFO);
        if (user) {
            setUserData(prev => ({ ...prev, username: user }));
        }
    }, []);

    return (
        <GlobalContext.Provider value={{ todos, setTodos, setUserData, userData }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextWrapper;

// custom hook
export const useGlobalContext = () => {
    return useContext(GlobalContext);
}