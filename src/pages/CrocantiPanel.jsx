import PanelAcciones from '../components/PanelAcciones.jsx';

export default function CrocantiPanel() {
  return (
    <PanelAcciones titulo="Crocanti · Pedidos del día" ruta="/crocanti/pedidos"
      columnas={[['codigo', 'Código'], ['cliente', 'Cliente'], ['producto', 'Producto'], ['monto', 'Monto'], ['estado', 'Estado']]}
      accion={{ texto: 'Marcar listo', cuando: 'pagado', rutaPut: (id) => `/crocanti/pedido-listo/${id}` }} />
  );
}
