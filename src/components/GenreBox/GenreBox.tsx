import * as GB from './GenreBox.style'
import { GenreProps } from './Interfaces'

const GenreBox = (props:GenreProps) => {
  return (
    <GB.GenreBox>{props.genre}</GB.GenreBox>
  )
}

export default GenreBox