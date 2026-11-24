import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Inicio from './pages/Inicio.jsx';
import BancoApertura from './pages/BancoApertura.jsx';
import BancoPanel from './pages/BancoPanel.jsx';
import CrocantiPedido from './pages/CrocantiPedido.jsx';
import CrocantiPanel from './pages/CrocantiPanel.jsx';
import ErpDemo from './pages/ErpDemo.jsx';
import ErpPanel from './pages/ErpPanel.jsx';
import Encabezado from './components/Encabezado.jsx';

// Guarda de ruta: sin sesión -> /login; sin el rol del módulo -> /
function Privada({ modulo, rol, children }) {
  const { user, tieneRol } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (modulo && !tieneRol(modulo, rol)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="contenedor">
        <Encabezado />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Privada><Inicio /></Privada>} />
          <Route path="/banco/apertura" element={<Privada modulo="banco" rol="cliente"><BancoApertura /></Privada>} />
          <Route path="/banco/panel" element={<Privada modulo="banco" rol="empleado"><BancoPanel /></Privada>} />
          <Route path="/crocanti/pedido" element={<Privada modulo="crocanti" rol="cliente"><CrocantiPedido /></Privada>} />
          <Route path="/crocanti/panel" element={<Privada modulo="crocanti" rol="empleado"><CrocantiPanel /></Privada>} />
          <Route path="/erp/demo" element={<Privada modulo="erp" rol="cliente"><ErpDemo /></Privada>} />
          <Route path="/erp/panel" element={<Privada modulo="erp" rol="administrador"><ErpPanel /></Privada>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
