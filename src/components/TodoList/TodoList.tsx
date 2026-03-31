import {TodoInfo} from "../TodoInfo/TodoInfo";
import { Todo } from "../../types/types";
import { User } from "../../types/types";

type Props = {
  users: User[];
  todos: Todo[];
}

export const TodoList = ({ users, todos }: Props) => {

  return (
    todos.map((todo) => (
      <TodoInfo key={todo.id} todo={todo} users={users} />
      // <article
      //   data-id={todo.id}
      //   className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      // >
      //   <h2 className="TodoInfo__title">
      //     {todo.title}
      //   </h2>

      //   <a className="UserInfo" href={`mailto:${todo.userId}`}>
      //     {users.find((user) => user.id === todo.userId)?.name}
      //   </a>
      // </article>
    ))
  );
};
