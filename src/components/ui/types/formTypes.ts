import { FieldPath, FieldValues } from 'react-hook-form';

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

type FormItemContextValue = {
  id: string;
};

type DatePickerProps = {
  field: {
    value?: Date;
    onChange: (event?: Date) => void;
  };
};

export type { FormFieldContextValue, FormItemContextValue, DatePickerProps };
