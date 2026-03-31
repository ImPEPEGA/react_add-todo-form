import { Todo } from '../../types/types';

type Props = {
  todo: Todo;
};

export const UserInfo = ({ todo }: Props) => {
  return (
    <a className="UserInfo" href={`mailto:${todo.userData.email}`}>
      {todo.userData.name}
    </a>
  );
};
