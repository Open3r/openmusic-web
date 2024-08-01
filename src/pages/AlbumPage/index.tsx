import { useParams } from 'react-router-dom';
import * as S from './style';
import { useEffect, useState } from 'react';
import instance from '../../libs/axios/customAxios';
import PlPlay from "../../assets/imgs/plPlay.svg";
import SongBox from '../../components/SongBox';
import { AlbumType } from '../../interfaces/album';
import Like from "../../assets/imgs/like.svg";
import Unlike from "../../assets/imgs/unlike.svg";
import { songIdUpdate } from '../../stores/nowPlayingStore';
import { queueUpdateStore } from '../../stores/queueStore';

const AlbumPage = () => {

  const [detail, setDetail] = useState<AlbumType>();
  const [loading, setLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const updateSongId = songIdUpdate((state) => state.setSongIdUpdate);
  const setQueueUpdate = queueUpdateStore((state) => state.setQueueUpdate);
  const queue = queueUpdateStore((state) => state.queueUpdate); 

  const param = useParams();

  const detailAlbumReq = async () => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      loadingTimeout = setTimeout(() => setLoading(true), 5000);
      const res = await instance.get(`/albums/${param.id}`);
      setDetail(res.data.data);
    } finally {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      };
      setLoading(false);
    }
  };

  useEffect(()=>{
    detailAlbumReq();
  },[]);

  const copyToQueue = () => {
    instance.delete("/users/me/queue").then(() => {
      if (detail) {
        instance.post("/users/me/queue/album", {
          albumId: detail.id,
        });
        setQueueUpdate(detail.songs);
        if (detail.songs) {
          updateSongId(detail.songs[0].id);
        }
      }
    });
  };

  useEffect(() => {
    if (detail && detail.songs) {
      updateSongId(detail.songs[0].id);
    }
  }, [queue]);

  const likeReq = async () => {
    setLikeLoading(true);
    if (!likeLoading) {
      await instance
        .post(`/albums/${detail?.id}/likes`)
        .then((res) => {
          setDetail(res.data.data);
        })
        .finally(() => {
          setLikeLoading(false);
        });
    }
  };

  const unlikeReq = async () => {
    setLikeLoading(true);
    if (!likeLoading) {
      await instance
        .delete(`/albums/${detail?.id}/likes`)
        .then((res) => {
          setDetail(res.data.data);
        })
        .finally(() => {
          setLikeLoading(false);
        });
    }
  }; 

  return (
    <S.Container>
      {loading ? (
        <S.LoadingShadow>
          <S.Spinner></S.Spinner>
        </S.LoadingShadow>
      ) : null}
      <S.CoverArea>
        <S.CoverImg src={detail?.coverUrl} />
        <S.InfoWrap>
          <S.Title>{detail?.title}</S.Title>
        </S.InfoWrap>
        <S.PlayBtn src={PlPlay} onClick={copyToQueue} />
      </S.CoverArea>
      <S.Main>
        <S.PageTitleWrap>
          <S.AlbumDescription>
            {
              detail?.description
            }
          </S.AlbumDescription>
          <S.AlbumInfoWrap>
            <S.PageTitle>
              By{" "}
              <S.Username to={`/artist/${detail?.artist.id}`}>
                {detail?.artist.nickname}
              </S.Username>
            </S.PageTitle>
            <span style={{ margin: "0 1rem", fontSize: "3rem", color: "gray" }}>
              ·
            </span>
            <S.SongCount>{detail?.songs.length} songs</S.SongCount>
            {!detail?.liked ? (
              <img
                src={Unlike}
                style={{
                  width: "3rem",
                  height: "3rem",
                  cursor: "pointer",
                  marginLeft: "2rem",
                }}
                onClick={likeReq}
              />
            ) : (
              <img
                src={Like}
                style={{
                  width: "3rem",
                  height: "3rem",
                  cursor: "pointer",
                  marginLeft: "2rem",
                }}
                onClick={unlikeReq}
              />
            )}
            <S.SongCount
              style={
                detail?.liked
                  ? { marginLeft: "0.5rem", color: "#52a9f9" }
                  : { marginLeft: "0.5rem", color: "black" }
              }
            >
              {detail?.likeCount}
            </S.SongCount>
          </S.AlbumInfoWrap>
        </S.PageTitleWrap>
        <S.SongList>
          {detail?.songs.length && detail?.songs.length > 0 ? (
            detail.songs.map((item, idx) => (
              <SongBox
                title={item.title}
                artist={item.artist}
                id={item.id}
                key={item.id}
                url={item.url}
                thumbnailUrl={item.thumbnailUrl}
                type={"list"}
                genre={item.genre}
                scope={item.scope}
                liked={item.liked}
                likeCount={item.likeCount}
                rank={idx}
                album={item.album}
              />
            ))
          ) : (
            <h1 style={{ color: "gray", textAlign: "center" }}>
              곡이 없습니다
            </h1>
          )}
        </S.SongList>
        <S.CreditWrap>
          크레딧
        </S.CreditWrap>
      </S.Main>
    </S.Container>
  );
}

export default AlbumPage;