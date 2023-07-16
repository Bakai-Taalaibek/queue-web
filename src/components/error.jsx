import { useRouteError } from "react-router-dom";
import '../styles/mainStyles.scss'

export const Error = () => {
  const error = useRouteError();

  return(
    <>
      <p className="text">{ error.statusText || error.message }</p>
    </>
  )
}
