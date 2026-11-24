const VERDE = ['aprobada', 'pagado', 'listo para recojo'];
export default function Estado({ valor }) {
  const clase = VERDE.includes(valor) ? 'verde' : valor === 'rechazado' ? 'rojo' : 'gris';
  return <span className={`badge ${clase}`}>{valor}</span>;
}
