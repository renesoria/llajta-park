import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Montserrat } from "next/font/google";

const font = Montserrat({ 
  subsets: ["latin"], 
  weight: ["800"] 
});

export default function Home() {
 const figmaBlue = "bg-[#009FE3] hover:bg-[#0077aa]";

  return (
    <main className={`relative h-screen w-full overflow-hidden bg-black ${font.className}`}>
      
      {/* ================= CAPA 1: FONDO ================= */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/fondo-cbba.jpg"
          alt="Fondo Cochabamba"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      </div>

      {/* ================= CAPA 2: HEADER ================= */}
      <header className="absolute top-0 right-0 z-20 p-6 flex items-center gap-4 pt-6 pr-8">
        <Link href="/register">
          <Button variant="ghost" className="text-white hover:bg-white/10 text-sm font-semibold px-6 border border-white/20">
            Registrarse
          </Button>
        </Link>
        <Link href="/login">
          <Button className={`${figmaBlue} text-white text-sm font-bold px-8 py-3 rounded-lg shadow-lg`}>
            Iniciar Sesión
          </Button>
        </Link>
      </header>

      {/* ================= CAPA 3: CONTENIDO ================= */}
      <div className="relative z-10 container mx-auto h-full flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16">

        {/* --- IZQUIERDA: LOGO Y TEXTO --- */}
        <div className="flex flex-col items-center lg:items-start space-y-4 z-30 relative pt-20 lg:pt-0 lg:ml-24">

          <div className="relative w-[300px] h-[150px] lg:w-[500px] lg:h-[250px] -ml-4 lg:-ml-12">
            <Image
              src="/logo llajta.png"
              alt="Llajta Park Logo"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* TÍTULO: Reducido de text-5xl a text-4xl para que no sea tan invasivo */}
          <h1 className="text-2xl lg:text-4xl text-white font-extrabold tracking-tight drop-shadow-lg leading-tight text-center lg:text-left -mt-6">
            Encuentra tu sitio de parqueo <br className="hidden lg:block"/>
            de manera sencilla
          </h1>

          <Link href="/register">
            <Button className={`${figmaBlue} text-white text-xl font-bold px-20 py-6 rounded-lg shadow-[0_0_30px_rgba(2,116,190,0.5)] transition-transform hover:scale-105 mt-6`}>
              Empezar
            </Button>
          </Link>
        </div>

        {/* --- DERECHA: LA MANO (MÁS GRANDE) --- */}
        {/* Aumenté el tamaño a w-[1100px] h-[1300px] y ajusté la posición right-[-15%] para compensar */}
        <div className="hidden lg:block absolute bottom-[-5%] right-[-15%] z-20 w-[700px] h-[800px] lg:w-[1100px] lg:h-[1300px] pointer-events-none translate-y-0">
          <Image
            src="/celular-v2.png"
            alt="App Preview"
            fill
            className="object-contain object-bottom drop-shadow-2xl rotate-[-5deg]"
            priority
          />
        </div>
      </div>
    </main>
  );
}