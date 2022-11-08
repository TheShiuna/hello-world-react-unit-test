import { FieldArrayRenderProps } from 'formik';
import React, { useCallback } from 'react';
import * as Styled from './todo-list-item.styles';

type IToDoListItemProps = {
  baseDataTestId: string;
  baseName: string;
  index: number;
  move: FieldArrayRenderProps['move'];
  remove: FieldArrayRenderProps['remove'];
  disabledMoveUp: boolean;
  disabledMoveDown: boolean;
}

enum Direction {
  UP = -1,
  DOWN = 1,
};

export const ToDoListItem = ({
  baseDataTestId,
  baseName,
  index,
  move,
  remove,
  disabledMoveUp,
  disabledMoveDown,
}: IToDoListItemProps) => {

  const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.currentTarget?.value?.length === 0) e.preventDefault();
  }, []);

  const onDelete = useCallback(() => {
    remove(index);
  }, [remove, index]);

  const onMove = useCallback((direction: Direction) => {
    const nextPosition = index + direction;
    move(index, nextPosition);
  }, [move, index])

  return (
    <Styled.ItemContainer
      data-testid={`${baseDataTestId}-container`}
    >
        <Styled.InputField
          data-testid={`${baseDataTestId}-input-text`}
          name={`${baseName}[${index}]`}
          type="text"
          onBlur={onBlur}
        />
        <Styled.Button
          data-testid={`${baseDataTestId}-button-move-up`}
          type="button"
          onClick={() => onMove(Direction.UP)}
          disabled={disabledMoveUp}
        >
          Up
        </Styled.Button>
        <Styled.Button
          data-testid={`${baseDataTestId}-button-move-down`}
          type="button"
          onClick={() => onMove(Direction.DOWN)}
          disabled={disabledMoveDown}
        >
          Dwn
        </Styled.Button>
        <Styled.Button
          data-testid={`${baseDataTestId}-button-delete`}
          type="button"
          onClick={() => onDelete()}
        >
          X
        </Styled.Button>
    </Styled.ItemContainer>
  );
}