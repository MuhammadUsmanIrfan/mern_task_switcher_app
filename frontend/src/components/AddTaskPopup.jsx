import { useDispatch, useSelector } from "react-redux"
import { setShowAddTaskPopup, addTasksApi, setAddTaskResp, setGetTaskDetails} from "../redux/slices/taskSlice"
import { useEffect, useState } from "react"
import CkEditor from "./CkEditor"

const AddTaskPopUp = () => {
    const dispatch = useDispatch()
    
    const taskSlice = useSelector((state)=> state.taskSlice) 
    
    const [taskTitle, setTaskTitle] = useState("")

    const [taskTitleStatus, setTaskTitleStatus] = useState(false)
    
    useEffect(()=>{
        if(taskSlice.addTaskResp?.success){
            dispatch(setAddTaskResp(""))
            setTaskTitle("")
            dispatch(setGetTaskDetails(""))
            dispatch(setShowAddTaskPopup(false))
        }
    },[taskSlice.addTaskResp])

    const handleClosePopup = ()=>{
        dispatch(setShowAddTaskPopup(false))
    }
   
return (
    <div className="absolute top-[20%] left-1/2 translate-x-[-50%] min-w-[80%] min-h-[40%] bg-gray-800 rounded-lg z-40">
        <div className="relative">
            <button className="absolute top-0 right-0 bg-red-400 rounded-full w-7 h-7" onClick={()=>handleClosePopup()}>X</button>
            <h1 className="text-2xl text-white text-center pt-3">Add task</h1>
            <div className="flex flex-col items-center my-5 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="font-medium text-white">Task title</label>
                    <input className="py-1 pl-3 rounded-md text-sm focus:outline-none min-w-[100%]" type="text" placeholder="Add title" value={taskTitle} 
                    onChange={(e)=>setTaskTitle(e.target.value)}/> 
                    {taskTitleStatus && <p className="text-red-500 font-bold">**Task title is required**</p>}   
                </div>
                <div className="flex flex-col min-w-[80%] min-h-[80%]">
                    <label className="font-medium text-white">Task Discription</label>
                   <CkEditor taskTitle={taskTitle} setTaskTitleStatus={setTaskTitleStatus} setTaskTitle={setTaskTitle} handleClosePopup={handleClosePopup}/>         
                </div>
            </div>
        </div>
    </div>
  )
}
export default AddTaskPopUp