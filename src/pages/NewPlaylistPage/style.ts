import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 22rem);
  margin-top: 12rem;
  overflow-y: scroll;
`;
export const Main = styled.div`
  width: 70%;
  margin: 0 auto;
`;
export const Title = styled.h1`
  font-size: 3rem;
  display: flex;
  align-items: center;
  height: 6rem;
  margin-top: 3rem;
`;
export const PlaylistWrap = styled.div`
  border-top: 0.1rem #f1f1f1 solid;
  width: 100%;
  min-height: 10rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  padding: 1rem;
  padding-top: 2rem;
  grid-auto-rows: 22rem;
  box-sizing: border-box;
  grid-gap: 3rem;
  gap: 3rem;
  margin-bottom: 5rem;
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
