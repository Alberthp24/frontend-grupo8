import PanelAcciones from '../components/PanelAcciones.jsx';

export default function BancoPanel() {
  return (
    <PanelAcciones titulo="Banco Andino · Solicitudes de apertura" ruta="/banco/solicitudes"
      columnas={[['codigo', 'Código'], ['razon_social', 'Solicitante'], ['ruc', 'RUC'], ['estado', 'Estado']]}
      accion={{ texto: 'Aprobar', cuando: 'registrado', rutaPut: (id) => `/banco/aprobar/${id}` }} />
  );
}
