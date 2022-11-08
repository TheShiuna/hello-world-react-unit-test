import { FieldArrayRenderProps, FormikState } from 'formik';
import { ITodoListValues } from 'interfaces';
import { useState, useMemo, useCallback } from 'react';

export const useTodoListInput = (
  push: FieldArrayRenderProps['push'],
  resetForm: (nextState?: Partial<FormikState<ITodoListValues>> | undefined) => void,
) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isClearDisabled, setIsClearDisabled] = useState(true);
  const [value, setValue] = useState('')

  const onChangeToDoListInput = useCallback((newValue: string) => {
    setIsDisabled(newValue.length === 0);
    setValue(newValue);
  }, [setIsDisabled, setValue]);

  const onAddToDoListInput = useCallback(() => {
    if (value.length) {
      push(value);
      setValue('');
      setIsDisabled(true);
      setIsClearDisabled(false);
    }
  }, [push, setValue, setIsDisabled, setIsClearDisabled, value]);

  const onResetToDoListInput = useCallback(() => {
    resetForm();
    setValue('');
    setIsDisabled(true);
    setIsClearDisabled(true);
  }, [resetForm])

  return useMemo(
    () => ({
      isDisabled,
      isClearDisabled,
      value,
      onChangeToDoListInput,
      onAddToDoListInput,
      onResetToDoListInput,
    }),
    [
      isDisabled,
      isClearDisabled,
      value,
      onChangeToDoListInput,
      onAddToDoListInput,
      onResetToDoListInput,
    ]
  );
}
