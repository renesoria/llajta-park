"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
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

  const onSubmit = async (data: RegisterFormInputs) => {
    setError("")
    // Validación rápida de contraseñas
    if (data.password !== data.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    try {
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreCompleto: data.nombreCompleto,
          email: data.email,
          telefono: data.telefono,
          password: data.password
        }),
      })

      if (!res.ok) throw new Error("Error al registrarse")
      
      alert("¡Cuenta creada! Ahora inicia sesión.")
      router.push('/login')
    } catch (_err) { // Let TypeScript infer `unknown` or explicitly type as `Error` if certain
      if (_err instanceof Error) {
        setError(_err.message);
      } else {
        setError("Error al conectar con el servidor.");
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