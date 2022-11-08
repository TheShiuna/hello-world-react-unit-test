import React from 'react';
import * as Styled from './todo-list-items.styles';
import { FieldArrayRenderProps } from 'formik'
import { ITodoListValues } from './interfaces';
import { ToDoListItem } from './todo-list-item';

type IPropsToDoListItems = {
  arrayHelper: FieldArrayRenderProps;
  values: ITodoListValues;
}

export const ToDoListItems = ({ arrayHelper, values }: IPropsToDoListItems) => {
  console.log(values);
  return (
    <Styled.ScrollContainer>
      {values.items.map((item, index) => (
        <ToDoListItem
          baseName={'items'}
          index={index}
          value={item}
          arrayHelper={arrayHelper}
          disabledMoveUp={index === 0}
          disabledMoveDown={values.items.length - 1 === index}
        />
      ))}
    </Styled.ScrollContainer>
  );
}