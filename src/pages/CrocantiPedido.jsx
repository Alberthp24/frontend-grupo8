import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { mensajeError } from '../api/client.js';
import { useAuth } from '../hooks/useAuth.jsx';
import { requerido, monto as vMonto, imagen as vImg, primero } from '../utils/validar.js';
import Campo from '../components/Campo.jsx';
import Aviso from '../components/Aviso.jsx';

export default function CrocantiPedido() {
  const { user } = useAuth();
  const [cuentas, setCuentas] = useState(null);
  const [cuenta, setCuenta] = useState('');
  const [producto, setProducto] = useState('Combo Familiar 8 Piezas');
  const [monto, setMonto] = useState('38.90');
  const [img, setImg] = useState(null);
  const [errs, setErrs] = useState({});
  const [msg, setMsg] = useState('');
  const [fallo, setFallo] = useState('');

  useEffect(() => {
    api.get(`/crocanti/cuentas-aprobadas/${user.id}`)
      .then(({ data }) => { setCuentas(data); if (data[0]) setCuenta(data[0].id); })
      .catch((e) => { setCuentas([]); setFallo(mensajeError(e)); });
  }, [user.id]);

  const pagar = async (e) => {
    e.preventDefault();
    const v = { p: requerido(producto, 'El producto'), m: vMonto(monto), c: cuenta ? '' : 'Elige una cuenta aprobada', i: vImg(img) };
    setErrs(v);
    if (primero(v)) return;
    const fd = new FormData();
    fd.append('id_usuario', user.id); fd.append('id_cuenta', cuenta); fd.append('producto', producto.trim());
    fd.append('local_recojo', 'Real Plaza Huancayo'); fd.append('monto', monto);
    if (img) fd.append('imagen', img);
    try {
      const { data } = await api.post('/crocanti/pedido', fd);
      setMsg(`Pedido pagado con Banco Andino: ${data.codigo}`); setFallo(''); setImg(null);
    } catch (x) { setFallo(mensajeError(x)); setMsg(''); }
  };

  if (cuentas === null) return <p>Cargando…</p>;
  if (cuentas.length === 0) return (
    <section className="tarjeta"><h2>Crocanti · Pedido para recojo</h2>
      <Aviso tipo="error">Necesitas una cuenta aprobada en Banco Andino para pagar.</Aviso>
      <Link to="/banco/apertura">Abrir cuenta en Banco Andino</Link></section>
  );

  return (
    <form className="tarjeta" onSubmit={pagar} noValidate>
      <h2>Crocanti · Pedido para recojo</h2>
      <Campo label="Producto" value={producto} error={errs.p} onChange={(e) => setProducto(e.target.value)} />
      <Campo label="Monto (S/)" type="number" step="0.01" value={monto} error={errs.m} onChange={(e) => setMonto(e.target.value)} />
      <label className="campo">Pagar con
        <select value={cuenta} onChange={(e) => setCuenta(e.target.value)}>
          {cuentas.map((c) => <option key={c.id} value={c.id}>{c.codigo} · {c.razon_social}</option>)}
        </select>
      </label>
      <Campo label="Comprobante (opcional)" type="file" accept="image/*" error={errs.i} onChange={(e) => setImg(e.target.files[0] || null)} />
      <Aviso>{msg}</Aviso><Aviso tipo="error">{fallo}</Aviso>
      <button>Pagar pedido</button>
    </form>
  );
}
