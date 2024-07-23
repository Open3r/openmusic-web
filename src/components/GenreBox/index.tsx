import * as GB from './style'

interface GenreProps {
  genre:string;
  key:number;
}

const GenreBox = (props:GenreProps) => {
  return (
    <GB.GenreBox>{props.genre}</GB.GenreBox>
  )
}

export default GenreBox