import { Todo, User } from "../../types/types";
import { UserInfo } from "../UserInfo/UserInfo";


type Props = {
  todo: Todo;
  users: User[];
}

export const TodoInfo = ({ todo, users }: Props) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      <UserInfo users={users} todo={todo} />
      {/* <a className="UserInfo" href={`mailto:${users.find((user) => user.id === todo.userId)?.email}`}>
        {users.find((user) => user.id === todo.userId)?.name}
      </a> */}
    </article>
  );
};
