import { DatePicker, Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TDatePicker = {
  name: string;
  label?: string;
};
const PHDatePicker = ({ name, label }: TDatePicker) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker {...field} size="large" style={{ width: "100%" }} />
            {error && <small className="text-red-600">{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
