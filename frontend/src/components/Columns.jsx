import {  useDispatch, useSelector } from "react-redux"
import Task from "./Task"
import Draggable from 'react-draggable'
import { taskUpdateColumnApi, setShowTaskDetailsPopup, setGetTaskDetails } from "../redux/slices/taskSlice"
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const Columns = ({col, id, columnDraggable, setColumnDraggable}) => {
   const dispatch = useDispatch()

   const { attributes, listeners, setNodeRef, transform, transition,} = useSortable({id: id});
    
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
   
   const handleDragStop = (e, task) => {
    const droppedColId =  document.elementFromPoint(e.screenX, e.screenY)?.id
   
    if(droppedColId == "col1"){
       dispatch(taskUpdateColumnApi({taskId: task._id, taskColumn: "col1"}))
    }
    if(droppedColId == "col2"){
       dispatch(taskUpdateColumnApi({taskId: task._id, taskColumn: "col2"}))
    }
    if(droppedColId == "col3"){
       dispatch(taskUpdateColumnApi({taskId: task._id, taskColumn: "col3"}))
    }
   }

   return (
      <>
      {columnDraggable  ? <div ref={setNodeRef} style={style}  {...attributes} {...listeners}  id={id} 
         className="border border-white rounded-lg min-h-[60vh] w-[80%] p-3">
          <p className="text-center">{id}</p>
            {col.map((task)=>(
               <Draggable
                position={{x:0, y:0}}
                scale={1}
                onStop={(e)=>handleDragStop(e, task)}
                key={task._id}>
                  <div className="font-bold bg-white text-center max-w-[100%] rounded-lg mb-2 h-20" 
                     onMouseEnter={()=>setColumnDraggable(false) } onMouseLeave={()=>setColumnDraggable(true)}
                     >
                     <Task task={task} id={id}/>
                  </div>
               </Draggable>
            ))}
        </div> : 
        <div id={id} 
        className="border border-white rounded-lg min-h-[60vh] w-[80%] p-3">
         <p className="text-center">{id}</p>
           {col.map((task)=>(
              <Draggable
               position={{x:0, y:0}}
               scale={1}
               onStop={(e)=>handleDragStop(e, task)}
               key={task._id}>
                 <div className="font-bold bg-white text-center max-w-[100%] rounded-lg mb-2 h-20" 
                    onMouseEnter={()=>setColumnDraggable(false) } onMouseLeave={()=>setColumnDraggable(true)}
                    >
                    <Task task={task} id={id}/>
                 </div>
              </Draggable>
           ))}
       </div>}
      </>
  )
}
export default Columns