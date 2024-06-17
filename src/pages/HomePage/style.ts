import styled from "@emotion/styled";

const Canvas = styled.div`
  width:140rem;
  margin:0 auto;
  height:calc(100% - 22rem);
  margin-bottom:10rem;
  margin-top:12rem;
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
`

const ChartSectionWrap = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
`

const SectionWrap = styled.div`
  width:64rem;
  display:flex;
  flex-direction:column;
  margin:2rem 0;
`
const SectionTitle = styled.h1`
  font-size:2rem;
  word-spacing:0.2rem;
  margin:0;
  cursor: pointer;
`
const RecentlyListenWrap = styled.div`
  width:60%;
  display:flex;
  flex-direction:column;
  margin: 5rem 0;
`
const RecentlyListenBox = styled.div`
  width:100%;
  height:22rem;
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
`

const BoxWrap = styled.div`
  width:64rem;
  height:17rem;
  display:flex;
  overflow-x: scroll;
  box-sizing:border-box;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
   scrollbar-width: none; 
  &::-webkit-scrollbar {
    display: none; 
  }
`
const RankWrap = styled.div`
  width:35%;
  display:flex;
  margin: 5rem 0;
  flex-direction:column;
`
const RankBox = styled.div`
  width: 100%;
  height:21rem;
  border-radius:1rem;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  background-color:rgba(200,200,200,0.2);
`

export {
  BoxWrap,
  Canvas,
  SectionWrap,
  SectionTitle,
  ChartSectionWrap,
  RecentlyListenBox,
  RecentlyListenWrap,
  RankWrap,
  RankBox
}