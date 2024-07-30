import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 22rem);
  margin-top: 12rem;
  box-sizing: border-box;
  padding: 2rem;
`;

export const PageTitle = styled.h1`
  font-size: 3rem;
  height: 5rem;
  width: 150rem;
  margin: 0 auto;
`;
export const Main = styled.div`
  width: 100%;
  height: calc(100% - 5rem);
  display: flex;
  justify-content: center;
`;
export const ProfileWrap = styled.div`
  width: 30rem;
  height: 100%;
  border-right: 0.1rem solid #f1f1f1;
`;
export const PlayListWrap = styled.div`
  width: 80rem;
  height: 100%;
  border-right: 0.1rem solid #f1f1f1;
`;

export const MyAlbumArea = styled.div`
  width: 40rem;
  height: 100%;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingShadow = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000001;
`;

export const Spinner = styled.div`
  display: inline-block;
  width: 4rem;
  height: 4rem;
  border: 0.3rem solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: ${rotate} 1s infinite linear;
`;
