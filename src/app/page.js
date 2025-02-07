'use client';
import * as React from 'react';
import { FaBars } from 'react-icons/fa';
import { AppBar, Toolbar, Button, Alert, Snackbar } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';

export default function App() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar className="">
            <div className="tw-flex-1 ">
              <FaBars />
            </div>
            <div>
              <a href="/" className="tw-font-bold">
                로고
              </a>
            </div>
            <div className="tw-flex-1 tw-flex tw-justify-end">글쓰기</div>
          </Toolbar>
        </AppBar>
        <section className="tw-h-96 tw-flex tw-justify-center tw-items-center">section </section>
      </ThemeProvider>
      <section>
        <Button onClick={() => setOpen(true)}>open snackbar</Button>
        <Alert>게시글이 등록됨</Alert>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Note archived">
          <Alert severity="error">게시물 삭제</Alert>
        </Snackbar>
      </section>
    </>
  );
}
