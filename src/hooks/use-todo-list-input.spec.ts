import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useTodoListInput } from './use-todo-list-input';

test('should use todo list input hook', () => {
  const push = jest.fn();
  const resetForm = jest.fn();

  const {
    result,
  } = renderHook(() => useTodoListInput(push, resetForm));
  
  expect(result.current.isDisabled).toBe(true);
  expect(result.current.value).toBe('');
  expect(typeof result.current.onAddToDoListInput).toBe('function');
  expect(typeof result.current.onResetToDoListInput).toBe('function');
  expect(typeof result.current.onChangeToDoListInput).toBe('function');
});

test('should trigger change todo list input function', () => {
  const push = jest.fn();
  const resetForm = jest.fn();

  const {
    result,
  } = renderHook(() => useTodoListInput(push, resetForm));

  expect(result.current.isDisabled).toBe(true);
  expect(result.current.value).toBe('');

  act(() => {
    result.current.onChangeToDoListInput('coucou');
  });

  expect(result.current.isDisabled).toBe(false);
  expect(result.current.value).toBe('coucou');

  act(() => {
    result.current.onChangeToDoListInput('');
  });

  expect(result.current.isDisabled).toBe(true);
  expect(result.current.value).toBe('');
});

test('should trigger add todo list input function', () => {
  const push = jest.fn();
  const resetForm = jest.fn();

  const {
    result,
  } = renderHook(() => useTodoListInput(push, resetForm));

  expect(push).toHaveBeenCalledTimes(0);

  act(() => {
    result.current.onAddToDoListInput();
  });

  expect(push).toHaveBeenCalledTimes(0);

  act(() => {
    result.current.onChangeToDoListInput('bidule');
  });
  act(() => {
    result.current.onAddToDoListInput();
  });

  expect(result.current.isDisabled).toBe(true);
  expect(result.current.value).toBe('');
  expect(push).toHaveBeenCalledTimes(1);

  act(() => {
    result.current.onChangeToDoListInput('');
  })
  act(() => {
    result.current.onAddToDoListInput();
  });

  expect(push).toHaveBeenCalledTimes(1);

  act(() => {
    result.current.onChangeToDoListInput('truc');
  })
  act(() => {
    result.current.onAddToDoListInput();
  })
  act(() => {
    result.current.onAddToDoListInput();
  });

  expect(result.current.isDisabled).toBe(true);
  expect(result.current.value).toBe('');
  expect(push).toHaveBeenCalledTimes(2);
});

test('should trigger reset form todo list function', () => {
  const push = jest.fn();
  const resetForm = jest.fn();

  const {
    result,
  } = renderHook(() => useTodoListInput(push, resetForm));

  expect(resetForm).toHaveBeenCalledTimes(0);

  act(() => {
    result.current.onResetToDoListInput();
  });

  expect(resetForm).toHaveBeenCalledTimes(1);

  act(() => {
    result.current.onChangeToDoListInput('coucou');
  });

  expect(result.current.isDisabled).toBe(false);
  expect(result.current.value).toBe('coucou');

  act(() => {
    result.current.onAddToDoListInput();
  });

  expect(result.current.isDisabled).toBe(true);
  expect(result.current.value).toBe('');
  expect(result.current.isClearDisabled).toBe(false);

  act(() => {
    result.current.onResetToDoListInput();
  });

  expect(resetForm).toHaveBeenCalledTimes(2);

  act(() => {
    result.current.onChangeToDoListInput('test changement texte 1');
  });
  act(() => {
    result.current.onChangeToDoListInput('test changement texte 2');
  });
  act(() => {
    result.current.onResetToDoListInput();
  });
  act(() => {
    result.current.onResetToDoListInput();
  });

  expect(result.current.isDisabled).toBe(true);
  expect(result.current.value).toBe('');
  expect(result.current.isClearDisabled).toBe(true);
  expect(resetForm).toHaveBeenCalledTimes(4);
});
