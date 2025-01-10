import { useDispatch, useSelector } from "react-redux"
import { setShowTaskDetailsPopup, setGetTaskDetails, setTaskColArrays, taskUpdateColumnApi } from "../redux/slices/taskSlice"
;

const Task = ({task, id}) => {
    const dispatch = useDispatch()

    const taskSlice = useSelector((state)=> state.taskSlice) 
    const taskColArrays = useSelector((state)=> state.taskSlice.taskColArrays) 

    const handleGetTaskDetails = (title, details)=>{
            if(taskSlice.showAddTaskPopup !== true && taskSlice.showTaskDetailsPopup !==true)
            {
              dispatch(setShowTaskDetailsPopup(true))
              dispatch(setGetTaskDetails({title, details}))
            }
          }

    const moveRight = (e, task)=>{
          e.stopPropagation()
          if(taskSlice.showAddTaskPopup || taskSlice.showTaskDetailsPopup) return
            const colId=id;
            if(colId == "c1")
              {
                dispatch(taskUpdateColumnApi({taskId: task._id, taskColumn: "col2"}))
              } else if(colId == "c2"){
                dispatch(taskUpdateColumnApi({taskId: task._id, taskColumn: "col3"}))
              }
          }

    const moveLeft = (e, task)=>{
          e.stopPropagation()
          if(taskSlice.showAddTaskPopup || taskSlice.showTaskDetailsPopup) return
            const colId=id;
            if(colId == "c2")
              {
                dispatch(taskUpdateColumnApi({taskId: task._id, taskColumn: "col1"}))
              }else if(colId == "c3"){
                dispatch(taskUpdateColumnApi({taskId: task._id, taskColumn: "col2"}))
              }
          }
      
  return (
    <div>
        <div className="cursor-pointer w-fit mx-auto" onClick={()=>handleGetTaskDetails(task?.taskTitle, task?.taskDetails)}> {task?.taskTitle} </div>
        <div className="flex gap-10 justify-center" id={id}>
              {(id == "c1") ? <button className=" bg-gray-300 rounded-full w-10 h-10" onClick={(e)=>moveRight(e, task)}>{"->"}
              </button> : (id == "c2") ?
               <> 
               <button className=" bg-gray-300 rounded-full w-10 h-10" onClick={(e)=>moveLeft(e, task)}>{"<-"}</button> 
               <button className=" bg-gray-300 rounded-full w-10 h-10" onClick={(e)=>moveRight(e, task)}>{"->"}</button>
                </> : 
                <button className=" bg-gray-300 rounded-full w-10 h-10" onClick={(e)=>moveLeft(e, task)}>{"<-"}  
                </button>
                }
         </div>
    </div>
  )
}
export default Task