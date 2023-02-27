import { useRef } from "react"
import { useAuth } from "../../contexts/auth";

import { toast } from 'react-toastify';

export default function LoginPage() {

    const authContext = useAuth();

    const loginRef = useRef<HTMLInputElement>(null);
    const senhaRef = useRef<HTMLInputElement>(null);

    function handleLogin(e: any) {
        e.preventDefault();
        const loginForm = { login: loginRef.current?.value, senha: senhaRef.current?.value }
        authContext.Login(loginForm, (response: any) => {
            if (!response) {
                toast.error("Login e/ou senha inválidos");
            }
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                <form onSubmit={handleLogin}>
                    <div className="mt-4">
                        <div>
                            <label className="block" htmlFor="email">Login</label>
                            <input className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                type="text" placeholder="Login" defaultValue={"letscode"}
                                ref={loginRef}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block">Senha</label>
                            <input className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                type="password" placeholder="Senha" defaultValue={"lets@123"}
                                ref={senhaRef}
                            />
                        </div>
                        <div className="flex items-baseline justify-end">
                            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}