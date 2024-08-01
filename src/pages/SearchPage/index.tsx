import { useParams } from 'react-router-dom';
import * as S from './style';
import { useEffect, useState } from 'react';
import { Song } from '../../interfaces/Song';
import { PlaylistType } from '../../interfaces/playlist';
import { AlbumType } from '../../interfaces/album';
import instance from '../../libs/axios/customAxios';
import SongBox from '../../components/SongBox';
import PlaylistBox from '../../components/PlaylistBox';
import AlbumBox from '../../components/AlbumBox';

export const SearchPage = () => {
  const [songResult, setSongResult] = useState<Song[]>();
  const [playlistResult, setPlaylistResult] = useState<PlaylistType[]>();
  const [albumResult, setAlbumResult] = useState<AlbumType[]>();

  const param = useParams();

  const songSearchReq = async () => {
    const res = await instance.get('/songs/search',{params:{query:param.keyword}});
    setSongResult(res.data.data.content);
  }

  const playlistSearchReq = async () => {
    const res = await instance.get("/playlists/search", {
      params: { query: param.keyword },
    });
    setPlaylistResult(res.data.data.content);
  };

  const albumSearchReq = async () => {
    const res = await instance.get("/albums/search", {
      params: { query: param.keyword },
    });
    setAlbumResult(res.data.data.content);
  };

  useEffect(()=>{
    songSearchReq();
    playlistSearchReq();
    albumSearchReq();
  },[]);

  return (
    <S.Container>
      <S.ResultCountWrap>
        <S.ResultCount>
          노래 <span style={{ color: "#52A9F9" }}>{songResult?.length}</span> 곡
        </S.ResultCount>
        <span style={{ margin: "0 2rem", fontSize: "3rem", color: "gray" }}>
          ·
        </span>
        <S.ResultCount>
          플레이리스트{" "}
          <span style={{ color: "#52A9F9" }}>{playlistResult?.length}</span> 개
        </S.ResultCount>
        <span style={{ margin: "0 2rem", fontSize: "3rem", color: "gray" }}>
          ·
        </span>
        <S.ResultCount>
          앨범 <span style={{ color: "#52A9F9" }}>{songResult?.length}</span> 개
        </S.ResultCount>
      </S.ResultCountWrap>
      <S.SongResultArea>
        <S.SectionTitle style={{ marginBottom: "2rem" }}>노래</S.SectionTitle>
        <S.SongResultWrap>
          {songResult?.map((content, idx) => (
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
        </S.SongResultWrap>
      </S.SongResultArea>
      <S.PlaylistResultArea>
        <S.SectionTitle>플레이리스트</S.SectionTitle>
        <S.PlaylistResultWrap>
          {playlistResult?.map((content) => (
            <PlaylistBox type="default" key={content.id} item={content} />
          ))}
        </S.PlaylistResultWrap>
      </S.PlaylistResultArea>
      <S.AlbumResultArea>
        <S.SectionTitle>앨범</S.SectionTitle>
        <S.AlbumResultWrap>
          {albumResult?.map((content) => (
            <AlbumBox item={content} key={content.id} type='default'/>
          ))}
        </S.AlbumResultWrap>
      </S.AlbumResultArea>
    </S.Container>
  );
}
