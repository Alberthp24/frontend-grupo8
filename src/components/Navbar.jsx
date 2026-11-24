import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const ENLACES = [
  ['/banco/apertura', 'Banco: Abrir cuenta', 'banco', 'cliente'],
  ['/banco/panel', 'Banco: Panel', 'banco', 'empleado'],
  ['/crocanti/pedido', 'Crocanti: Pedido', 'crocanti', 'cliente'],
  ['/crocanti/panel', 'Crocanti: Cocina', 'crocanti', 'empleado'],
  ['/erp/demo', 'ERP: Demo y ventas', 'erp', 'cliente'],
  ['/erp/panel', 'ERP: Panel', 'erp', 'administrador'],
];

export default function Navbar() {
  const { user, logout, tieneRol } = useAuth();
  const ir = useNavigate();
  if (!user) return null;
  return (
    <header className="navbar">
      <strong>Grupo 8 · Crocanti · Banco Andino · ERP</strong>
      <nav>
        <NavLink to="/" end>Inicio</NavLink>
        {ENLACES.filter(([, , m, r]) => tieneRol(m, r)).map(([to, txt]) => <NavLink key={to} to={to}>{txt}</NavLink>)}
      </nav>
      <span>{user.nombre} <button className="sec" onClick={() => { logout(); ir('/login'); }}>Salir</button></span>
    </header>
  );
}
