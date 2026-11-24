import { useState } from 'react';
import api, { mensajeError } from '../api/client.js';
import { useAuth } from '../hooks/useAuth.jsx';
import useLista from '../hooks/useLista.js';
import Aviso from '../components/Aviso.jsx';

export default function ErpDemo() {
  const { user } = useAuth();
  const { datos: ventas, cargando } = useLista('/erp/ventas');
  const [msg, setMsg] = useState('');
  const [fallo, setFallo] = useState('');
  const maximo = Math.max(1, ...ventas.map((v) => Number(v.total)));

  const solicitar = async () => {
    try {
      const { data } = await api.post('/erp/demo', { id_usuario: user.id, empresa: 'Crocanti Chicken SAC', modulo_solicitado: 'Ventas', usuarios_cant: 3 });
      setMsg(`Demo solicitada: ${data.codigo}`); setFallo('');
    } catch (e) { setFallo(mensajeError(e)); setMsg(''); }
  };

  return (
    <section>
      <div className="tarjeta">
        <h2>ERP Andino · Demo para Crocanti</h2>
        <Aviso>{msg}</Aviso><Aviso tipo="error">{fallo}</Aviso>
        <button onClick={solicitar}>Solicitar demo del ERP</button>
      </div>
      <h3>Ventas pagadas por día</h3>
      {cargando ? <p>Cargando…</p> : ventas.length === 0 ? <p>Aún no hay ventas pagadas.</p> : ventas.map((v) => (
        <div className="barra" key={v.dia}><span>{String(v.dia).slice(0, 10)}</span>
          <i style={{ width: `${(Number(v.total) / maximo) * 100}%` }} /><b>S/ {v.total}</b></div>
      ))}
    </section>
  );
}
