import './App.scss';

import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo, User } from './types/types';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [users] = useState<User[]>(usersFromServer);
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      userData: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );
  const [errorStatusTitle, setErrorStatusTitle] = useState(false);
  const [errorStatusUserId, setErrorStatusUserId] = useState(false);

  const isTitleValid = title.trim() !== '';
  const isUserIdValid = userId !== 0;

  function isFormInvalid() {
    const isTitleInvalid = !isTitleValid;
    const isUserIdInvalid = !isUserIdValid;

    setErrorStatusTitle(isTitleInvalid);
    setErrorStatusUserId(isUserIdInvalid);

    return isTitleInvalid || isUserIdInvalid;
  }

  const handleAddTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormInvalid()) {
      return;
    }

    const newTodo: Todo = {
      id:
        todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title,
      completed: false,
      userId,
      userData: users.find(user => user.id === userId)!,
    };

    handleAddTodo(newTodo);
    setErrorStatusUserId(false);
    setErrorStatusTitle(false);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={event => {
                setTitle(event.target.value);
                setErrorStatusTitle(false);
              }}
            />
            <span className="error" hidden={!errorStatusTitle}>
              Please enter a title
            </span>
          </label>
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={event => {
                setUserId(+event.target.value);
                setErrorStatusUserId(false);
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          <span className="error" hidden={!errorStatusUserId}>
            Please choose a user
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
