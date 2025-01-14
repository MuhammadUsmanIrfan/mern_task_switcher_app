import { useDispatch, useSelector } from "react-redux"
import { setShowTaskDetailsPopup, setGetTaskDetails } from "../redux/slices/taskSlice";

const Task = ({task, id}) => {
    const dispatch = useDispatch()

    const taskSlice = useSelector((state)=> state.taskSlice) 

    const handleGetTaskDetails = (title, details)=>{
            if(taskSlice.showAddTaskPopup !== true && taskSlice.showTaskDetailsPopup !==true)
            {
              dispatch(setShowTaskDetailsPopup(true))
              dispatch(setGetTaskDetails({title, details}))
            }
          }
      
  return (
    <div onClick={()=>handleGetTaskDetails(task?.taskTitle, task?.taskDetails)}>
        <div className="cursor-pointer w-fit mx-auto"> {task?.taskTitle} </div>
    </div>
  )
}
export default Task