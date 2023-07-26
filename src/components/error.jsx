import { useRouteError } from "react-router-dom";
import '../styles/mainStyles.scss'

export const Error = () => {
  const error = useRouteError();

  return(
    <div className='glass-container glass-container--grid-3'>
      <p className="text text--medium" >Error:</p>
      <p className="text">{ error.statusText || error.message }</p>
    </div>
  )
}
