import SongBox from "../../components/SongBox";
import * as HS from "./style";
import useGetMusic from "../../hooks/useGetMusic";
import { useEffect, useState } from "react";
import { Song } from "../../interfaces/Song";
import useGetRank from "../../hooks/useGetRank";
import NotificationService from "../../libs/notification/NotificationService";
import instance from "../../libs/axios/customAxios";
import { PlaylistType } from "../../interfaces/playlist";
import PlaylistBox from "../../components/PlaylistBox";
import { paging } from "../../libs/axios/paging";
import { likeUpdateStore } from "../../stores/likeUpdateStore";
import { useNavigate } from "react-router-dom";
import { recentUpdateStore } from "../../stores/recentStore";
import { Banner } from "../../interfaces/banner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HomePage = () => {
  const [songList, setSongList] = useState<Song[]>();
  const [songRank, setSongRank] = useState<Song[]>();
  const [myPlaylists, setMyPlaylists] = useState<PlaylistType[]>();
  const [playlists, setPlaylists] = useState<PlaylistType[]>();
  const [recommendation, setRecommendation] = useState<Song[]>();
  const [banners, setBanners] = useState<Banner[]>();

  const likeUpdate = likeUpdateStore((state) => state.likeUpdate);
  const setLikeUpdate = likeUpdateStore((state) => state.setLikeUpdate);
  const recentUpdate = recentUpdateStore((state) => state.recentUpdate);
  const setRecentUpdate = recentUpdateStore((state) => state.setRecentUpdate);

  const navigate = useNavigate();

  const getLastPlayed = () => {
    instance.get("/users/me/recents").then((res) => {
      setRecentUpdate(res.data.data);
    });
  };

  const getBanners = async () => {
    const res = await instance.get("/banners");
    setBanners(res.data.data);
  };

  useEffect(() => {
    getLastPlayed();
    getBanners();
  }, []);

  

  const { getMusic } = useGetMusic();
  const { getRank } = useGetRank();

  const musicReq = async () => {
    try {
      const res = await getMusic(10);
      setSongList(res);
      const rank = await getRank(5);
      setSongRank(rank);
    } catch (err) {
      NotificationService.error("네트워크 에러");
    }
  };

  const myPlaylistReq = async () => {
    await instance.get("/users/me/playlists").then((res) => {
      setMyPlaylists(res.data.data.content);
    });
  };

  const playlistReq = async () => {
    await instance.get("/playlists", { params: paging }).then((res) => {
      setPlaylists(res.data.data.content);
    });
  };

  const rankReload = async () => {
    const res = await getRank(5);
    setSongRank(res);
  };

  const recommendationReq = async () => {
    const res = await instance.get("/users/me/recommendations", {
      params: { ...paging, size: 20 },
    });
    setRecommendation(res.data.data.content);
  };

  useEffect(() => {
    myPlaylistReq();
    playlistReq();
    musicReq();
    getLastPlayed();
    recommendationReq();
  }, []);

  useEffect(() => {
    if (likeUpdate) {
      rankReload();
      setLikeUpdate(false);
    }
  }, [likeUpdate]);

  const moveTo = (target: string) => {
    navigate(`/${target}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    appendDots: (dots:React.ReactNode) => (
      <HS.DotsWrapper>
        <ul> {dots} </ul>
      </HS.DotsWrapper>
    ),
  };

  return (
    <HS.Conatainer>
      <HS.Canvas>
        <HS.ChartSectionWrap>
          <HS.RecentlyListenWrap>
            <HS.SectionTitle
              onClick={() => {
                moveTo("recent");
              }}
            >
              최근 들은 곡 {">"}
            </HS.SectionTitle>
            <HS.RecentlyListenBox>
              {recentUpdate && recentUpdate.length > 0 ? (
                recentUpdate
                  .slice(0, 4)
                  .map((content, idx) => (
                    <SongBox
                      title={content.title}
                      artist={content.artist}
                      id={content.id}
                      key={idx}
                      url={content.url}
                      thumbnailUrl={content.thumbnailUrl}
                      type={"history"}
                      genre={content.genre}
                      scope={content.scope}
                      liked={content.liked}
                      likeCount={content.likeCount}
                      album={content.album}
                    />
                  ))
              ) : (
                <HS.NoSongAlert>최근들은 곡이 없습니다.</HS.NoSongAlert>
              )}
            </HS.RecentlyListenBox>
            <HS.Banner>
              <Slider {...settings}>
                {banners &&
                  banners.map((banner) => (
                    <div key={banner.id}>
                      <a
                        href={banner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <HS.BannerImage
                          src={banner.imageUrl}
                          alt={`Banner ${banner.id}`}
                        />
                      </a>
                    </div>
                  ))}
              </Slider>
            </HS.Banner>
          </HS.RecentlyListenWrap>
          <HS.RankWrap>
            <HS.SectionTitle
              onClick={() => {
                moveTo("rank");
              }}
            >
              오픈차트 {">"}
            </HS.SectionTitle>
            {songRank && songRank.length > 0 ? (
              <HS.RankBox>
                {songRank?.map((content, idx) => (
                  <SongBox
                    title={content.title}
                    artist={content.artist}
                    id={content.id}
                    key={idx}
                    rank={idx}
                    url={content.url}
                    thumbnailUrl={content.thumbnailUrl}
                    type={"rank"}
                    genre={content.genre}
                    scope={content.scope}
                    liked={content.liked}
                    likeCount={content.likeCount}
                    album={content.album}
                  />
                ))}
              </HS.RankBox>
            ) : (
              <HS.RankBox
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h1 style={{ color: "gray" }}>곡이 없습니다.</h1>
              </HS.RankBox>
            )}
          </HS.RankWrap>
        </HS.ChartSectionWrap>
        <HS.SectionWrap>
          <HS.SectionTitle style={{ cursor: "default" }}>
            당신을 위한 추천
          </HS.SectionTitle>
          {recommendation && recommendation.length > 0 ? (
            <HS.BoxWrap>
              {recommendation?.map((content, idx) => (
                <SongBox
                  title={content.title}
                  artist={content.artist}
                  id={content.id}
                  key={idx}
                  url={content.url}
                  thumbnailUrl={content.thumbnailUrl}
                  type={"square"}
                  genre={content.genre}
                  scope={content.scope}
                  liked={content.liked}
                  likeCount={content.likeCount}
                  album={content.album}
                />
              ))}
            </HS.BoxWrap>
          ) : (
            <HS.BoxWrap
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 style={{ color: "#ccc" }}>곡이 없습니다.</h1>
            </HS.BoxWrap>
          )}
        </HS.SectionWrap>
        <HS.SectionWrap>
          <HS.SectionTitle
            onClick={() => {
              moveTo("playlist");
            }}
          >
            플레이리스트 {">"}
          </HS.SectionTitle>
          {playlists && playlists.length > 0 ? (
            <HS.BoxWrap>
              {playlists?.map((content) => (
                <PlaylistBox item={content} key={content.id} type="box" />
              ))}
            </HS.BoxWrap>
          ) : (
            <HS.BoxWrap
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 style={{ color: "#ccc" }}>플레이리스트가 없습니다.</h1>
            </HS.BoxWrap>
          )}
        </HS.SectionWrap>
        <HS.SectionWrap style={{ marginBottom: "10rem" }}>
          <HS.SectionTitle
            onClick={() => {
              moveTo("song");
            }}
          >
            최신곡 {">"}
          </HS.SectionTitle>
          {songList && songList.length > 0 ? (
            <HS.BoxWrap>
              {songList?.map((content, idx) => (
                <SongBox
                  title={content.title}
                  artist={content.artist}
                  id={content.id}
                  key={idx}
                  url={content.url}
                  thumbnailUrl={content.thumbnailUrl}
                  type={"square"}
                  genre={content.genre}
                  scope={content.scope}
                  liked={content.liked}
                  likeCount={content.likeCount}
                  album={content.album}
                />
              ))}
            </HS.BoxWrap>
          ) : (
            <HS.BoxWrap
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 style={{ color: "#ccc" }}>곡이 없습니다.</h1>
            </HS.BoxWrap>
          )}
        </HS.SectionWrap>
        <HS.SectionWrap style={{ marginBottom: "10rem" }}>
          <HS.SectionTitle
            onClick={() => {
              moveTo("my-page");
            }}
          >
            나의 플레이리스트 {">"}
          </HS.SectionTitle>
          {playlists && playlists.length > 0 ? (
            <HS.BoxWrap>
              {myPlaylists?.map((content) => (
                <PlaylistBox item={content} key={content.id} type="box" />
              ))}
            </HS.BoxWrap>
          ) : (
            <HS.BoxWrap
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 style={{ color: "#ccc" }}>플레이리스트가 없습니다.</h1>
            </HS.BoxWrap>
          )}
        </HS.SectionWrap>
      </HS.Canvas>
      <HS.Footer>
        <div style={{ display: "flex" }}>
          <HS.Credit>
            <h1 style={{ color: "#a7a7a7", fontSize: "2.2rem" }}>OPENERS</h1>
            <ul style={{ listStyle: "none", padding: "0" }}>
              <HS.MemberList>
                <HS.Member href="https://github.com/cher1shRXD" target="_blank">
                  김태우 (Web)
                </HS.Member>
              </HS.MemberList>
              <HS.MemberList>
                <HS.Member href="https://github.com/jbj338033" target="_blank">
                  전민오 (Server)
                </HS.Member>
              </HS.MemberList>
              <HS.MemberList>
                <HS.Member href="https://github.com/kmj5004" target="_blank">
                  김민재 (Android)
                </HS.Member>
              </HS.MemberList>
              <HS.MemberList>
                <HS.Member href="https://github.com/iszero12" target="_blank">
                  김도영 (Android)
                </HS.Member>
              </HS.MemberList>
              <HS.MemberList>
                <HS.Member href="https://github.com/tjalsejr" target="_blank">
                  서민덕 (iOS)
                </HS.Member>
              </HS.MemberList>
              <HS.MemberList>
                <HS.Member href="https://github.com/rkdduss" target="_blank">
                  김강연 (iOS)
                </HS.Member>
              </HS.MemberList>
            </ul>
          </HS.Credit>
          <HS.Credit>
            <h1 style={{ color: "#a7a7a7", fontSize: "2.2rem" }}>Contacts</h1>
            <ul style={{ listStyle: "none", padding: "0" }}>
              <HS.MemberList>
                <HS.Member href="tel:01048901466">
                  대표자 전화번호: 010-4890-1466
                </HS.Member>
              </HS.MemberList>
              <HS.MemberList>
                <HS.Member href="mailto:tw080401@naver.com">
                  문의 메일: tw080401@naver.com
                </HS.Member>
              </HS.MemberList>
              <HS.MemberList>
                <HS.Member
                  href="https://map.kakao.com/?q=%EB%8C%80%EA%B5%AC%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4%20%EB%A7%88%EC%9D%B4%EC%8A%A4%ED%84%B0%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90"
                  target="_blank"
                >
                  주소: 대구광역시 달성군 구지면 창리로11길 93 <br />
                  (대구소프트웨어마이스터고등학교)
                </HS.Member>
              </HS.MemberList>
            </ul>
          </HS.Credit>
          <HS.Credit>
            <h1 style={{ color: "#a7a7a7", fontSize: "2.2rem" }}>
              개인정보 처리 방침
            </h1>
            <ul style={{ listStyle: "none", padding: "0" }}>
              <HS.MemberList>
                <HS.Member
                  href="https://copper-wedge-be0.notion.site/Openmusic-481b7ce9c03443e9ab28c34a12f66b4e"
                  target="_blank"
                >
                  개인정보 처리 방침 (노션)
                </HS.Member>
              </HS.MemberList>
            </ul>
          </HS.Credit>
        </div>

        <p>
          Copyrights&copy;2024
          <span
            style={{ color: "#52a9f9", display: "flex", alignItems: "center" }}
          >
            OPENMUSIC{" "}
            <img
              src="/assets/imgs/logo_color.png"
              alt=""
              style={{ width: "2rem", margin: "0.5rem" }}
            />
          </span>{" "}
          All rights reserved
        </p>
      </HS.Footer>
    </HS.Conatainer>
  );
};

export default HomePage;
