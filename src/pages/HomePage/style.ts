import styled from "@emotion/styled";

const Conatainer = styled.div`
  margin-bottom: 10rem;
  margin-top: 12rem;
  width: 100%;
  height: calc(100vh - 22rem);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Canvas = styled.div`
  width: 140rem;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ChartSectionWrap = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
`

const Banner = styled.div`
  width: 84rem;
  height: 12rem;
  margin-top:3rem;
  border:0.1rem solid #f1f1f1;
  overflow:hidden;
`
const BannerImage = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
`;

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
  margin-bottom:1rem;
  cursor: pointer;
`
const RecentlyListenWrap = styled.div`
  width:60%;
  display:flex;
  flex-direction:column;
  margin: 5rem 0;
  border-right: 0.1rem solid #ccc;
  padding-right: 2rem;
`
const RecentlyListenBox = styled.div`
  width:100%;
  height:22rem;
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  overflow-y:hidden;
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
  height:35rem;
  border-radius:1rem;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  background-color:rgba(200,200,200,0.2);
`
const NoSongAlert = styled.h1`
  margin: 0 calc(50% - 11rem);
  align-self:center;
  color:#ccc;
`

export const Footer = styled.div`
  width:100%;
  height:25rem;
  background-color:#F1F1F1;
  border-top:0.1rem solid #E5E5E5;
  padding: 2rem;
  box-sizing:border-box;
  display:flex;
  justify-content:space-between;
  align-items:center;
  &>p{
    color:#ccc;
    margin-bottom:0.5rem;
    align-self:flex-end;
  }
  font-size:1.5rem;
`
export const Credit = styled.div`
  margin-right:5rem;
`
export const MemberList = styled.li`
  margin-bottom:0.5rem;
`
export const Member = styled.a`
  color: #a7a7a7;
  text-decoration: none;
  font-size: 1.6rem;
  &:hover {
    text-decoration: underline;
  }
`;
export const DotsWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    margin: 0 5px;
    button {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #ccc;
      border: none;
      cursor: pointer;
      padding: 0;
      &:before {
        display: none;
      }
    }
    &.slick-active button {
      background: #52a9f9;
    }
  }
`;

export {
  BoxWrap,
  Canvas,
  SectionWrap,
  SectionTitle,
  ChartSectionWrap,
  RecentlyListenBox,
  RecentlyListenWrap,
  RankWrap,
  RankBox,
  NoSongAlert,
  Banner,
  BannerImage,
  Conatainer
}