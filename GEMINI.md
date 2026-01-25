
🚙 LLAJTA PARK - DOCUMENTACIÓN Y CONTEXTO DEL PROYECTO
CONTEXTO MAESTRO PARA IA Y DESARROLLADORES Este documento define la arquitectura, reglas de negocio y flujos de trabajo para el desarrollo del MVP de Llajta Park.

1. 🎯 Visión del Sistema
Llajta Park es una plataforma de gestión de parqueos híbrida (Web + Físico) para Cochabamba. El sistema centraliza la gestión de espacios, permitiendo reservas digitales desde una App y controlando la entrada manual de vehículos casuales en el mismo lugar.

Actores del Sistema (Roles)
CLIENTE (Conductor): Busca parqueo, registra sus vehículos (Placa/Modelo) y hace reservas.

DUEÑO (Owner): Registra sus parqueos, gestiona la entrada/salida y ve sus ganancias.

ADMIN (Superusuario): Aprueba los parqueos nuevos para que sean visibles en el mapa.

2. 🏛️ Arquitectura Técnica (Monorepo)
Infraestructura: Docker Compose corriendo MySQL 8.0 (Puerto 3306).

Backend: NestJS (Node.js) + TypeORM.

Puerto: 3001 (Para evitar conflictos con Frontend).

Frontend: Next.js 14 (App Router) + Tailwind CSS + shadcn/ui.

Puerto: 3000.

Mapas: Leaflet (React-Leaflet) usando OpenStreetMap.

Conexión: Cliente HTTP Axios configurado en src/lib/axios.ts apuntando a localhost:3001.

3. 🧠 Reglas de Negocio Críticas
A. Disponibilidad Híbrida (La Fórmula Maestra)
Un parqueo tiene espacios limitados. El sistema evita el "doble conteo" entre reservas web y gente que entra físico.

Fórmula: Espacios Disponibles = Capacidad Total - (Reservas Activas App + Contador Manual)

Reservas Activas: Estado PENDIENTE o ACTIVA.

Contador Manual: Número que el dueño sube/baja cuando entra un auto casual.

B. "Smart Check-in" (Flujo de Entrada)
El guardia solo tiene un campo: "Ingresar Placa".

Escribe la placa (Ej: 4040-XYZ).

Backend busca: ¿Existe reserva PENDIENTE para hoy?

SÍ: Cambia estado a ACTIVA. (No toca el contador manual).

NO: Es cliente casual. Incrementa +1 al contadorManual del parqueo.

C. Regla de los 15 Minutos (Lazy Expiration)
Si una reserva PENDIENTE no hace Check-in en 15 minutos tras la hora de inicio, el sistema la marca CANCELADA para liberar el espacio.

4. 🗃️ Modelo de Datos (ESPAÑOL) 🇧🇴
REGLA DE ORO: Las Clases usan PascalCase (Usuario, Parqueo) y las propiedades camelCase (nombreCompleto). PROHIBIDO USAR GUIONES BAJOS (_) EN CLASES.

Usuario (Tabla: users)
id: UUID

email: string (Único)

password: string

nombreCompleto: string

rol: ENUM ('CLIENTE', 'DUENO', 'ADMIN')

Vehiculo (Tabla: vehicles)
id: UUID

placa: string (Única)

modelo: string (Ej: "Toyota Corolla")

usuarioId: Relación con Usuario

Parqueo (Tabla: parkings)
id: UUID

nombre: string

direccion: string

latitud: decimal

longitud: decimal

capacidadTotal: integer

ocupadosManual: integer (Default 0)

precioHora: decimal

imagenUrl: string

esAprobado: boolean (Default false)

duenoId: Relación con Usuario

Reserva (Tabla: reservations)
id: UUID

estado: ENUM ('PENDIENTE', 'ACTIVA', 'COMPLETADA', 'CANCELADA')

fechaEntrada: datetime

fechaSalida: datetime

precioTotal: decimal

vehiculoId: Relación con Vehiculo

parqueoId: Relación con Parqueo

5. 📂 Estructura de Carpetas (Vertical Slicing)
Backend (/backend/src)
Estructura modular en ESPAÑOL para la lógica de negocio.

Plaintext
/src
 ├── /modulos
 │    ├── /auth          # (Inglés estándar) Login/JWT
 │    ├── /usuarios      # Entity: Usuario
 │    ├── /parqueos      # Entity: Parqueo
 │    └── /reservas      # Entity: Reserva
 ├── /config             # DB Config
 └── main.ts             # Puerto 3001, CORS activado
Frontend (/frontend/src)
Features organizadas por funcionalidad en ESPAÑOL.

Plaintext
/src
 ├── /app                # Rutas (Pages)
 ├── /features           # 🧠 LÓGICA DE NEGOCIO
 │    ├── /auth          # Login, Registro
 │    ├── /parqueos      # Gestión de mis parqueos / Buscador
 │    ├── /reservas      # Mis reservas / Check-in
 │    └── /mapa          # Componente del Mapa
 └── /lib
      └── axios.ts       # BaseURL: http://localhost:3001
6. 🛠️ Instrucciones para IA (Generación de Código)
Idioma: Generar nombres de variables, funciones y comentarios de negocio en Español.

Estilo:

Clases: PascalCase (class DetalleReserva).

Variables: camelCase (const fechaInicio).

NO USAR snake_case (detalle_reserva ❌).

Frontend: Usar siempre componentes de shadcn/ui. Importar axios de @/lib/axios.