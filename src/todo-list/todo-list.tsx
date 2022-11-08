import React, { useCallback, useMemo } from 'react';
import * as Styled from './todo-list.styles';
import { ToDoListInput } from './todo-list-input';
import { Formik, Form, FieldArray } from 'formik';
import { ITodoListValues } from './interfaces';
import { ToDoListItems } from './todo-list-items';


export const TodoList = () => {
  const toDoInitialsValues: ITodoListValues = useMemo(() => ({
    items: [],
  }), []);

  const onSubmitValue = useCallback((values: ITodoListValues) => {
    alert(JSON.stringify(values));
  }, []);

  return (
    <Formik
      initialValues={toDoInitialsValues}
      onSubmit={onSubmitValue}
    >
      {({ resetForm, values }) => (
        <Form>
          <FieldArray
            name="items"
            render={arrayHelper => (
              <Styled.ContainerWrapper>
                <Styled.Title>To Do :</Styled.Title>
                <ToDoListInput
                  resetForm={resetForm}
                  arrayHelper={arrayHelper}
                  values={values}
                  />
                <ToDoListItems
                  values={values}
                  arrayHelper={arrayHelper}
                  />
              </Styled.ContainerWrapper>
            )}
          />
        </Form>
      )}
    </Formik>

  );
};
