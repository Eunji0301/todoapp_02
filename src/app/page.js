'use client';
import * as React from 'react';
import { FaBars } from 'react-icons/fa';
import {
  AppBar,
  Toolbar,
  Button,
  Alert,
  Snackbar,
  Backdrop,
  CircularProgress,
  Drawer,
  List,
  ListItemButton,
  Link,
  Tabs,
  Tab,
  ListItem,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';

export default function App() {
  const [tabCurrentIndex, setTabCurrentIndex] = React.useState(0);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar className="">
            <div className="tw-flex-1 ">
              <FaBars onClick={() => setOpen(true)} className="tw-cursor-pointer" />
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
        <Tabs value={tabCurrentIndex} onChange={(_, newValue) => setTabCurrentIndex(newValue)}>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
        {tabCurrentIndex == 0 && <div>내용1</div>}
        {tabCurrentIndex == 1 && <div>내용2</div>}
        {tabCurrentIndex == 2 && <div>내용3</div>}
      </section>
      <section>
        {/* <Button onClick={() => setOpen(true)}>Show backdrop</Button> */}
        {/* <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={open}
          onClick={() => setOpen(false)}>
          <CircularProgress color="inherit" />
        </Backdrop> */}
        <div>
          <Button onClick={() => setOpen(true)}>Open drawer</Button>
          <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
            <List>
              <ListItemButton>
                <Link underline="none" href="write">
                  글쓰기
                </Link>
              </ListItemButton>
              <ListItemButton>토마토</ListItemButton>
              <ListItemButton>바나나</ListItemButton>
            </List>
          </Drawer>
        </div>
      </section>
    </>
  );
}
