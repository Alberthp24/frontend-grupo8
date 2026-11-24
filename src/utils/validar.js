// Cada función devuelve '' si es válido o el mensaje de error
export const requerido = (v, nombre) => (String(v ?? '').trim() ? '' : `${nombre} es obligatorio`);
export const correo = (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Correo no válido');
export const ruc = (v) => (/^(10|20)\d{9}$/.test(v) ? '' : 'RUC: 11 dígitos y empieza con 10 o 20');
export const monto = (v) => (Number(v) > 0 && Number(v) < 5000 ? '' : 'Monto mayor a 0 y menor a S/ 5000');
export const imagen = (f) => {
  if (!f) return '';
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) return 'Solo JPG, PNG o WEBP';
  return f.size > 2 * 1024 * 1024 ? 'La imagen supera 2 MB' : '';
};
export const primero = (errores) => Object.values(errores).find(Boolean) || '';
