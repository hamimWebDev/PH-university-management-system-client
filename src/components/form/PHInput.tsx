import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type InputT = {
  type: string;
  name: string;
  label?: string;
};
const PHInput = ({ type, name, label }: InputT) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              className="border-4 border-white-700"
              type={type}
              id={name}
              size="large"
            />
            {error && <small className="text-red-600">{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
