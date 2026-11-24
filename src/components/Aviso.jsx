export default function Aviso({ tipo = 'ok', children }) {
  return children ? <div className={`aviso ${tipo}`} role="alert">{children}</div> : null;
}
