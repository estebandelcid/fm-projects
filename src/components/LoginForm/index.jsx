"use client"
import useLocalStorage from "@/hooks/useLocalStorage";
import { authKey } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

const API_LOGIN = 'http://corte.fymmx.com/token/'
export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [storedValue, setValue] = useLocalStorage(authKey);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try{
            const response = await fetch(API_LOGIN, {
                method: 'POST',
                headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password })
            });
            if(!response.ok) {
                throw new Error(`Error: ${response.statusText}`)
            }
            const dataRes = await response.json();
            setValue(dataRes.access_token);
            router.push('/')
        } catch (error) {
            console.error('There was an error: ', error);
        } finally {
            setLoading(false)
        }
    }
   

    return(
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <form onSubmit={handleSubmit} className="bg-[#454e56d3]  p-6 rounded-sm shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">F&M Projects</h2>
        <div className="mb-4">
          <input
            type="text"
            id="username"
            value={username}
            placeholder="usuario"
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            id="password"
            value={password}
            placeholder="contraseña"
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-[#9c9c9c] hover:bg-[#777676] text-white font-sm italic py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
          >
            Iniciar sesion
          </button>
        </div>
        <div className="m-4 text-center text-white text-xs italic">
            <a href="/">
            Olvidé mi contraseña
            </a>
        </div>
        <div className="mb-4 text-center text-white text-xs italic">
            <a href="/register">
            Registrarme
            </a>
        </div>
      </form>
    </div>
    )
}