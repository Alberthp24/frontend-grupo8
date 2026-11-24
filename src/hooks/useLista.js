import { useCallback, useEffect, useState } from 'react';
import api, { mensajeError } from '../api/client.js';

// Carga una lista GET al montar (useEffect) y permite recargarla
export default function useLista(ruta) {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const recargar = useCallback(async () => {
    try {
      setCargando(true);
      const { data } = await api.get(ruta);
      setDatos(data);
      setError('');
    } catch (e) {
      setError(mensajeError(e));
    } finally {
      setCargando(false);
    }
  }, [ruta]);

  useEffect(() => { recargar(); }, [recargar]);
  return { datos, cargando, error, recargar };
}
