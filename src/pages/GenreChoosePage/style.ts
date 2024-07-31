import styled from "@emotion/styled";

export const Container = styled.div`
  width:100vw;
  height:100vh;
  overflow:hidden;
  display:flex;
  align-items:center;
  justify-content:center;
`
export const Title = styled.div`
  font-size:3rem;
  width:100%;
  height:12rem;
  box-sizing:border-box;
  border-bottom: 0.1rem solid #ccc;
  margin-bottom:1rem;
`
export const Main = styled.div`
  padding: 2rem;
  box-sizing:border-box;
  width:50rem;
  height:90%;
  box-shadow:0.1rem 0.1rem 1rem 0.1rem #ccc;
`
export const GenreBoxWrap = styled.div`
  width: 100%;
  height: calc(100% - 19rem);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  overflow-x: hidden;
`;

export const GenreBox = styled.div`
  background-color:#F1F1F1;
  width:22rem;
  height:10rem;
  border-radius:2rem;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-bottom:2rem;
  font-size:2rem;
  cursor: pointer;
`

export const Button = styled.button`
  font-size: 1.7rem;
  color: white;
  background-color: #52a9f9;
  border-radius: 1rem;
  width: 100%;
  margin-top:1rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;
  &:active {
    background-color: #558bbd;
  }
  &:disabled {
    background-color: #558bbd;
    color: #ccc;
  }
`;