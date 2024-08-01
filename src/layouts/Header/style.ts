import styled from "@emotion/styled";

export const Canvas = styled.div`
  width:100%;
  height:12rem;
  background:white;
  border-bottom:0.1rem solid #ccc;
  box-sizing:border-box;
  display:flex;
  flex-direction:column;
  position:fixed;
  top:0;
  background-color:white;
  z-index:9;
`
export const SearchArea = styled.div`
  width:100%;
  height:8rem;
  display:flex;
  justify-content:center;
  align-items:center;
`
export const MenuArea = styled.div`
  width:100%;
  height:4rem;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 2rem;
  box-sizing:border-box;
`
export const MenuWrap = styled.div`
  width: 60rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const SearchWrap = styled.div`
  width:60rem;
  height:4rem;
  box-sizing:border-box;
  border:#52A9F9 0.2rem solid;
  overflow:hidden;
  border-radius:1rem;
  padding: 0 0.2rem;
  display:flex;
  align-items:center;
`
export const Search = styled.input`
  width:calc(100% - 4rem);
  height:100%;
  font-size:1.7rem;
  outline:none;
  border:none;
`
export const SearchBtn = styled.img`
  width:3rem;
  height:3rem;
  cursor: pointer;
`
export const Logo = styled.img`
  width:5rem;
  height:5rem;
  cursor: pointer;
  margin:0 1rem;
`
export const Menu = styled.p`
  margin: 0 3rem;
  font-size:2rem;
  color:black;
  cursor: pointer;
  font-weight:bold;
  transition:all 0.3s;
  &:hover{
    color:#52A9F9;
  }
`