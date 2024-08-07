import * as S from "./style";
import { PlaylistType } from "../../interfaces/playlist";
import PlaylistBox from "../PlaylistBox";
import { useRef, useState } from "react";
import useFileUpload from "../../hooks/useFileUpload";
import instance from "../../libs/axios/customAxios";
import NotificationService from "../../libs/notification/NotificationService";
import { playlistUpdateStore } from "../../stores/playlistUpdateStore";
import { paging } from "../../libs/axios/paging";

const Playlist = ({
  playlists,
  setPlaylists,
}: {
  playlists: PlaylistType[] | undefined;
  setPlaylists: React.Dispatch<React.SetStateAction<PlaylistType[]|undefined>>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistCover, setPlaylistCover] = useState<string | undefined>();
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistScope, setPlaylistScope] = useState<"PUBLIC" | "PRIVATE">(
    "PUBLIC"
  );
  const [submitLoading, setSubmitLoading] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const { fileUpload, loading } = useFileUpload();

  const setUpdate = playlistUpdateStore(state=>state.setUpdate);

  const handlePlaylistCoverValue = async () => {
    if (fileRef.current && fileRef.current.files && fileRef.current.files[0]) {
      const playlistCoverFile = fileRef.current.files[0];
      const coverUrl = await fileUpload(playlistCoverFile);
      setPlaylistCover(coverUrl);
    }
  };

  const handlePlaylistCover = async () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistTitle(e.target.value);
  };

  const handleScope = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlaylistScope(e.target.value as "PUBLIC" | "PRIVATE");
  };

  const submit = async () => {
    if(playlistTitle.trim() === "" || playlistCover === undefined) {
      NotificationService.warn("모든 필드를 입력해주세요.");
      return;
    }
    setSubmitLoading(true);
    await instance
      .post("/playlists", {
        title: playlistTitle,
        scope: playlistScope,
        coverUrl: playlistCover,
      })
      .then(() => {
        setPlaylistCover(undefined);
        setPlaylistTitle('');
        setPlaylistScope("PUBLIC");
        instance.get('/users/me/playlists',{params:paging})
        .then((response)=>{
          setPlaylists(response.data.data.content);
        });
        setIsModalOpen(false);
      })
      .finally(() => {
        setSubmitLoading(false);
        setUpdate(true);
      });
  };

  return (
    <S.Container>
      <S.Title>플레이리스트</S.Title>
      <S.Main>
        {playlists?.map((item) => (
          <PlaylistBox type="default" key={item.id} item={item} />
        ))}
        <S.AddPlaylist onClick={handleModal}>
          <img src="/assets/imgs/plus.svg" />
        </S.AddPlaylist>
      </S.Main>
      {isModalOpen ? (
        <S.CreatModalWrap>
          <S.Modal>
            <S.ModalTitle>
              플레이리스트 생성
              <img
                src="/assets/imgs/X.svg"
                style={{ height: "2rem", width: "2rem", cursor: "pointer" }}
                onClick={handleModal}
              />
            </S.ModalTitle>
            <S.PlaylistCoverWrap>
              <S.PlaylistCoverInput
                $playlistCover={
                  !loading
                    ? playlistCover
                      ? playlistCover
                      : "/assets/imgs/uploadAlbumCover.svg"
                    : '/assets/imgs/uploading.svg'
                }
                onClick={handlePlaylistCover}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  onChange={handlePlaylistCoverValue}
                />
              </S.PlaylistCoverInput>
            </S.PlaylistCoverWrap>
            <S.PlaylistInputWrap>
              <S.PlaylistTitle
                placeholder="플레이리스트 제목을 입력하세요."
                onChange={handleTitle}
              />
              <S.PlaylistScope onChange={handleScope}>
                <option value="PUBLIC">공개</option>
                <option value="PRIVATE">비공개</option>
              </S.PlaylistScope>
            </S.PlaylistInputWrap>
            <S.PlaylistBtnWrap>
              <S.PlaylistBtn onClick={submit} disabled={submitLoading}>
                {submitLoading ? "생성중..." : "생성"}
              </S.PlaylistBtn>
            </S.PlaylistBtnWrap>
          </S.Modal>
        </S.CreatModalWrap>
      ) : null}
    </S.Container>
  );
};

export default Playlist;
