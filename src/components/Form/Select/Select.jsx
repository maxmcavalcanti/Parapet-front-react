import "./Select.css";

export function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className="form_control">
      <label htmlFor={name}>{text}:</label>
      <select
        name={name}
        id={name}
        value={value || ""}
        onChange={handleOnChange}
      >
        {" "}
        <option>Selecione uma opção</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
