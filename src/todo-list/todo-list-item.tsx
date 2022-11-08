import { Field, FieldArrayRenderProps } from 'formik';
import React, { useCallback } from 'react';
import * as Styled from './todo-list-item.styles';

type IToDoListItemProps = {
  baseName: string;
  index: number;
  value: string;
  arrayHelper: FieldArrayRenderProps;
  disabledMoveUp: boolean;
  disabledMoveDown: boolean;
}

enum Direction {
  UP = -1,
  DOWN = 1,
};

export const ToDoListItem = ({
  baseName,
  index,
  value,
  arrayHelper,
  disabledMoveUp,
  disabledMoveDown,
}: IToDoListItemProps) => {

  const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.currentTarget?.value?.length === 0) e.preventDefault();
  }, [arrayHelper, index]);

  const onDelete = useCallback(() => {
    arrayHelper.remove(index);
  }, [arrayHelper, index]);

  const onMove = useCallback((direction: Direction) => {
    const nextPosition = index + direction;
    arrayHelper.move(index, nextPosition);
  }, [arrayHelper, index])

  return (
    <Styled.ItemContainer key={`${baseName}-${index}`}>
        <Styled.InputField
          name={`${baseName}[${index}]`}
          type="text"
          onBlur={onBlur}
        />
        <Styled.Button
          type="button"
          onClick={() => onMove(Direction.UP)}
          disabled={disabledMoveUp}
        >
          Up
        </Styled.Button>
        <Styled.Button
          type="button"
          onClick={() => onMove(Direction.DOWN)}
          disabled={disabledMoveDown}
        >
          Dwn
        </Styled.Button>
        <Styled.Button
          type="button"
          onClick={() => onDelete()}
        >
          X
        </Styled.Button>
    </Styled.ItemContainer>
  );
}