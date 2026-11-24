import PanelAcciones from '../components/PanelAcciones.jsx';

export default function ErpPanel() {
  return (
    <PanelAcciones titulo="ERP Andino · Solicitudes de demo" ruta="/erp/solicitudes"
      columnas={[['codigo', 'Código'], ['empresa', 'Empresa'], ['modulo_solicitado', 'Módulo'], ['estado', 'Estado']]}
      accion={{ texto: 'Aprobar demo', cuando: 'registrado', rutaPut: (id) => `/erp/aprobar/${id}` }} />
  );
}
