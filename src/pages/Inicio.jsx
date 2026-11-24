import { useAuth } from '../hooks/useAuth.jsx';

export default function Inicio() {
  const { user } = useAuth();
  return (
    <section className="tarjeta">
      <h2>Bienvenido, {user.nombre}</h2>
      <p>Un solo login para tres apps. Tus roles:</p>
      <ul>{user.roles.map((r) => <li key={r.modulo}><b>{r.modulo}</b> → {r.rol}</li>)}</ul>
    </section>
  );
}
