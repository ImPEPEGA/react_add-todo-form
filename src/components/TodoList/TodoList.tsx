import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/types';

type Props = {
  todos: Todo[];
};

// const user1 = {
//       id: 1,
//       name: 'Leanne Graham',
//       username: 'Bret',
//       email: 'Sincere@april.biz',
//     };

// const todo = {
//   userId: 1,
//   id: 1,
//   title: 'Learn HTML',
//   completed: true,
//   user: user1,
// };

// export interface Todo {
//   id: number;
//   title: string;
//   completed: boolean;
//   userId: number;
//   userData: User;
// }

export const TodoList: React.FC<Props> = ({ todos }) => {
  // return <TodoInfo todo={todo} />;
  return todos.map(todo => <TodoInfo key={todo.id} todo={todo} />);
};
