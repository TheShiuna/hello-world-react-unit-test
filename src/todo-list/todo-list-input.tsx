import { FieldArrayRenderProps, FormikState } from 'formik';
import { useTodoListInput } from 'hooks';
import React from 'react';
import { ITodoListValues } from './interfaces';
import * as Styled from './todo-list-input.styles';

type IToDoListInputProps = {
  arrayHelper: FieldArrayRenderProps;
  resetForm: (nextState?: Partial<FormikState<ITodoListValues>> | undefined) => void;
  values: ITodoListValues;
};

export const ToDoListInput = ({ arrayHelper, resetForm, values }: IToDoListInputProps) => {
  const { isDisabled, onChangeToDoListInput, onAddToDoListInput, inputRef } = useTodoListInput(arrayHelper);

  return (
    <Styled.InputContainer>
      <Styled.InputText
        type="text"
        placeholder="Renseignez le champ (optionnel)"
        onChange={() => onChangeToDoListInput()}
        ref={inputRef}
        />
      <Styled.Button
        type="button"
        disabled={isDisabled}
        onClick={() => onAddToDoListInput()}
        >
        +
      </Styled.Button>
      <Styled.Button
        onClick={() => resetForm()}
        disabled={values.items.length === 0}
        type="button"
        >
        Clr
      </Styled.Button>
    </Styled.InputContainer>
  )
};