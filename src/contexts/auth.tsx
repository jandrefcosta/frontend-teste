import React, { createContext, useContext, useEffect, useState } from 'react';
import { login } from '../services/auth.service';

interface DefaultPagesProps {
	children: React.ReactNode;
}

export interface AuthContextData {
	signed: boolean;
	user?: any | null;
	Login(login: FormLogin, callback: any): Promise<void>;
}

interface FormLogin {
	login?: string;
	senha?: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<DefaultPagesProps> = ({ children }) => {

	const [user, setUser] = useState<object | null>(null);

	useEffect(() => {
		const storagedToken = sessionStorage.getItem('@App:token');
		if (storagedToken) {
			setUser({ logged: true });
		}
	}, []);

	async function Login(loginRequest: FormLogin, callback: any) {
		try {
			const dataResponse = await login(loginRequest)
			if (dataResponse === ""){
				callback(false);
				return;
			}
			sessionStorage.setItem('@App:token', dataResponse);
			setUser({ logged: true })
		} catch (error) {
			console.log(error)
			callback(false)
		} finally {

		}
	}

	return (
		<AuthContext.Provider value={{
			signed: Boolean(user),
			user, Login,
		}}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);
	return context;
}
