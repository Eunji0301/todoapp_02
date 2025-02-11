'use client';

import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Alert as MuiAlert,
  TextField,
  CssBaseline,
  Chip,
  Drawer,
  Box,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import classNames from 'classnames';
import { FaBars, FaCheck, FaEllipsisV } from 'react-icons/fa';
import dateToStr from './dateUtil';
import RootTheme from './theme';

function useTodoStatus() {
  const [todos, setTodos] = React.useState([]);
  const lastTodoIdRef = React.useRef(0);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;
    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date()),
    };
    setTodos((todos) => [newTodo, ...todos]);
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
}

const NewTodoForm = ({ todosState }) => {
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
      <form className="tw-flex tw-flex-col tw-p-4 tw-gap-2" onSubmit={(e) => onSubmit(e)}>
        <TextField
          multiline
          maxRows={4}
          name="content"
          id="outlined-basic"
          label="할 일 입력"
          variant="outlined"
          autoComplete="off"
        />
        <Button className="tw-text-bold" variant="contained" type="submit">
          추가
        </Button>
      </form>
    </>
  );
};
const TodoListItem = ({ todo, index, openDrawer }) => {
  return (
    <>
      <li className="tw-mb-3" key={todo.id}>
        <div className="tw-flex tw-flex-col tw-gap-2 tw-mt-3">
          <div className="tw-flex tw-gap-x-2 tw-font-bold">
            <Chip className="tw-pt-[3px]" label={`번호 : ${todo.id}`} variant="outlined" />
            <Chip
              className="tw-pt-[3px]"
              label={`날짜 : ${todo.regDate}`}
              variant="outlined"
              color="primary"
            />
          </div>
          <div className="tw-rounded-[10px] tw-shadow tw-flex tw-text-[14px] tw-min-h-[80px]">
            <Button className="tw-flex-shrink-0 tw-rounded-[10px_0_0_10px]" color="inherit">
              <FaCheck
                className={classNames(
                  'tw-text-3xl',
                  {
                    'tw-text-[--mui-color-primary-main]': index % 2 == 0,
                  },
                  { 'tw-text-[#dcdcdc]': index % 2 != 0 },
                )}
              />
            </Button>
            <div className="tw-bg-[#dcdcdc] tw-w-[2px] tw-h-[60px] tw-self-center"></div>
            <div className="tw-bg-blue-300 tw-flex tw-items-center tw-p-3 tw-flex-grow hover:tw-text-[--mui-color-primary-main] tw-whitespace-pre-wrap tw-leading-relaxed tw-break-words">
              할 일 : {todo.content}
            </div>
            <Button
              onClick={() => {
                openDrawer(todo.id);
              }}
              className="tw-flex-shrink-0 tw-rounded-[0_10px_10px_0]"
              color="inherit">
              <FaEllipsisV className="tw-text-[#dcdcdc] tw-text-2xl" />
            </Button>
          </div>
        </div>
      </li>
    </>
  );
};
const TodoList = ({ todosState }) => {
  const [optionDrawerTodoId, setOptionDrawerTodoId] = React.useState(null);

  const drawerOpened = React.useMemo(() => optionDrawerTodoId !== null, [optionDrawerTodoId]);
  const openDrawer = (id) => setOptionDrawerTodoId(id);
  const closeDrawer = () => setOptionDrawerTodoId(null);

  return (
    <>
      <Drawer anchor="bottom" open={drawerOpened} onClose={closeDrawer}>
        <div className="tw-p-[30px] tw-flex tw-gap-x-[5px]">
          {optionDrawerTodoId}번 todo에 대한 옵션 Drawer
          <div>수정</div>
          <div>삭제</div>
        </div>
      </Drawer>
      <div className="tw-mb-2">할 일 갯수 : {todosState.todos.length}</div>
      <nav>
        <ul>
          {todosState.todos.map((todo, index) => (
            <TodoListItem key={todo.id} todo={todo} index={index} openDrawer={openDrawer} />
          ))}
        </ul>
      </nav>
    </>
  );
};

function App() {
  const todosState = useTodoStatus(); // 커스텀 훅

  React.useEffect(() => {
    todosState.addTodo('스쿼트');
    todosState.addTodo('벤치프레스');
    todosState.addTodo('데드리프트\n런지');
  }, []);

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
      <NewTodoForm todosState={todosState} />
      <TodoList todosState={todosState} />
    </>
  );
}

export default function themeApp() {
  const theme = RootTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
