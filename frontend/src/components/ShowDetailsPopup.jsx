import {useDispatch, useSelector} from "react-redux"
import { setShowTaskDetailsPopup } from "../redux/slices/taskSlice"
// import 'packages/ckeditor5-image/theme/imagestyle.css';
import "./CkEditorStyle.css"
import DOMPurify from 'dompurify';

const ShowDetailsPopup = () => {
    const dispatch = useDispatch()
    
    const getTaskDetails = useSelector((state)=> state.taskSlice.getTaskDetails) 
    const details = useSelector((state)=> state.taskSlice.getTaskDetails.details) 
    const sanitizedDetails = DOMPurify.sanitize(details);

    const handleClosePopup = ()=>{
            dispatch(setShowTaskDetailsPopup(false))
        }
    
    return (
    <div className="absolute top-[10%] left-1/2 min-w-[80%] min-h-[25%] translate-x-[-50%]  bg-gray-800 rounded-lg z-40 px-2">
        <div className="relative">
            <button className="absolute top-[-3%] right-[-3%] bg-red-400 rounded-full w-7 h-7" onClick={()=>handleClosePopup()}>X</button>
                <h1 className="text-2xl text-white text-center pt-3">Task Details</h1>
                <div>
                    <div>
                        <p className="font-bold text-white text-center" >Title: {getTaskDetails.title}</p>
                        <div className="text-white list-inside" dangerouslySetInnerHTML={{ __html: sanitizedDetails }} />
                    </div>  
                </div>
           </div>
       </div>
  )
}
export default ShowDetailsPopup
