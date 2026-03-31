import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/types';

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => {
  return todos.map(todo => <TodoInfo key={todo.id} todo={todo} />);
};
