"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import api from "@/lib/axios"
import { useUser } from "@/context/UserContext" // Importamos useUser
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormInputs>()
  const router = useRouter()
  const [error, setError] = useState("")
  const { loginUser } = useUser(); // Usamos el hook useUser

  const onSubmit = async (data: LoginFormInputs) => {
    setError("")
    try {
      const res = await api.post('/auth/login', data);

      if (res.status !== 201 && res.status !== 200) throw new Error("Credenciales inválidas")
      
      const result = res.data;
      loginUser(result.user, result.access_token); // Almacenamos el usuario y token usando el contexto

      router.push('/inicio') // Redirige a la página del mapa
    } catch (err: any) { // Type as `any` for easier access to response properties
      if (err.response && err.response.status === 401) {
        setError("Email o contraseña incorrectos.");
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado al iniciar sesión.");
      }
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-black font-sans">
        {/* FONDO */}
        <div className="absolute inset-0 z-0">
            <Image 
                src="/fondo-cbba.jpg" 
                alt="Fondo" 
                fill 
                className="object-cover opacity-60" 
                priority 
            />
             <div className="absolute inset-0 bg-black/40" />
        </div>
        
        {/* TARJETA DE LOGIN */}
        <div className="relative z-10 w-full max-w-md bg-black/75 backdrop-blur-md p-10 rounded-xl border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Iniciar Sesión</h1>
            <p className="text-gray-400 text-sm">Ingresa tus credenciales para iniciar sesión.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && <p className="text-red-500 text-sm text-center font-bold bg-red-500/10 py-1 rounded">{error}</p>}
            
            <div className="space-y-2">
              <Label className="text-white text-sm font-medium ml-1">Email</Label>
              <Input {...register("email")} type="email" className="bg-white text-black border-none h-11 rounded-md" placeholder="email@example.com" required />
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm font-medium ml-1">Contraseña</Label>
              <Input {...register("password")} type="password" className="bg-white text-black border-none h-11 rounded-md" placeholder="•••••••" required />
            </div>

            <Button type="submit" className="w-full bg-[#0099ff] hover:bg-[#0077cc] text-white font-bold py-6 text-base rounded-md shadow-lg transition-transform hover:scale-[1.02]">
                Login
            </Button>
            
            <div className="text-center mt-6 text-xs text-gray-400">
                ¿No tienes una cuenta? <Link href="/register" className="text-white hover:underline font-bold">Regístrate</Link>
            </div>
          </form>
        </div>
    </div>
  )
}