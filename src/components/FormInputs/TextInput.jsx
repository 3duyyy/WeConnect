import { TextField } from "@mui/material";

const TextInput = ({ onChange, value, name, error, type = "text" }) => {
  return (
    <div>
      <TextField
        fullWidth
        slotProps={{ input: { className: "h-10 px-3 py-2" }, htmlInput: { className: "!p-0" } }}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        error={error}
      />
    </div>
  );
};

export default TextInput;
