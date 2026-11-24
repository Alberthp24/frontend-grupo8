import { useLocation } from 'react-router-dom';

// ruta: [app, sigla, título, descripción]
const INFO = {
  '/banco/apertura': ['Banco Andino', 'BA', 'Abrir cuenta empresarial', 'Registra la razón social y el RUC de tu empresa. El banco revisará tu solicitud.'],
  '/banco/panel': ['Banco Andino', 'BA', 'Solicitudes de apertura', 'Revisa las solicitudes de cuenta y apruébalas.'],
  '/crocanti/pedido': ['Crocanti Chicken', 'CC', 'Pedido para recojo', 'Elige tu producto y paga con una cuenta aprobada de Banco Andino.'],
  '/crocanti/panel': ['Crocanti Chicken', 'CC', 'Pedidos del día', 'Marca los pedidos pagados como listos para recojo.'],
  '/erp/demo': ['ERP Andino', 'ERP', 'Demo y reporte de ventas', 'Solicita el ERP para tu empresa y consulta tus ventas pagadas.'],
  '/erp/panel': ['ERP Andino', 'ERP', 'Solicitudes de demo', 'Aprueba las demos que piden las empresas.'],
};

export default function Encabezado() {
  const { pathname } = useLocation();
  const info = INFO[pathname];
  if (!info) return null;
  const [app, sigla, titulo, descripcion] = info;

  return (
    <div className="banner">
      <span className="sigla">{sigla}</span>
      <div>
        <small>{app}</small>
        <h1>{titulo}</h1>
        <p>{descripcion}</p>
      </div>
    </div>
  );
}