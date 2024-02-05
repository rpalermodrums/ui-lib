import {
  FormFieldContextValue,
  FormItemContextValue,
} from '@/components/ui/types/formTypes';
import { createContext, useContext } from 'react';
import { useFormContext } from 'react-hook-form';

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    className:
      'bg-formfield-grey border-2 border-formfield-grey rounded-sm text-royal text-base box-border caret-teal mt-1 transition-colors duration-200 ease-in-out',
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

export { FormFieldContext, FormItemContext, useFormField };
