import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'


function SkeletonLoader() {
  return (
    <div className="bg-black w-[80%] mx-auto my-0 opacity-10">
      <div className="w-[80%] mx-auto my-[4rem]">
        <Skeleton count={5}/>
        </div> 
    </div>
  )
}

export default SkeletonLoader