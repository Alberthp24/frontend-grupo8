import { useState } from 'react';
import api, { mensajeError } from '../api/client.js';
import { useAuth } from '../hooks/useAuth.jsx';
import useLista from '../hooks/useLista.js';
import { requerido, primero } from '../utils/validar.js';
import Campo from '../components/Campo.jsx';
import Aviso from '../components/Aviso.jsx';
import Estado from '../components/Estado.jsx';

const MODULOS = ['Ventas', 'Inventario', 'Compras', 'Contabilidad'];

export default function ErpDemo() {
  const { user } = useAuth();
  const demos = useLista('/erp/solicitudes');
  const { datos: ventas, cargando } = useLista('/erp/ventas');
  const [empresa, setEmpresa] = useState('');
  const [modulo, setModulo] = useState('Ventas');
  const [usuarios, setUsuarios] = useState('3');
  const [errs, setErrs] = useState({});
  const [msg, setMsg] = useState('');
  const [fallo, setFallo] = useState('');

  const mias = demos.datos.filter((d) => d.id_usuario === user.id);
  const aprobada = mias.some((d) => d.estado === 'aprobada');
  const total = ventas.reduce((s, v) => s + Number(v.total), 0);
  const maximo = Math.max(1, ...ventas.map((v) => Number(v.total)));
  const mejor = ventas.reduce((m, v) => (Number(v.total) > Number(m?.total ?? 0) ? v : m), null);

  const solicitar = async (e) => {
    e.preventDefault();
    const v = {
      e: requerido(empresa, 'La empresa'),
      u: Number(usuarios) >= 1 && Number(usuarios) <= 50 ? '' : 'Usuarios entre 1 y 50',
    };
    setErrs(v);
    if (primero(v)) return;
    try {
      const { data } = await api.post('/erp/demo', {
        id_usuario: user.id, empresa: empresa.trim(),
        modulo_solicitado: modulo, usuarios_cant: Number(usuarios),
      });
      setMsg(`Demo solicitada: ${data.codigo}`); setFallo(''); setEmpresa('');
      demos.recargar();
    } catch (x) { setFallo(mensajeError(x)); setMsg(''); }
  };

  return (
    <section>
      <form className="tarjeta" onSubmit={solicitar} noValidate>
        <h2>ERP Andino · Solicitar demo</h2>
        <Campo label="Empresa" value={empresa} error={errs.e} onChange={(e) => setEmpresa(e.target.value)} />
        <label className="campo">Módulo
          <select value={modulo} onChange={(e) => setModulo(e.target.value)}>
            {MODULOS.map((m) => <option key={m}>{m}</option>)}
          </select>
        </label>
        <Campo label="Usuarios" type="number" value={usuarios} error={errs.u} onChange={(e) => setUsuarios(e.target.value)} />
        <Aviso>{msg}</Aviso><Aviso tipo="error">{fallo}</Aviso>
        <button>Solicitar demo</button>
      </form>

      <h3>Mis solicitudes</h3>
      <div className="tabla-wrap"><table>
        <thead><tr><th>Código</th><th>Empresa</th><th>Módulo</th><th>Estado</th></tr></thead>
        <tbody>
          {mias.length === 0 && <tr><td colSpan="4">Aún no has solicitado una demo</td></tr>}
          {mias.map((d) => (
            <tr key={d.id}><td>{d.codigo}</td><td>{d.empresa}</td><td>{d.modulo_solicitado}</td><td><Estado valor={d.estado} /></td></tr>
          ))}
        </tbody>
      </table></div>

      <h3>Reporte de ventas pagadas</h3>
      {!aprobada ? (
        <Aviso tipo="error">El reporte se activa cuando el administrador del ERP apruebe tu demo.</Aviso>
      ) : cargando ? <p>Cargando…</p> : ventas.length === 0 ? <p>Aún no hay ventas pagadas.</p> : (
        <>
          <div className="stats">
            <div className="stat">Total vendido<b>S/ {total.toFixed(2)}</b></div>
            <div className="stat">Días con ventas<b>{ventas.length}</b></div>
            <div className="stat">Mejor día<b>{mejor?.dia}</b></div>
          </div>
          {ventas.map((v) => (
            <div className="barra" key={v.dia}><span>{v.dia}</span>
              <i style={{ width: `${(Number(v.total) / maximo) * 100}%` }} /><b>S/ {v.total}</b></div>
          ))}
        </>
      )}
    </section>
  );
}