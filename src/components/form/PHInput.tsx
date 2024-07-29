import { Input } from "antd";
import { Controller } from "react-hook-form";

type InputT = {
  type: string;
  name: string;
  label?: string;
};
const PHInput = ({ type, name, label }: InputT) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label ? <label htmlFor={label}>{label}: </label> : null}
      <Controller
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            className="border-4 border-white-700"
            type={type}
            id={name}
          />
        )}
      />
    </div>
  );
};

export default PHInput;
