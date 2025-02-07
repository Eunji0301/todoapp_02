'use client';

import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Alert as MuiAlert,
  Snackbar,
  Backdrop,
  CircularProgress,
  Drawer,
  List,
  ListItemButton,
  Link,
  ListItem,
  Tabs,
  Tab,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { FaBars } from 'react-icons/fa';
import theme from './theme';

const useTodoStatus = () => {
  const [todos, setTodos] = React.useState([]);
  const lastTodoIdRef = React.useRef(0);

  const addTodo = (newTitle) => {
    const id = ++lastTodoIdRef.current;
    const newTodo = {
      id,
      title: newTitle,
      regDate: dateToStr(new Date()),
    };
    setTodos([...todos, newTodo]);
  };
  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id != id);
    setTodos(newTodos);
  };
  const modifyTodo = (id, title) => {
    const newTodos = todos.map((todo) => (todo.id != id ? todo : { ...todo, title }));
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
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const addTodo = () => {
    if (newTodoTitle.trim().length == 0) return;
    const title = newTodoTitle.trim();
    todoStatusaddTodo(title);
    setNewTodoTitle('');
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

export default function App() {
  const todoState = useTodoStatus(); // 커스텀 훅

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    form.title.value = form.title.value.trim();
    if (form.title.value.length == 0) {
      alert('할 일 써');
      form.title.focus();
      return;
    }
    todoState.addTodo(form.title.value);
    form.title.value = '';
    form.title.focus();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
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
        <form onSubmit={onSubmit}>
          <input type="text" name="title" autoComplete="off" placeholder="할 일 입력" />
          <button type="submit">추가</button>
          <button type="reset">취소</button>
        </form>
        {todoState.todos.length}
        {/* {todoState.todos} */}
      </ThemeProvider>
    </>
  );
}

// Util
// 날짜 객체를 인자로 받아서 문장으로 반환해주는 함수 (yyyy-MM-dd hh:mm:ss)
function dateToStr(d) {
  const pad = (n) => {
    return n < 10 ? '0' + n : n;
  };
  return (
    d.getFullYear() +
    '-' +
    pad(d.getMonth() + 1) +
    '-' +
    pad(d.getDate()) +
    ' ' +
    pad(d.getHours()) +
    ':' +
    pad(d.getMinutes()) +
    ':' +
    pad(d.getSeconds())
  );
}
