import React from 'react';
import ReactDOM from 'react-dom/client';
import { TodoList } from 'todo-list';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TodoList />
  </React.StrictMode>
);
