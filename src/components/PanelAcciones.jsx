import { useState } from 'react';
import api, { mensajeError } from '../api/client.js';
import useLista from '../hooks/useLista.js';
import Estado from './Estado.jsx';
import Aviso from './Aviso.jsx';

// Props: titulo, ruta (GET), columnas [[campo, encabezado]], accion {texto, rutaPut(id), cuando}
export default function PanelAcciones({ titulo, ruta, columnas, accion }) {
  const { datos, cargando, error, recargar } = useLista(ruta);
  const [msg, setMsg] = useState('');
  const [fallo, setFallo] = useState('');

  const ejecutar = async (id) => {
    try { await api.put(accion.rutaPut(id)); setMsg('Estado actualizado'); setFallo(''); recargar(); }
    catch (e) { setFallo(mensajeError(e)); }
  };

  return (
    <section>
      <h2>{titulo}</h2>
      <Aviso>{msg}</Aviso><Aviso tipo="error">{error || fallo}</Aviso>
      {cargando ? <p>Cargando…</p> : (
        <div className="tabla-wrap"><table>
          <thead><tr>{columnas.map(([, h]) => <th key={h}>{h}</th>)}<th>Acción</th></tr></thead>
          <tbody>
            {datos.length === 0 && <tr><td colSpan={columnas.length + 1}>Sin registros</td></tr>}
            {datos.map((f) => (
              <tr key={f.id}>
                {columnas.map(([c]) => <td key={c}>{c === 'estado' ? <Estado valor={f.estado} /> : c === 'monto' ? `S/ ${f.monto}` : f[c] ?? '—'}</td>)}
                <td>{f.estado === accion.cuando && <button onClick={() => ejecutar(f.id)}>{accion.texto}</button>}</td>
              </tr>
            ))}
          </tbody>
        </table></div>
      )}
    </section>
  );
}
