import { FieldArrayRenderProps, FormikState } from 'formik';
import { useTodoListInput } from 'hooks';
import React from 'react';
import { ITodoListValues } from 'interfaces';
import * as Styled from './todo-list-input.styles';

type IToDoListInputProps = {
  push: FieldArrayRenderProps['push'];
  resetForm: (nextState?: Partial<FormikState<ITodoListValues>> | undefined) => void;
};

export const ToDoListInput = ({ push, resetForm }: IToDoListInputProps) => {
  const { 
    isDisabled,
    isClearDisabled,
    value,
    onChangeToDoListInput,
    onAddToDoListInput,
    onResetToDoListInput,
  } = useTodoListInput(push, resetForm);

  return (
    <Styled.InputContainer
      data-testid="todo-list-input-container"
    >
      <Styled.InputText
        data-testid="todo-list-input-text"
        type="text"
        placeholder="Renseignez le champ (optionnel)"
        onChange={(e) => onChangeToDoListInput(e.currentTarget.value)}
        value={value}
        />
      <Styled.Button
        data-testid="todo-list-input-add-button"
        type="button"
        disabled={isDisabled}
        onClick={() => onAddToDoListInput()}
        >
        +
      </Styled.Button>
      <Styled.Button
        data-testid="todo-list-input-clear-button"
        onClick={() => onResetToDoListInput()}
        disabled={isClearDisabled}
        type="button"
        >
        Clr
      </Styled.Button>
    </Styled.InputContainer>
  )
};