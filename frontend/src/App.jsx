import {setShowAddTaskPopup} from "./redux/slices/taskSlice"
import { useSelector, useDispatch } from 'react-redux'
import AddTaskPopUp from "./components/AddTaskPopUp"
import Columns from "./components/Columns"
import Overlay from "./components/Overlay"
import { getTasksApi, setApiStatus, setAddTaskResp} from "./redux/slices/taskSlice"
import { useEffect } from "react"

const App = () => {
  const dispatch =  useDispatch()

  const taskSlice = useSelector((state)=> state.taskSlice)
  const taskColArrays = useSelector((state)=> state.taskSlice.taskColArrays) 
  
  const handleAddTask = ()=>{
    dispatch(setShowAddTaskPopup(true))
  }

  useEffect(()=>{
    if(taskSlice.apiStatus == false)
    {
      dispatch(getTasksApi())
    }else  dispatch(setApiStatus(false))
  
  },[taskSlice.taskUpdateColumnResp])  

  useEffect(()=>{
    if(taskSlice.addTaskResp.success == true)
    {
      dispatch(getTasksApi())
      dispatch(setAddTaskResp(""))
    } else dispatch(setAddTaskResp(""))
  
  },[taskSlice.addTaskResp])  

return (
    <div className={`min-h-[100vh] bg-slate-400 relative`}>
      {taskSlice.showAddTaskPopup && <AddTaskPopUp/>}
      {(taskSlice.showAddTaskPopup || taskSlice.showTaskDetailsPopup) && <Overlay/>} 
      <h1 className="py-2 text-2xl text-center">Task Switcher App</h1>
        <div className="flex justify-center my-4">
          <button className="bg-green-700 px-2 py-2 rounded-lg text-white" onClick={()=>handleAddTask()} 
           disabled={taskSlice.showTaskDetailsPopup ? true : null} >
            Add Task</button>
        </div>
        <div className="flex gap-4 justify-around pt-5">
          <Columns col={taskColArrays.col1} id={"c1"}/>
          <Columns col={taskColArrays.col2} id={"c2"}/>
          <Columns col={taskColArrays.col3} id={"c3"}/>
        </div>
    </div>
  )
}
export default App