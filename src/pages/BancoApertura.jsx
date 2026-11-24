import { useState } from 'react';
import api, { mensajeError } from '../api/client.js';
import { useAuth } from '../hooks/useAuth.jsx';
import useLista from '../hooks/useLista.js';
import { requerido, ruc as vRuc, imagen as vImg, primero } from '../utils/validar.js';
import Campo from '../components/Campo.jsx';
import Aviso from '../components/Aviso.jsx';
import Estado from '../components/Estado.jsx';

export default function BancoApertura() {
  const { user } = useAuth();
  const { datos, recargar } = useLista('/banco/solicitudes');
  const [razon, setRazon] = useState('');
  const [ruc, setRuc] = useState('');
  const [img, setImg] = useState(null);
  const [errs, setErrs] = useState({});
  const [msg, setMsg] = useState('');
  const [fallo, setFallo] = useState('');

  const enviar = async (e) => {
    e.preventDefault();
    const v = { razon: requerido(razon, 'La razón social'), ruc: vRuc(ruc), img: vImg(img) };
    setErrs(v);
    if (primero(v)) return;
    const fd = new FormData();
    fd.append('id_usuario', user.id); fd.append('razon_social', razon.trim()); fd.append('ruc', ruc);
    fd.append('tipo_cuenta', 'Empresarial'); fd.append('moneda', 'Soles');
    if (img) fd.append('imagen', img);
    try {
      const { data } = await api.post('/banco/apertura', fd);
      setMsg(`Solicitud registrada: ${data.codigo}`); setFallo(''); setRazon(''); setRuc(''); setImg(null); recargar();
    } catch (x) { setFallo(mensajeError(x)); setMsg(''); }
  };

  return (
    <section>
      <form className="tarjeta" onSubmit={enviar} noValidate>
        <h2>Banco Andino · Abrir cuenta empresarial</h2>
        <Campo label="Razón social" value={razon} error={errs.razon} onChange={(e) => setRazon(e.target.value)} />
        <Campo label="RUC" value={ruc} error={errs.ruc} maxLength={11} inputMode="numeric" onChange={(e) => setRuc(e.target.value.replace(/\D/g, ''))} />
        <Campo label="Logo o documento (opcional)" type="file" accept="image/*" error={errs.img} onChange={(e) => setImg(e.target.files[0] || null)} />
        <Aviso>{msg}</Aviso><Aviso tipo="error">{fallo}</Aviso>
        <button>Enviar solicitud</button>
      </form>
      <h3>Mis solicitudes</h3>
      <div className="tabla-wrap"><table>
        <thead><tr><th>Código</th><th>Razón social</th><th>Estado</th></tr></thead>
        <tbody>{datos.filter((s) => s.id_usuario === user.id).map((s) => (
          <tr key={s.id}><td>{s.codigo}</td><td>{s.razon_social}</td><td><Estado valor={s.estado} /></td></tr>
        ))}</tbody>
      </table></div>
    </section>
  );
}
