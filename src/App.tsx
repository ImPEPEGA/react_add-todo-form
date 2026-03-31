// import users from './api/users';
import './App.scss';

import { UserInfo } from './components/UserInfo/UserInfo';
import {TodoList} from './components/TodoList/TodoList';
// import { TodoInfo } from './components/TodoInfo/TodoInfo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo, User } from './types/types';
import { is } from 'cypress/types/bluebird';
// import { event } from 'cypress/types/jquery';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [users] = useState<User[]>(usersFromServer);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [errorStatusTitle, setErrorStatusTitle] = useState(false);
  const [errorStatusUserId, setErrorStatusUserId] = useState(false);

  const isTitleValid = title.trim() !== '';
  const isUserIdValid = userId !== 0;

  function isFormDataValid() {
    if (!isTitleValid && !isUserIdValid) {
      setErrorStatusTitle(true);
      setErrorStatusUserId(true);
      return true;
    }

    if (!isUserIdValid && isTitleValid) {
      setErrorStatusUserId(true);
      setErrorStatusTitle(false);
      return true;
    }

    if (isUserIdValid && !isTitleValid) {
      setErrorStatusUserId(false);
      setErrorStatusTitle(true);
      return true;
    }
  }

  const handleAddTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormDataValid()) {
      return;
    }

    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      title,
      completed: false,
      userId: userId,
    };

    handleAddTodo(newTodo);
    setErrorStatusUserId(false);
    setErrorStatusTitle(false);
    setTitle('');
    setUserId(0);
    console.log(todos);

  }

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
              onChange={event => setTitle(event.target.value)}
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
              onChange={(event) => setUserId(+(event.target.value))}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
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
        <TodoList users={users} todos={todos} />
      </section>
    </div>
  );
};
