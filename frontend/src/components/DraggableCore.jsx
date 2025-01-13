import React, { useState } from "react";
import { DraggableCore } from "react-draggable";

const StackingDraggable = () => {
  // State to manage z-index and positions of children
  const [zIndexMap, setZIndexMap] = useState({
    child1: 1,
    child2: 2,
    child3: 3,
  });

  const [positionMap, setPositionMap] = useState({
    child1: { x: 0, y: 0 },
    child2: { x: 100, y: 100 },
    child3: { x: 200, y: 200 },
  });

  // Handle when dragging starts
  const handleStart = (id) => {
    setZIndexMap((prev) => ({
      ...prev,
      [id]: Math.max(...Object.values(prev)) + 1, // Bring to the top
    }));
  };

  // Handle when dragging is ongoing
  const handleDrag = (e, data, id) => {
    setPositionMap((prev) => ({
      ...prev,
      [id]: {
        x: prev[id].x + data.deltaX,
        y: prev[id].y + data.deltaY,
      },
    }));
  };

  return (
    <div className="relative w-screen h-screen bg-gray-100">
      {Object.keys(positionMap).map((id) => (
        <DraggableCore
          key={id}
          onStart={() => handleStart(id)}
          onDrag={(e, data) => handleDrag(e, data, id)}
        >
          <div
            style={{
              transform: `translate(${positionMap[id].x}px, ${positionMap[id].y}px)`,
              zIndex: zIndexMap[id],
            }}
            className="absolute w-24 h-24 flex items-center justify-center cursor-move select-none text-white font-bold shadow-md"
          >
            <div
              className={`w-full h-full flex items-center justify-center rounded-lg ${
                id === "child1" ? "bg-red-500" : id === "child2" ? "bg-green-500" : "bg-blue-500"
              }`}
            >
              {id}
            </div>
          </div>
        </DraggableCore>
      ))}
    </div>
  );
};

export default StackingDraggable;
