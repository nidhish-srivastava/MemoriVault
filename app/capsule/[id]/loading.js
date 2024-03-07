import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

function Loading() {
  return (
    <div style={{width : "80%",margin : "0 auto"}}>
      <div className="skeleton-loading">
        <Skeleton count={5}/>
        </div> 
    </div>
  )
}

export default Loading