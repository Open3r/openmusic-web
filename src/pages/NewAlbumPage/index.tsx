import * as S from './style';
import Logo from '../../assets/imgs/logo_color.png';
import { AlbumType } from '../../interfaces/album';
import { useEffect, useState } from 'react';
import instance from '../../libs/axios/customAxios';
import { paging } from '../../libs/axios/paging';
import AlbumBox from '../../components/AlbumBox';

const NewAlbumPage = () => {
  const [detail,setDetail] = useState<AlbumType[]>();
  const [loading, setLoading] = useState(false);


  const albumReq = async () => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      loadingTimeout = setTimeout(() => setLoading(true), 5000);
      const res = await instance.get("/albums", {
        params: { ...paging, size: 50 },
      });
      setDetail(res.data.data.content);
    } finally {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
      setLoading(false);
    }
  };

  useEffect(()=>{
    albumReq();
  },[]);

  return (
    <S.Container>
      {loading ? (
        <S.LoadingShadow>
          <S.Spinner></S.Spinner>
        </S.LoadingShadow>
      ) : null}
      <S.Main>
        <S.Title>
          <img
            src={Logo}
            alt=""
            style={{ height: "4rem", width: "4rem", marginRight: "2rem" }}
          />
          당신을 위한 새로운 앨범
        </S.Title>
        {detail?.length && detail.length > 0 ? (
          <S.AlbumWrap>
            {detail?.map((item) => (
              <AlbumBox item={item} key={item.id} type='list'/>
            ))}
          </S.AlbumWrap>
        ) : (
          <h1 style={{ color: "gray", textAlign: "center" }}>앨범이 없습니다</h1>
        )}
      </S.Main>
    </S.Container>
  );
}

export default NewAlbumPage