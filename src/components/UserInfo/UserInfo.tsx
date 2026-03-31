import { Todo, User } from "../../types/types";

type Props = {
  users: User[];
  todo: Todo;
}

export const UserInfo = ({ users, todo }: Props) => {
    return (
      <a className="UserInfo" href={`mailto:${users.find((user) => user.id === todo.userId)?.email}`}>
        {users.find((user) => user.id === todo.userId)?.name}
      </a>
    );
};
