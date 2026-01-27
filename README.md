#  Llajta Park

**Sistema de Gestión de Parqueos para Cochabamba**

Llajta Park es una plataforma web que conecta a conductores con dueños de parqueos, permitiendo reservas en tiempo real y gestión de espacios. El proyecto busca solucionar el caos vehicular en el Casco Viejo y zonas concurridas de la ciudad.

---

##  Tecnologías (Tech Stack)

El proyecto utiliza una arquitectura **Monorepo**:

###  Backend
- **Framework:** NestJS (Node.js)
- **Base de Datos:** MySQL
- **ORM:** TypeORM
- **Seguridad:** JWT (Passport Strategy), Bcrypt

###  Frontend
- **Framework:** Next.js 14 (App Router)
- **Estilos:** TailwindCSS + Shadcn UI
- **Mapas:** React Leaflet + OpenStreetMap

###  Infraestructura
- **Docker Compose:** Para orquestar la base de datos localmente.

---

##  Guía de Instalación (Setup)

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina.

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPO>
cd llajta-park
2. Instalar Dependencias
Como es un monorepo, debes instalar las librerías tanto en el backend como en el frontend.

Backend:

Bash
cd backend
npm install
Frontend:

Bash
cd ../frontend
npm install
3. Configurar Variables de Entorno (.env) 
 IMPORTANTE: Los archivos .env no se suben al repositorio por seguridad.

Crea un archivo llamado .env dentro de la carpeta /backend.

Solicita el contenido de este archivo al Tech Lead.

Pégalo y guarda el archivo.

4. Levantar la Base de Datos
Asegúrate de tener Docker Desktop abierto y ejecuta:

Bash
# Desde la raíz del proyecto
docker-compose up -d
-- Ejecutar el Proyecto
Necesitarás dos terminales abiertas:

Terminal 1: Backend (API)

Bash
cd backend
npm run start:dev
El servidor correrá en: http://localhost:3001

Terminal 2: Frontend (Web)

Bash
cd frontend
npm run dev
La web correrá en: http://localhost:3000

-- Flujo de Trabajo (Git Flow)
Para mantener el código ordenado, seguimos estas reglas:

Rama Principal: main (Solo producción, NO editar directamente).

Ramas de Desarrollo: Crea una rama nueva para cada tarea.

Backend: git checkout -b backend/nombre-tarea

Frontend: git checkout -b feat/nombre-tarea

Idioma:

Código del sistema (Auth, Config): Inglés.

Lógica de Negocio (Entidades, DTOs): Español (ej: usuario.entity.ts).

-- Estructura del Proyecto
Plaintext
llajta-park/
├── backend/          # API en NestJS
│   ├── src/
│   │   ├── modulos/  # Módulos de negocio (Usuarios, Parqueos)
│   │   └── app.module.ts
├── frontend/         # Cliente Next.js
│   ├── src/
│   │   ├── app/      # Páginas (Rutas)
│   │   └── features/ # Componentes por funcionalidad
├── docker-compose.yml
└── README.md
