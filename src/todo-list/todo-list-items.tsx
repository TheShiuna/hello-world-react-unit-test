import React from 'react';
import * as Styled from './todo-list-items.styles';
import { FieldArrayRenderProps } from 'formik'
import { ITodoListValues } from 'interfaces';
import { ToDoListItem } from './todo-list-item';

type IPropsToDoListItems = {
  move: FieldArrayRenderProps['move'];
  remove: FieldArrayRenderProps['remove'];
  values: ITodoListValues;
}

export const ToDoListItems = ({ move, remove, values }: IPropsToDoListItems) => {
  return (
    <Styled.ScrollContainer
      data-testid="todo-list-items-container"
    >
      {values.items.map((_, index) => (
        <ToDoListItem
          key={`todo-list-items[${index}]`}
          baseDataTestId={`todo-list-item-${index}`}
          baseName={'items'}
          index={index}
          move={move}
          remove={remove}
          disabledMoveUp={index === 0}
          disabledMoveDown={values.items.length - 1 === index}
        />
      ))}
    </Styled.ScrollContainer>
  );
}