function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  children,
}) {
  return (
    <div className="auth-field">
      <label className="auth-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="auth-field__control">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className={`auth-input${error ? ' auth-input--error' : ''}${
            children ? ' auth-input--trailing' : ''
          }`}
        />
        {children}
      </div>
      {error ? <p className="auth-field__error">{error}</p> : null}
    </div>
  );
}

export default FormField;
