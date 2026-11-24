import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { mensajeError } from '../api/client.js';
import { correo, requerido, primero } from '../utils/validar.js';
import Campo from '../components/Campo.jsx';
import Aviso from '../components/Aviso.jsx';

const CUENTAS = ['admin@crocanti.pe', 'cliente1@correo.com', 'empleado@banco.pe', 'empleado@crocanti.pe', 'admin@erp.pe'];

export default function Login() {
  const { user, login } = useAuth();
  const ir = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const enviar = async (e) => {
    e.preventDefault();
    const err = primero({ e: requerido(email, 'El correo') || correo(email), p: requerido(password, 'La contraseña') });
    if (err) return setError(err);
    try { setEnviando(true); await login(email, password); ir('/'); }
    catch (x) { setError(x.response?.status === 401 ? 'Correo o contraseña incorrectos' : mensajeError(x)); }
    finally { setEnviando(false); }
  };

  return (
    <form className="tarjeta login" onSubmit={enviar} noValidate>
      <h2>Grupo 8 · Sistema integrado</h2>
      <p>Crocanti · Banco Andino · ERP Andino</p>
      <Campo label="Correo" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Campo label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Aviso tipo="error">{error}</Aviso>
      <button disabled={enviando}>{enviando ? 'Ingresando…' : 'Ingresar'}</button>
      <details><summary>Cuentas de prueba (clave 1234)</summary>
        {CUENTAS.map((c) => <button type="button" key={c} className="sec" onClick={() => setEmail(c)}>{c}</button>)}
      </details>
    </form>
  );
}
