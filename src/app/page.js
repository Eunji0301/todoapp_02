'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { RiDeleteBin5Line } from 'react-icons/ri';

export default function Home() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="tw-flex tw-items-center tw-gap-x-3">
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button
            variant="outlined"
            onClick={() => {
              confirm('삭제함?');
            }}>
            삭제
            <RiDeleteBin5Line />
          </Button>
        </div>
      </ThemeProvider>
      <div className="tw-flex tw-items-center tw-gap-x-3 tw-mt-3">
        <Button
          variant="text"
          onClick={() => {
            alert('버튼 클릭 됨');
          }}>
          Text
        </Button>
        <Button variant="contained" disabled>
          Contained
        </Button>
        <Button variant="outlined" href="sub/">
          sub로 이동
        </Button>
      </div>
    </>
  );
}
