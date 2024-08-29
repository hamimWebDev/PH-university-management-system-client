import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TPHFrom = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & FormDefaults;

interface FormDefaults {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

const PHFrom = ({ onSubmit, children, defaultValues, resolver }: TPHFrom) => {
  const fromDefault: FormDefaults = {};
  if (defaultValues) {
    fromDefault["defaultValues"] = defaultValues;
  }
  if (resolver) {
    fromDefault["resolver"] = resolver;
  }

  const methods = useForm(fromDefault);
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHFrom;
