import React from 'react'
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoList } from './todo-list';

test('should render <ToDoList /> and display ToDo title, ToDoInput container and ToDoListItems container', () => {
  const {
    getByTestId,
  } = render(<TodoList />);

  expect(getByTestId('todo-list-title')).toBeVisible();
  expect(getByTestId('todo-list-title')).toHaveTextContent(/To Do :/);
  expect(getByTestId('todo-list-input-container')).toBeVisible();
  expect(getByTestId('todo-list-items-container')).toBeVisible();
});

test('should cannot click on "+" or "Clr" when no input text or list items element', async () => {
  const {
    getByTestId,
  } = render(<TodoList />);
  const user = userEvent.setup();

  expect(getByTestId('todo-list-input-text')).toHaveTextContent('');
  expect(getByTestId('todo-list-input-add-button')).toBeDisabled();
  expect(getByTestId('todo-list-input-clear-button')).toBeDisabled();

  await user.type(getByTestId('todo-list-input-text'), '{arrowright}');
  
  expect(getByTestId('todo-list-input-text')).toHaveValue('');
  expect(getByTestId('todo-list-input-add-button')).toBeDisabled();
  expect(getByTestId('todo-list-input-clear-button')).toBeDisabled();
});

test('should check activation of "+" button when input text is not empty', async () => {
  const {
    getByTestId,
  } = render(<TodoList />);
  const user = userEvent.setup();

  expect(getByTestId('todo-list-input-text')).toHaveTextContent('');
  expect(getByTestId('todo-list-input-add-button')).toBeDisabled();
  expect(getByTestId('todo-list-input-clear-button')).toBeDisabled();

  await user.type(getByTestId('todo-list-input-text'), 'coucou');
  
  expect(getByTestId('todo-list-input-text')).toHaveValue('coucou');
  expect(getByTestId('todo-list-input-add-button')).toBeEnabled();
  expect(getByTestId('todo-list-input-clear-button')).toBeDisabled();

  await user.type(getByTestId('todo-list-input-text'), 'c');
  await user.type(getByTestId('todo-list-input-text'), 'dd');
  await user.type(getByTestId('todo-list-input-text'), 'zz');

  expect(getByTestId('todo-list-input-text')).toHaveValue('coucoucddzz');
  expect(getByTestId('todo-list-input-add-button')).toBeEnabled();
  expect(getByTestId('todo-list-input-clear-button')).toBeDisabled();

  await user.clear(getByTestId('todo-list-input-text'));

  expect(getByTestId('todo-list-input-text')).toHaveValue('');
  expect(getByTestId('todo-list-input-add-button')).toBeDisabled();
  expect(getByTestId('todo-list-input-clear-button')).toBeDisabled();

  await user.type(getByTestId('todo-list-input-text'), 'c');
  await user.type(getByTestId('todo-list-input-text'), 'c pas facile');
  await user.clear(getByTestId('todo-list-input-text'));
  await user.type(getByTestId('todo-list-input-text'), 'la vie');

  expect(getByTestId('todo-list-input-text')).toHaveValue('la vie');
  expect(getByTestId('todo-list-input-add-button')).toBeEnabled();
  expect(getByTestId('todo-list-input-clear-button')).toBeDisabled();
});

test('should at least add one element in list items', async () => {
  const {
    getByTestId,
  } = render(<TodoList />);
  const user = userEvent.setup();

  expect(getByTestId('todo-list-input-text')).toHaveTextContent('');
  expect(getByTestId('todo-list-input-add-button')).toBeDisabled();
  expect(getByTestId('todo-list-items-container').children).toHaveLength(0);

  await user.type(getByTestId('todo-list-input-text'), 'Premier élément');
  await user.click(screen.getByTestId('todo-list-input-add-button'));
  
  expect(getByTestId('todo-list-input-text')).toHaveTextContent('');
  expect(getByTestId('todo-list-items-container').children).toHaveLength(1);
  expect(getByTestId('todo-list-item-0-container')).toBeVisible();
  expect(getByTestId('todo-list-item-0-input-text')).toHaveValue('Premier élément');
  expect(getByTestId('todo-list-item-0-button-move-up')).toBeDisabled();
  expect(getByTestId('todo-list-item-0-button-move-down')).toBeDisabled();
  expect(getByTestId('todo-list-item-0-button-delete')).toBeEnabled();
});

test('should add multiple items and reorder them', async () => {
  const {
    getByTestId,
  } = render(<TodoList />);
  const user = userEvent.setup();

  await user.type(getByTestId('todo-list-input-text'), 'Premier élément');
  await user.click(screen.getByTestId('todo-list-input-add-button'));
  await user.type(getByTestId('todo-list-input-text'), 'Deuxième élément');
  await user.click(screen.getByTestId('todo-list-input-add-button'));
  await user.type(getByTestId('todo-list-input-text'), 'Troisième élément');
  await user.click(screen.getByTestId('todo-list-input-add-button'));

  expect(getByTestId('todo-list-items-container').children).toHaveLength(3);
  expect(getByTestId('todo-list-item-0-input-text')).toHaveValue('Premier élément');
  expect(getByTestId('todo-list-item-0-button-move-up')).toBeDisabled();
  expect(getByTestId('todo-list-item-0-button-move-down')).toBeEnabled();
  expect(getByTestId('todo-list-item-0-button-delete')).toBeEnabled();
  expect(getByTestId('todo-list-item-1-input-text')).toHaveValue('Deuxième élément');
  expect(getByTestId('todo-list-item-1-button-move-up')).toBeEnabled();
  expect(getByTestId('todo-list-item-1-button-move-down')).toBeEnabled();
  expect(getByTestId('todo-list-item-1-button-delete')).toBeEnabled();
  expect(getByTestId('todo-list-item-2-input-text')).toHaveValue('Troisième élément');
  expect(getByTestId('todo-list-item-2-button-move-up')).toBeEnabled();
  expect(getByTestId('todo-list-item-2-button-move-down')).toBeDisabled();
  expect(getByTestId('todo-list-item-2-button-delete')).toBeEnabled();

  await user.click(screen.getByTestId('todo-list-item-2-button-move-up'));
  await user.click(screen.getByTestId('todo-list-item-1-button-move-up'));
  await user.click(screen.getByTestId('todo-list-item-1-button-move-down'));

  expect(getByTestId('todo-list-item-0-input-text')).toHaveValue('Troisième élément');
  expect(getByTestId('todo-list-item-1-input-text')).toHaveValue('Deuxième élément');
  expect(getByTestId('todo-list-item-2-input-text')).toHaveValue('Premier élément');
});

test('should update value of an item list', async () => {
  const {
    getByTestId,
  } = render(<TodoList />);
  const user = userEvent.setup();

  await user.type(getByTestId('todo-list-input-text'), 'Premier élément');
  await user.click(screen.getByTestId('todo-list-input-add-button'));

  expect(getByTestId('todo-list-item-0-input-text')).toHaveValue('Premier élément');

  await user.type(getByTestId('todo-list-item-0-input-text'), ' (modifié)');

  expect(getByTestId('todo-list-item-0-input-text')).toHaveValue('Premier élément (modifié)');

  await user.type(getByTestId('todo-list-input-text'), 'Nouvel élément');
  await user.click(screen.getByTestId('todo-list-input-add-button'));
  await user.click(screen.getByTestId('todo-list-item-1-button-move-up'));
  await user.clear(getByTestId('todo-list-item-1-input-text'));
  await user.type(getByTestId('todo-list-item-1-input-text'), 'Premier élément ajouté');

  expect(getByTestId('todo-list-item-0-input-text')).toHaveValue('Nouvel élément');
  expect(getByTestId('todo-list-item-1-input-text')).toHaveValue('Premier élément ajouté');
});

test('should remove an element after added', async () => {
  const {
    getByTestId,
  } = render(<TodoList />);
  const user = userEvent.setup();

  await user.type(getByTestId('todo-list-input-text'), 'Premier élément');
  await user.click(screen.getByTestId('todo-list-input-add-button'));

  expect(getByTestId('todo-list-items-container').children).toHaveLength(1);
  expect(getByTestId('todo-list-item-0-input-text')).toHaveValue('Premier élément');

  await user.click(screen.getByTestId('todo-list-item-0-button-delete'));

  expect(getByTestId('todo-list-items-container').children).toHaveLength(0);

  await user.type(getByTestId('todo-list-input-text'), 'Premier élément');
  await user.click(screen.getByTestId('todo-list-input-add-button'));
  await user.type(getByTestId('todo-list-input-text'), 'Deuxième élément');
  await user.click(screen.getByTestId('todo-list-input-add-button'));
  await user.type(getByTestId('todo-list-input-text'), 'Troisième élément');
  await user.click(screen.getByTestId('todo-list-input-add-button'));

  expect(getByTestId('todo-list-items-container').children).toHaveLength(3);

  await user.click(screen.getByTestId('todo-list-item-1-button-delete'));

  expect(getByTestId('todo-list-item-0-input-text')).toHaveValue('Premier élément');
  expect(getByTestId('todo-list-item-1-input-text')).toHaveValue('Troisième élément');

  await user.click(screen.getByTestId('todo-list-item-0-button-delete'));
  await user.click(screen.getByTestId('todo-list-item-0-button-delete'));

  expect(getByTestId('todo-list-items-container').children).toHaveLength(0);
});

test('should reset list items', async () => {
  const {
    getByTestId,
  } = render(<TodoList />);
  const user = userEvent.setup();

  expect(getByTestId('todo-list-input-clear-button')).toBeDisabled();

  await user.type(getByTestId('todo-list-input-text'), 'Premier élément');
  await user.click(screen.getByTestId('todo-list-input-add-button'));

  expect(getByTestId('todo-list-items-container').children).toHaveLength(1);
  expect(getByTestId('todo-list-item-0-input-text')).toHaveValue('Premier élément');
  expect(getByTestId('todo-list-input-clear-button')).toBeEnabled();
  expect(getByTestId('todo-list-input-add-button')).toBeDisabled();

  await user.click(screen.getByTestId('todo-list-input-clear-button'));

  expect(getByTestId('todo-list-items-container').children).toHaveLength(0);
  expect(getByTestId('todo-list-input-clear-button')).toBeDisabled();
  expect(getByTestId('todo-list-input-add-button')).toBeDisabled();

  await user.type(getByTestId('todo-list-input-text'), 'Premier élément');
  await user.click(screen.getByTestId('todo-list-input-add-button'));
  await user.type(getByTestId('todo-list-input-text'), 'Deuxième élément');
  await user.click(screen.getByTestId('todo-list-input-add-button'));
  await user.type(getByTestId('todo-list-input-text'), 'Troisième élément');

  expect(getByTestId('todo-list-items-container').children).toHaveLength(2);
  expect(getByTestId('todo-list-item-0-input-text')).toHaveValue('Premier élément');
  expect(getByTestId('todo-list-item-1-input-text')).toHaveValue('Deuxième élément');
  expect(getByTestId('todo-list-input-text')).toHaveValue('Troisième élément');

  await user.click(screen.getByTestId('todo-list-input-clear-button'));

  expect(getByTestId('todo-list-items-container').children).toHaveLength(0);
  expect(getByTestId('todo-list-input-clear-button')).toBeDisabled();
  expect(getByTestId('todo-list-input-add-button')).toBeDisabled();
  expect(getByTestId('todo-list-input-text')).toHaveTextContent('');
});
