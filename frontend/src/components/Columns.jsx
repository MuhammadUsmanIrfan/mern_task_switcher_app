import {  useDispatch, useSelector } from "react-redux"
import ShowDetailsPopup from "./ShowDetailsPopup"
import Task from "./Task"
import Draggable from 'react-draggable'
import { taskUpdateColumnApi } from "../redux/slices/taskSlice"

const Columns = ({col, id}) => {
   const dispatch = useDispatch()
   const taskSlice = useSelector((state)=> state.taskSlice) 
   
   const handleDragStop = (e, task) => {
    const droppedColId =  document.elementFromPoint(e.screenX, e.screenY).id
   
    if(droppedColId == "c1"){
       dispatch(taskUpdateColumnApi({taskId: task._id, taskColumn: "col1"}))
    }
    if(droppedColId == "c2"){
       dispatch(taskUpdateColumnApi({taskId: task._id, taskColumn: "col2"}))
    }
    if(droppedColId == "c3"){
       dispatch(taskUpdateColumnApi({taskId: task._id, taskColumn: "col3"}))
    }
   }

    return (
     <>
    {taskSlice.showTaskDetailsPopup && <ShowDetailsPopup/>} 
        <div id={id} className="border border-white rounded-lg min-h-[60vh] w-[25%] p-3">
          {col.map((task)=>(
            <Draggable
            onStop={(e)=>handleDragStop(e, task)}
            key={task._id}
            >
              <div className="font-bold bg-white text-center max-w-[100%] rounded-lg mb-2 h-20" >
                <Task task={task} id={id}/>
              </div>
            </Draggable>
          ))}
        </div> 
    </> 
  )
}
export default Columns