import { setShowAddTaskPopup } from "./redux/slices/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import AddTaskPopUp from "./components/AddTaskPopUp";
import Columns from "./components/Columns";
import Overlay from "./components/Overlay";
import {getTasksApi, setApiStatus, setAddTaskResp} from "./redux/slices/taskSlice";
import { useEffect, useState } from "react";
import ShowDetailsPopup from "./components/ShowDetailsPopup";
import {DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy } from '@dnd-kit/sortable';


const App = () => {
  const dispatch = useDispatch();

  const [columnDraggable, setColumnDraggable] = useState(true);

  const [columns, setColumns] = useState([
    {id:"col1"},
    {id:"col2"},
    {id:"col3"},
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getColumnPos = id => columns.findIndex(task => task.id === id)

  function handleDragEnd(event) {
    const {active, over} = event;
    const oldIndex = getColumnPos(active?.id)
    const newIndex = getColumnPos(over?.id)
    
    if (columnDraggable && active?.id !== over?.id) {
      setColumns((columns) => {    
        return arrayMove(columns, oldIndex, newIndex);
      });
    }
  }

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
      <DndContext  sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className={`flex gap-4 justify-center pt-5 border border-red-500 p-3 max-w-[90vw] mx-auto rounded-lg`}>
        <SortableContext 
        items={columns}
        strategy={horizontalListSortingStrategy}>
          {columns?.map((column)=>(
              <div className={`w-[100vw] flex justify-center`} id={column.id} key={column.id}>
                  <Columns
                    col={taskColArrays[column.id]}
                    id={column.id}
                    columnDraggable={columnDraggable}
                    setColumnDraggable={setColumnDraggable}/>
              </div>
          ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
};
export default App;
