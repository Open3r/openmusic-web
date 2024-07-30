import styled from "@emotion/styled";

export const Container = styled.div`
  width:100%;
  height:100%;
`

export const Avatar = styled.div<{ avatarUrl: string }>`
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  background: url(${(props) => props.avatarUrl}) center no-repeat;
  background-size: cover;
  &:hover :first-of-type {
    opacity: 0.4;
  }
  overflow:hidden;
  box-shadow:0.1rem 0.1rem 1rem 0.1rem #ccc;
`;
export const AvatarHover = styled.div`
  opacity:0;
  width:20rem;
  height:20rem;
  background-color:black;
  &:hover {
    opacity:0.4;
  }
  border-radius:50%;
  transition:all 0.5s;
  display:flex;
  justify-content:center;
  align-items:center;
  color:lightgray;
  font-size:2rem;
  cursor: pointer;
`
export const AvatarEditWrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1000000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
`;
export const AvatarEdit = styled.div`
  width: 50rem;
  height: 40rem;
  background-color: #f5f5f5;
`;
export const AvatarPreviewWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  padding: 0 4rem;
  box-sizing:border-box;
`;
export const AvatarPreview = styled.div<{ avatarUrl: string }>`
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  background: url(${(props) => props.avatarUrl}) center no-repeat #000;
  background-size: cover;
  box-shadow: 0.1rem 0.1rem 1rem 0.1rem #ccc;
  &:hover :first-of-type {
    opacity: 0.4;
  }
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0.1rem 0.1rem 1rem 0.1rem #ccc;
  & > input {
    display: none;
  }
`;
export const AvatarControllWrap = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const AvatarController = styled.button<{color: string;activeColor: string;}>`
  width: 10rem;
  font-size: 2rem;
  border: none;
  outline: none;
  padding: 1rem 0;
  background-color: ${(props) => props.color};
  &:active {
    background-color: ${(props) => props.activeColor};
  }
  color: white;
  border-radius: 1rem;
  margin: 0 1rem;
  cursor: pointer;
`;

export const Nickname = styled.p`
  width:70%;
  font-size:3rem;
  margin-top:2rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
`

export const EditWrap = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  overflow:hidden;
`;
export const EditInput = styled.input`
  width:90%;
  font-size:2rem;
  padding: 1rem;
  border:none;
  border-bottom:0.1rem solid black;
  outline:none;
  background-color:transparent;
`
export const ButtonWrap = styled.div`
  width:100%;
`
export const EditSubmit = styled.button`
  font-size: 1.7rem;
  padding: 0.2rem 1rem;
  background-color: #52a9f9;
  border:none;
  outline:none;
  min-width:20%;
  max-width:30%;
  cursor: pointer;
  color:white;
  margin-right:1rem;
`;


export const Addiction = styled.p`
  font-size:2rem;
  color:darkgray;
  margin-top:1rem;
`

