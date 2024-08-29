import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHFromSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const PHSelect = ({ label, name, options }: TPHFromSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
          />
          {error && <small className="text-red-600">{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
