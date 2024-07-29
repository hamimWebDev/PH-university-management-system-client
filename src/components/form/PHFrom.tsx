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
}

const PHFrom = ({ onSubmit, children, defaultValues }: TPHFrom) => {
  const fromDefault: FormDefaults = {};
  if (defaultValues) {
    fromDefault.defaultValues = defaultValues;
  }

  const methods = useForm(fromDefault);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PHFrom;
