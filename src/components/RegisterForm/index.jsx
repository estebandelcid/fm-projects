"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
const API_REGISTER = "http://corte.fymmx.com/register/";
export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [login, setLogin] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await fetch(API_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const dataRes = await response.json();
      router.push("/login");
    } catch (error) {
      console.log("There was an error: ", error);
    } finally {
      setLogin(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="bg-[#454e56d3] p-6 rounded-sm shadow-md w-full max-w-sm"
      >
        <h2 className="text-center text-2xl font-bold mb-6 text-white">
          Crear cuenta
        </h2>
        <div className="mb-4">
          <input
            type="text"
            id="username"
            value={username}
            placeholder="user name"
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            value={email}
            placeholder="correo"
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            value={password}
            placeholder="contraseña"
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-12">
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            placeholder="repetir contraseña"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-[#9c9c9c] hover:hover:bg-[#777676] text-white font-sm italic py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};
