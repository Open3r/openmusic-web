import * as S from './style'

const NotFoundPage = () => {
  return (
    <S.Container>
      <S.Title>404 not found {':('}</S.Title>
      <S.Description>요청하신 정보가 존재하지 않습니다.</S.Description>
    </S.Container>
  )
}

export default NotFoundPage;