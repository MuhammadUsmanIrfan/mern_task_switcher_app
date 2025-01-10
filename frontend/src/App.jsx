import { setShowAddTaskPopup } from "./redux/slices/taskSlice";
import { useSelector, useDispatch } from 'react-redux';
import AddTaskPopUp from "./components/AddTaskPopUp";
import Columns from "./components/Columns";
import Overlay from "./components/Overlay";
import { getTasksApi, setApiStatus, setAddTaskResp } from "./redux/slices/taskSlice";
import { useEffect, useState } from "react";
import Draggable from 'react-draggable';

const App = () => {
  const dispatch = useDispatch();

  const [columnDraggable, setColumnDraggable] = useState(false);
  const [columnPositions, setColumnPositions] = useState({
    c1: { x: 0, y: 0 },
    c2: { x: 0, y: 0 },
    c3: { x: 0, y: 0 },
  });

  const taskSlice = useSelector((state) => state.taskSlice);
  const taskColArrays = useSelector((state) => state.taskSlice.taskColArrays);

  const handleAddTask = () => {
    dispatch(setShowAddTaskPopup(true));
  };

  useEffect(() => {
    if (taskSlice.apiStatus === false) {
      dispatch(getTasksApi());
    } else {
      dispatch(setApiStatus(false));
    }
  }, [taskSlice.taskUpdateColumnResp]);

  useEffect(() => {
    if (taskSlice.addTaskResp.success === true) {
      dispatch(getTasksApi());
      dispatch(setAddTaskResp(""));
    } else {
      dispatch(setAddTaskResp(""));
    }
  }, [taskSlice.addTaskResp]);

  const handleDragStop = (e, data, colId) => {
    const droppedColId = document.elementFromPoint(e.clientX, e.clientY)?.id;
    console.log(droppedColId);

    if (droppedColId && droppedColId !== colId) {
      const newPositions = { ...columnPositions };
      const temp = newPositions[colId];
      newPositions[colId] = newPositions[droppedColId];
      newPositions[droppedColId] = temp;

      setColumnPositions(newPositions);
    }
  };

  return (
    <div className={`min-h-[100vh] bg-slate-400 relative`}>
      {taskSlice.showAddTaskPopup && <AddTaskPopUp />}
      {(taskSlice.showAddTaskPopup || taskSlice.showTaskDetailsPopup) && <Overlay />}
      <h1 className="py-2 text-2xl text-center">Task Switcher App</h1>
      <div className="flex justify-center my-4">
        <button className="bg-green-700 px-2 py-2 rounded-lg text-white" onClick={handleAddTask}
          disabled={taskSlice.showTaskDetailsPopup ? true : null}>
          Add Task
        </button>
      </div>

      <div className="flex gap-4 justify-center pt-5">
        {Object.keys(columnPositions).map((colId, index) => (
          <Draggable
            key={colId}
            disabled={columnDraggable}
            position={columnPositions[colId]}
            scale={1}
            onStop={(e, data) => handleDragStop(e, data, colId)}
          >
            <div className="w-[100vw] flex justify-center" id={colId}>
              <Columns col={taskColArrays[`col${index + 1}`]} id={colId} setColumnDraggable={setColumnDraggable} />
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default App;


// import { setShowAddTaskPopup } from "./redux/slices/taskSlice";
// import { useSelector, useDispatch } from "react-redux";
// import AddTaskPopUp from "./components/AddTaskPopUp";
// import Columns from "./components/Columns";
// import Overlay from "./components/Overlay";
// import {
//   getTasksApi,
//   setApiStatus,
//   setAddTaskResp,
// } from "./redux/slices/taskSlice";
// import { useEffect, useState } from "react";
// import Draggable from "react-draggable";

// const App = () => {
//   const dispatch = useDispatch();

//   const [columnDraggable, setColumnDraggable] = useState(false);
//   const [columnPositions, setColumnPositions] = useState({
//     c1: { x: 0, y: 0 },
//     c2: { x: 0, y: 0 },
//     c3: { x: 0, y: 0 },
//   });

//   const taskSlice = useSelector((state) => state.taskSlice);
//   const taskColArrays = useSelector((state) => state.taskSlice.taskColArrays);

//   const handleAddTask = () => {
//     dispatch(setShowAddTaskPopup(true));
//   };

//   useEffect(() => {
//     if (taskSlice.apiStatus == false) {
//       dispatch(getTasksApi());
//     } else dispatch(setApiStatus(false));
//   }, [taskSlice.taskUpdateColumnResp]);

//   useEffect(() => {
//     if (taskSlice.addTaskResp.success == true) {
//       dispatch(getTasksApi());
//       dispatch(setAddTaskResp(""));
//     } else dispatch(setAddTaskResp(""));
//   }, [taskSlice.addTaskResp]);

//   const handleDragStart = () => {};

//   const handleDragStop = (e, data, columnId) => {
//     const droppedColId = document.elementFromPoint(e.clientX, e.clientY).id;

//     if (droppedColId && droppedColId !== columnId) {
//       const newPositions = { ...columnPositions };
//       const temp = newPositions[columnId];
//       newPositions[columnId] = newPositions[droppedColId];
//       newPositions[droppedColId] = temp;
//       setColumnPositions(newPositions);
//     }
//   };

//   return (
//     <div className={`min-h-[100vh] bg-slate-400 relative`}>
//       {taskSlice.showAddTaskPopup && <AddTaskPopUp />}
//       {(taskSlice.showAddTaskPopup || taskSlice.showTaskDetailsPopup) && (
//         <Overlay />
//       )}
//       <h1 className="py-2 text-2xl text-center">Task Switcher App</h1>
//       <div className="flex justify-center my-4">
//         <button
//           className="bg-green-700 px-2 py-2 rounded-lg text-white"
//           onClick={() => handleAddTask()}
//           disabled={taskSlice.showTaskDetailsPopup ? true : null}
//         >
//           Add Task
//         </button>
//       </div>

//       <div className="flex gap-4 justify-center pt-5">
//         <Draggable
//           disabled={columnDraggable}
//           position={{ x: 0, y: 0 }}
//           scale={1}
//           onStart={handleDragStart}
//           onStop={handleDragStop}
//         >
//           <div className="w-[100vw] flex justify-center" id={"c1"}>
//             <Columns
//               col={taskColArrays.col1}
//               id={"c1"}
//               setColumnDraggable={setColumnDraggable}
//             />
//           </div>
//         </Draggable>
//         <Draggable
//           disabled={columnDraggable}
//           position={{ x: 0, y: 0 }}
//           scale={1}
//           onStart={handleDragStart}
//           onStop={handleDragStop}
//         >
//           <div className="w-[100vw] flex justify-center" id={"c2"}>
//             <Columns
//               col={taskColArrays.col2}
//               id={"c2"}
//               setColumnDraggable={setColumnDraggable}
//             />
//           </div>
//         </Draggable>
//         <Draggable
//           disabled={columnDraggable}
//           position={{ x: 0, y: 0 }}
//           scale={1}
//           onStart={handleDragStart}
//           onStop={handleDragStop}
//         >
//           <div className="w-[100vw] flex justify-center" id={"c3"}>
//             <Columns
//               col={taskColArrays.col3}
//               id={"c3"}
//               setColumnDraggable={setColumnDraggable}
//             />
//           </div>
//         </Draggable>
//       </div>
//     </div>
//   );
// };
// export default App;
