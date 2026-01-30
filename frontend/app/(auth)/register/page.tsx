"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import api from "@/lib/axios" // Importamos la instancia de axios
import { useUser } from "@/context/UserContext" // Importamos useUser
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface RegisterFormInputs {
  nombreCompleto: string;
  email: string;
  telefono: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterFormInputs>()
  const router = useRouter()
  const [error, setError] = useState("")
  const { loginUser } = useUser(); // Usamos el hook useUser

  const onSubmit = async (data: RegisterFormInputs) => {
    setError("")
    // Validación rápida de contraseñas
    if (data.password !== data.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    try {
      // Usar la instancia de axios
      const res = await api.post('/auth/register', {
        nombreCompleto: data.nombreCompleto,
        email: data.email,
        telefono: data.telefono,
        password: data.password
      });
      
      const result = res.data;
      loginUser(result.user, result.access_token); // Almacenamos el usuario y token usando el contexto

      router.push('/inicio') // Redirige directamente a la página principal
    } catch (err: any) { // Type as `any` for easier access to response properties
      if (err.response && err.response.status === 409) { // Conflict, user already exists
        setError("El email ya está registrado.");
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado al registrarse.");
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
            {/* Degradado oscuro suave */}
            <div className="absolute inset-0 bg-black/40" />
        </div>
        
        {/* TARJETA DE REGISTRO */}
        <div className="relative z-10 w-full max-w-md bg-black/75 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Registrarse</h1>
            <p className="text-gray-400 text-sm">Ingresa tus credenciales para registrarte.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}
            
            <div className="space-y-1">
              <Label className="text-white text-sm font-medium ml-1">Nombre Completo</Label>
              <Input {...register("nombreCompleto")} className="bg-white text-black border-none h-10 rounded-md" placeholder="Juan Perez" required />
            </div>
            
            <div className="space-y-1">
              <Label className="text-white text-sm font-medium ml-1">Email</Label>
              <Input {...register("email")} type="email" className="bg-white text-black border-none h-10 rounded-md" placeholder="email@example.com" required />
            </div>

            <div className="space-y-1">
                <Label className="text-white text-sm font-medium ml-1">Teléfono</Label>
                <Input {...register("telefono")} className="bg-white text-black border-none h-10 rounded-md" placeholder="77712345" required />
            </div>

            <div className="space-y-1">
              <Label className="text-white text-sm font-medium ml-1">Contraseña</Label>
              <Input {...register("password")} type="password" className="bg-white text-black border-none h-10 rounded-md" placeholder="•••••••" required />
            </div>

            <div className="space-y-1">
              <Label className="text-white text-sm font-medium ml-1">Repetir Contraseña</Label>
              <Input {...register("confirmPassword")} type="password" className="bg-white text-black border-none h-10 rounded-md" placeholder="•••••••" required />
            </div>

            <Button type="submit" className="w-full bg-[#0099ff] hover:bg-[#0077cc] text-white font-bold py-6 text-base mt-4 rounded-md shadow-lg transition-transform hover:scale-[1.02]">
                Registrarse
            </Button>
            
            <div className="text-center mt-6 text-xs text-gray-400">
                ¿Ya tienes una cuenta? <Link href="/login" className="text-white hover:underline font-bold">Inicia Sesión</Link>
            </div>
          </form>
        </div>
    </div>
  )
}