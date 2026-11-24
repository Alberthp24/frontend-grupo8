import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const APPS = {
  banco: { nombre: 'Banco Andino', sigla: 'BA' },
  crocanti: { nombre: 'Crocanti Chicken', sigla: 'CC' },
  erp: { nombre: 'ERP Andino', sigla: 'ERP' },
};

// [módulo, rol, ruta, título, descripción]
const ACCESOS = [
  ['banco', 'cliente', '/banco/apertura', 'Abrir cuenta empresarial', 'Solicita tu cuenta y sigue su estado.'],
  ['banco', 'empleado', '/banco/panel', 'Solicitudes de apertura', 'Revisa y aprueba las cuentas nuevas.'],
  ['crocanti', 'cliente', '/crocanti/pedido', 'Hacer un pedido', 'Paga tu pedido para recojo con tu cuenta del banco.'],
  ['crocanti', 'empleado', '/crocanti/panel', 'Pedidos del día', 'Marca los pedidos listos para recojo.'],
  ['erp', 'cliente', '/erp/demo', 'Demo y reporte de ventas', 'Solicita el ERP y consulta tus ventas pagadas.'],
  ['erp', 'administrador', '/erp/panel', 'Solicitudes de demo', 'Aprueba las demos de las empresas.'],
];

const FLUJO = [
  ['1', 'Banco Andino', 'La empresa abre su cuenta y el banco la aprueba.'],
  ['2', 'Crocanti', 'El cliente paga su pedido con una cuenta aprobada.'],
  ['3', 'ERP Andino', 'Las ventas pagadas llegan al reporte por día.'],
];

export default function Inicio() {
  const { user, tieneRol } = useAuth();
  const accesos = ACCESOS.filter(([m, r]) => tieneRol(m, r));

  return (
    <section>
      <div className="hero">
        <p className="hero-sub">Sistema integrado · Grupo 8</p>
        <h1>Hola, {user.nombre}</h1>
        <p>Un solo inicio de sesión para tres aplicaciones conectadas por la misma base de datos.</p>
        <div className="chips">
          {user.roles.map((r) => (
            <span key={r.modulo} className="chip">{APPS[r.modulo]?.nombre ?? r.modulo} · {r.rol}</span>
          ))}
        </div>
      </div>

      <h3>Lo que puedes hacer</h3>
      <div className="grid-accesos">
        {accesos.map(([m, , ruta, titulo, desc]) => (
          <Link key={ruta} to={ruta} className="acceso">
            <span className="sigla">{APPS[m].sigla}</span>
            <b>{titulo}</b>
            <small>{APPS[m].nombre}</small>
                        <p>{desc}</p>
          </Link>
        ))}
      </div>

      <h3>Cómo se conectan las apps</h3>
      <div className="flujo">
        {FLUJO.map(([n, t, d]) => (
          <div key={n} className="paso"><span>{n}</span><b>{t}</b><p>{d}</p></div>
        ))}
      </div>
    </section>
  );
}