# Frontend Grupo 8 · Crocanti · Banco Andino · ERP Andino

React + Vite. Un solo login para tres apps (Crocanti, Banco Andino, ERP Andino) con roles desde Neon.

## Estructura
- `src/main.jsx`: arranque (BrowserRouter + AuthProvider)
- `src/App.jsx`: rutas y guarda de roles (`Privada`)
- `src/pages/`: una pantalla por ruta
- `src/components/`: Navbar, Campo, Estado, Aviso, PanelAcciones (reutilizables con props)
- `src/hooks/`: `useAuth` (sesión y roles), `useLista` (GET con useEffect)
- `src/api/client.js`: axios con `VITE_API_URL`
- `src/utils/validar.js`: validaciones (correo, RUC, monto, imagen)
- `src/styles/app.css`: estilos

## Ejecutar
```
npm install
cp .env.example .env
npm run dev
```
## Publicar (Vercel)
Variable `VITE_API_URL=https://tu-api.onrender.com/api`, luego redeploy. `vercel.json` ya incluye preset Vite, `dist` y rewrites.
Nunca subas `.env` ni `node_modules`.
