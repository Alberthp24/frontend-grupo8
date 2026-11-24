// Props: label, error y el resto (value, onChange, type...) pasan al <input>
export default function Campo({ label, error, ...props }) {
  return (
    <label className="campo">
      {label}
      <input className={error ? 'inv' : ''} {...props} />
      {error && <small className="err">{error}</small>}
    </label>
  );
}
