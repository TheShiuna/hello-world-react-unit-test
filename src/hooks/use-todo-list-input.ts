import { FieldArrayRenderProps } from 'formik';
import { useState, useMemo, useCallback, useRef } from 'react';

export const useTodoListInput = (arrayHelper: FieldArrayRenderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const onChangeToDoListInput = useCallback(() => {
    const value = inputRef?.current?.value ?? '';
    setIsDisabled(value.length === 0);
  }, [setIsDisabled, inputRef]);

  const onAddToDoListInput = useCallback(() => {
    if (inputRef?.current?.value?.length) {
      arrayHelper.push(inputRef.current.value);
      inputRef.current.value = '';
      setIsDisabled(true);
    }
  }, [arrayHelper, inputRef])

  return useMemo(() => ({
    isDisabled,
    inputRef,
    onChangeToDoListInput,
    onAddToDoListInput,
  }), [isDisabled, inputRef, onChangeToDoListInput, onAddToDoListInput]);
}
