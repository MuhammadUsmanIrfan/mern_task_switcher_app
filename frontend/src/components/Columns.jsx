import {  useSelector } from "react-redux"
import ShowDetailsPopup from "./ShowDetailsPopup"
import Task from "./Task"

const Columns = ({col, id}) => {
    
    const taskSlice = useSelector((state)=> state.taskSlice) 
     
    return (
     <>
    {taskSlice.showTaskDetailsPopup && <ShowDetailsPopup/>} 
        <div id="c1" className="border border-white rounded-lg min-h-[60vh] w-[25%] p-3">
          {col.map((task)=>(
            <div className="font-bold bg-white text-center max-w-[100%] rounded-lg mb-2 h-20" key={task._id}>
              <Task task={task} id={id}/>
            </div> ))   
           }
        </div> 
    </> 
  )
}
export default Columns