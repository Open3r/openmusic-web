import styled from "@emotion/styled";

const BoxWrap = styled.div`
  width:80rem;
  height:20rem;
  display:flex;
  align-items:center;
  overflow-x: scroll;
  box-sizing:border-box;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
   scrollbar-width: none; 
  &::-webkit-scrollbar {
    display: none; 
  }
`
export {
  BoxWrap
}