'use client';

import * as React from 'react';
import { AppBar, Toolbar, Button, Alert as MuiAlert, TextField, Chip } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { FaBars } from 'react-icons/fa';
import theme from './theme';
import dateToStr from './dateUtil';

const useTodoStatus = () => {
  console.log('실행 1');
  const [todos, setTodos] = React.useState([]);
  const lastTodoIdRef = React.useRef(0);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;
    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date()),
    };
    setTodos((todos) => [...todos, newTodo]);
  };
  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id != id);
    setTodos(newTodos);
  };
  const modifyTodo = (id, content) => {
    const newTodos = todos.map((todo) => (todo.id != id ? todo : { ...todo, content }));
    setTodos(newTodos);
  };
  return {
    todos,
    addTodo,
    removeTodo,
    modifyTodo,
  };
};

const NewTodoForm = ({ todoStatus }) => {
  const [newTodoContent, setNewTodoContent] = useState('');
  const addTodo = () => {
    if (newTodoContent.trim().length == 0) return;
    const content = newTodoContent.trim();
    todoStatusaddTodo(content);
    setNewTodoContent('');
  };
  return (
    <>
      <div className="flex items-center gap-x-3">
        <input
          className="input input-bordered"
          type="text"
          placeholder="새 할일 입력해"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          할 일 추가
        </button>
      </div>
    </>
  );
};
const TodoListItem = ({ todo, todoStatus }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);
  const readMode = !editMode;
  const enableEditMode = () => {
    setEditMode(true);
  };
  const removeTodo = () => {
    todoStatus.removeTodo(todo.id);
  };
  const cancleEdit = () => {
    setEditMode(false);
    setNewTodoTitle(todo.title);
  };
  const commitEdit = () => {
    if (newTodoTitle.trim().length == 0) return;
    todoStatus.modifyTodo(todo.id, newTodoTitle.trim());
    setEditMode(false);
  };
  return (
    <li className="flex items-center gap-x-3 mb-3">
      <span className="badge badge-accent badge-outline">{todo.id}</span>
      {readMode ? (
        <>
          <span>{todo.title}</span>
          <button className="btn btn-outline btn-accent" onClick={enableEditMode}>
            수정
          </button>
          <button className="btn btn-accent" onClick={removeTodo}>
            삭제
          </button>
        </>
      ) : (
        <>
          <input
            className="input input-bordered"
            type="text"
            placeholder="할 일 써"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <button className="btn btn-accent" onClick={commitEdit}>
            수정완료
          </button>
          <button className="btn btn-accent" onClick={cancleEdit}>
            수정취소
          </button>
        </>
      )}
    </li>
  );
};
const TodoList = ({ todoStatus }) => {
  return (
    <>
      {todoStatus.todos.length == 0 ? (
        <h4>할 일 없음</h4>
      ) : (
        <>
          <h4>할 일 목록</h4>
          <ul>
            {todoStatus.todos.map((todo) => (
              <TodoListItem key={todo.id} todo={todo} todoStatus={todoStatus} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

let AppCallCount = 0;

const App = () => {
  AppCallCount++;
  console.log(`AppCallCount : ${AppCallCount}`);

  const todosState = useTodoStatus(); // 커스텀 훅

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    form.content.value = form.content.value.trim();
    if (form.content.value.length == 0) {
      alert('할 일 써');
      form.content.focus();
      return;
    }
    todosState.addTodo(form.content.value);
    form.content.value = '';
    form.content.focus();
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <div className="tw-flex-1">
            <FaBars onClick={() => setOpen(true)} className="tw-cursor-pointer" />
          </div>
          <div className="logo-box">
            <a href="/" className="tw-font-bold">
              로고
            </a>
          </div>
          <div className="tw-flex-1 tw-flex tw-justify-end">글쓰기</div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <form className="tw-flex tw-flex-col tw-p-4 tw-gap-3" onSubmit={onSubmit}>
        <TextField
          name="content"
          id="outlined-basic"
          label="할 일 뭐임?"
          variant="outlined"
          autoComplete="off"
        />
        <Button variant="contained" type="submit">
          추가
        </Button>
      </form>
      <div className="tw-mb-2">할 일 갯수 : {todosState.todos.length}</div>
      <nav>
        <ul>
          {todosState.todos.map((todo) => (
            <li className="tw-mb-3" key={todo.id}>
              <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-[30px]">
                <Chip label={`번호 : ${todo.id}`} variant="outlined"></Chip>
                <Chip label={`날짜 : ${todo.regDate}`} variant="outlined"></Chip>
                <Chip label={`할 일 : ${todo.content}`} variant="outlined"></Chip>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default function themeApp() {
  console.log('실행 2');
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}
