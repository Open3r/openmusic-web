import { useEffect, useState } from "react";
import * as S from "./style";
import NotificationService from "../../libs/notification/NotificationService";
import instance from "../../libs/axios/customAxios";
import { userStore } from "../../stores/userStore";

const GenreChoosePage = () => {
  const [genre, setGenre] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);

  const pushToGenre = (e: any) => {
    const genreTarget = e.target.className.split(" ")[0];
    if (!genre.includes(genreTarget)) {
      if (genre.length < 4) {
        setGenre([...genre, genreTarget]);
      } else {
        NotificationService.warn("장르 선택은 4개가 최대입니다.");
      }
    } else {
      setGenre(genre.filter((gen) => gen !== genreTarget));
    }
  };

  const submit = () => {
    setLoading(true);
    genre.map((item) => {
      if (item !== "SWING_JAZZ") {
        instance.post("/users/me/genres", { genre: item }).then(() => {
          instance.get("/users/me").then((res) => {
            console.log(res.data.data);
            setUser(res.data.data);
          });
        });
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    if (user && user.genres && user.genres.length > 0) {
      window.location.href = "/";
    }
  }, [user]);

  return (
    <S.Container>
      <S.Main>
        <S.Title>
          <span style={{ color: "#52a9f9" }}>OPEN MUSIC</span>에서 <br />
          어떤노래가 듣고 싶으신가요? <br />
          <span style={{ color: "gray", fontSize: "1.5rem" }}>
            장르를 선택해주세요.
          </span>
        </S.Title>
        <S.GenreBoxWrap>
          <S.GenreBox
            className="POP"
            onClick={pushToGenre}
            style={
              genre.includes("POP")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            팝
          </S.GenreBox>
          <S.GenreBox
            className="HIPHOP"
            onClick={pushToGenre}
            style={
              genre.includes("HIPHOP")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            힙합
          </S.GenreBox>
          <S.GenreBox
            className="BALLAD"
            onClick={pushToGenre}
            style={
              genre.includes("BALLAD")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            발라드
          </S.GenreBox>
          <S.GenreBox
            className="CLASSIC"
            onClick={pushToGenre}
            style={
              genre.includes("CLASSIC")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            클래식
          </S.GenreBox>
          <S.GenreBox
            className="JAZZ"
            onClick={pushToGenre}
            style={
              genre.includes("JAZZ")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            재즈
          </S.GenreBox>
          <S.GenreBox
            className="SWING_JAZZ"
            onClick={pushToGenre}
            style={
              genre.includes("SWING_JAZZ")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            스윙재즈
          </S.GenreBox>
          <S.GenreBox
            className="CITY_POP"
            onClick={pushToGenre}
            style={
              genre.includes("CITY_POP")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            시티팝
          </S.GenreBox>
          <S.GenreBox
            className="COUNTRY"
            onClick={pushToGenre}
            style={
              genre.includes("COUNTRY")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            컨트리
          </S.GenreBox>
          <S.GenreBox
            className="ROCK"
            onClick={pushToGenre}
            style={
              genre.includes("ROCK")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            락
          </S.GenreBox>
          <S.GenreBox
            className="METAL"
            onClick={pushToGenre}
            style={
              genre.includes("METAL")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            메탈
          </S.GenreBox>
          <S.GenreBox
            className="ELECTRONIC"
            onClick={pushToGenre}
            style={
              genre.includes("ELECTRONIC")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            일레트로닉
          </S.GenreBox>
          <S.GenreBox
            className="RNB"
            onClick={pushToGenre}
            style={
              genre.includes("RNB")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            R&B
          </S.GenreBox>
          <S.GenreBox
            className="DANCE"
            onClick={pushToGenre}
            style={
              genre.includes("DANCE")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            댄스
          </S.GenreBox>
          <S.GenreBox
            className="REGGAE"
            onClick={pushToGenre}
            style={
              genre.includes("REGGAE")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            레게
          </S.GenreBox>
          <S.GenreBox
            className="BLUES"
            onClick={pushToGenre}
            style={
              genre.includes("BLUES")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            블루스
          </S.GenreBox>
          <S.GenreBox
            className="FOLK"
            onClick={pushToGenre}
            style={
              genre.includes("FOLK")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            포크
          </S.GenreBox>
          <S.GenreBox
            className="SOUL"
            onClick={pushToGenre}
            style={
              genre.includes("SOUL")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            소울
          </S.GenreBox>
          <S.GenreBox
            className="OST"
            onClick={pushToGenre}
            style={
              genre.includes("OST")
                ? { backgroundColor: "#52a9f9", color: "white" }
                : {}
            }
          >
            OST
          </S.GenreBox>
        </S.GenreBoxWrap>
        <S.Button onClick={submit} disabled={loading}>
          {loading ? "저장중..." : "저장하기"}
        </S.Button>
      </S.Main>
    </S.Container>
  );
};

export default GenreChoosePage;
