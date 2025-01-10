import { setShowAddTaskPopup } from "./redux/slices/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import AddTaskPopUp from "./components/AddTaskPopUp";
import Columns from "./components/Columns";
import Overlay from "./components/Overlay";
import {getTasksApi, setApiStatus, setAddTaskResp} from "./redux/slices/taskSlice";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import ShowDetailsPopup from "./components/ShowDetailsPopup";

const App = () => {
  const dispatch = useDispatch();

  const [columnDraggable, setColumnDraggable] = useState(false);
  const [columnZindex, setColumnZindex] = useState(false);

  const [columns, setColumns] = useState([
    {id:"col1", order:"order-1"},
    {id:"col2", order:"order-2"},
    {id:"col3", order:"order-3"},
  ]);

  const taskSlice = useSelector((state) => state.taskSlice);
  const taskColArrays = useSelector((state) => state.taskSlice.taskColArrays);

  const handleAddTask = () => {
    dispatch(setShowAddTaskPopup(true));
  };

  useEffect(() => {
    if (taskSlice.apiStatus == false) {
      dispatch(getTasksApi());
    } else dispatch(setApiStatus(false));
  }, [taskSlice.taskUpdateColumnResp]);

  useEffect(() => {
    if (taskSlice.addTaskResp.success == true) {
      dispatch(getTasksApi());
      dispatch(setAddTaskResp(""));
    } else dispatch(setAddTaskResp(""));
  }, [taskSlice.addTaskResp]);

  const handleDragStop = (e, data, columnId) => {
    setColumnZindex(false)
    const droppedColClassName = document.elementFromPoint(e.screenX, e.screenY)?.parentElement?.className;
    const droppedColId = document.elementFromPoint(e.screenX, e.screenY)?.parentElement?.id;
   
    // console.log(data?.node);
    console.log("columnId-->",columnId, "droppedColId-->",droppedColId);
    if(columnId=="c1" && droppedColId == "c2")
    {
        // setColumnOrder({
        //   c1: "order-2",
        //   c2: "order-1",
        //   c3: "order-3",
        // })
    } else if(columnId=="c1" && droppedColId == "c3"){
        // setColumnOrder({
        //   c3: "order-1",
        //   c1: "order-3",
        //   c2: "order-2"
        // })
    }
    if(columnId=="c2" && droppedColId == "c3")
      {
          // setColumnOrder({
          //   c1: "order-1",
          //   c2: "order-3",
          //   c3: "order-2",
          // })
      }
   
  
  };

  const handleOnStart = (e, data)=>{
    // setColumnZindex(true)
    console.log(data?.node);
  }

  return (
    <div className={`min-h-[100vh] bg-slate-400 relative`}>
      {taskSlice.showAddTaskPopup && <AddTaskPopUp />}
      {taskSlice.showTaskDetailsPopup && <ShowDetailsPopup/>}
      {(taskSlice.showAddTaskPopup || taskSlice.showTaskDetailsPopup) && (
        <Overlay />
      )}
      <h1 className="py-2 text-2xl text-center">Task Switcher App</h1>
      <div className="flex justify-center my-4">
        <button
          className="bg-green-700 px-2 py-2 rounded-lg text-white"
          onClick={() => handleAddTask()}
          disabled={taskSlice.showTaskDetailsPopup ? true : null}
        >
          Add Task
        </button>
      </div>

      <div className={`flex gap-4 justify-center pt-5 ${columnZindex ? "relative z-10" : "relative z-30"} border border-red-500 p-3 max-w-[90vw] mx-auto rounded-lg`}>
        {columns?.map((column)=>(
            <Draggable
              key={column.id}
              disabled={columnDraggable}
              position={{ x: 0, y: 0 }}
              scale={1}
              onStart={handleOnStart}
              onStop={(e, data)=>handleDragStop(e, data, column.id)}
            >
              <div className={`${column.order} w-[100vw] flex justify-center ${columnZindex ? "relative z-10" : "relative z-30"}`} id={column.id}>
                <Columns
                  col={taskColArrays[column.id]}
                  id={column.id}
                  setColumnDraggable={setColumnDraggable}
                />
              </div>
            </Draggable>
        ))}
      </div>
    </div>
  );
};
export default App;

