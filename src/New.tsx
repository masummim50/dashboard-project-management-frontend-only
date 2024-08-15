import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import React from "react";
import NewItem from "./NewItem";

import SortableContainer from "./SortableContainer";

function moveItem(
  containers: containerType[],
  itemIndex: number,
  oldContainerIndex: number,
  newContainerIndex: number
): containerType[] {
  // Clone the containers array to avoid mutating the original array
  const updatedContainers = [...containers];

  // Extract the item from the old container
  const [item] = updatedContainers[oldContainerIndex].items.splice(itemIndex, 1);

  // Push the item into the new container
  updatedContainers[newContainerIndex].items.push(item);

  return updatedContainers;
}


export type todoType = {
  id: number;
  title: string;
};

export type containerType = {
  id: number;
  type: string;
  items: todoType[];
};
const todos: todoType[] = [
  { id: 11, title: "something" },
  { id: 22, title: "something two" },
  { id: 2432, title: "something three" },
  { id: 2233, title: "something four" },
  { id: 2322, title: "something five" },
];
const containers = [
  { id: 101, type: "todo", items: todos },
  { id: 202, type: "in-progress", items: [] },
];

function removeElementAtIndex(arr: any[], index: number) {
  if (index >= 0 && index < arr.length) {
    arr.splice(index, 1);
  } else {
    console.log("Index out of bounds");
  }
  return arr;
}

const New = () => {
  const [activeType, setActiveType] = React.useState<
    "container" | "item" | null
  >(null);
  const [activeData, setActiveData] = React.useState<
    containerType | todoType | null
  >(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [data, setData] = React.useState<containerType[]>(containers);
  const [activeId, setActiveId] = React.useState<number | null>(null);
  // things dndcontext needs
  const sensors = useSensors(useSensor(MouseSensor), useSensor(KeyboardSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as number);
    setActiveData(active.data?.current?.data);
    setActiveType(active.data.current?.type);
    setActiveIndex(active.data?.current?.index);
    console.log("drag start event: ", event);
  };
  const handleDragOver = (event: DragOverEvent) => {
    console.log("drag over event: ", event);
    const { active, over } = event;
    const overType = over?.data.current?.type;

    if (!active || !over) return;
    // handle drag over for container first:
    if (active.id === over.id) return;
    if (activeType === "container" && overType === "container") {
      setData(
        arrayMove(data, active.data?.current?.index, over?.data?.current?.index)
      );
    }

    // handle drag item to container
    if (activeType === "item" && overType === "container") {
      // find the active container and the over container
      const activeContainerIndex = data.findIndex(
        (c) => c.id === active.data.current?.containerId
      );
      const overContainerId = over.id;
      const overContainerIndex = over.data?.current?.index;

      const updatedContainer = moveItem(data, activeIndex, activeContainerIndex, overContainerIndex);
      setData([...updatedContainer]);

      // delete active item from container
      // add item to new container after changing the status type
    }

    // handle drag item to item
    if (activeType === "item" && overType === "item") {
      // two things can happen the below is if the container id is same 
      // if container id is not same then move the item to the new container
      if(active.data.current?.containerId === over.data.current?.containerId){
        
      const activeContainerIndex = data.findIndex(
        (c) => c.id === active.data.current?.containerId
      );
      const sortedArray = arrayMove(
        data[activeContainerIndex].items,
        activeIndex,
        over.data.current?.index
      );
      setData((data) => [
        ...data.slice(0, activeContainerIndex),
        { ...data[activeContainerIndex], items: sortedArray },
        ...data.slice(activeContainerIndex + 1),
      ]);
      
    }else{
      const activeContainerIndex = data.findIndex(
        (c) => c.id === active.data.current?.containerId
      );
      
      const overContainerId = over.data?.current?.containerId;
      const overContainerIndex = data.findIndex(c=> c.id === overContainerId);

      const updatedContainer = moveItem(data, activeIndex, activeContainerIndex, overContainerIndex);
      setData([...updatedContainer]);
    }
      // s
    }
  };
  const handleDragEnd = (event: DragEndEvent) => {
    console.log("drag ended/dropped: ", event);
    setActiveId(null);
    setActiveType(null);
    setActiveIndex(null);
    setActiveData(null);
  };

  return (
    <div>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        <div className="grid grid-cols-2 gap-3">
          <SortableContext items={data}>
            {data.map((container, index) => (
              <SortableContainer
                activeId={activeId}
                container={container}
                index={index}
              />
            ))}
          </SortableContext>
        </div>
        <DragOverlay>
          {activeType === "container" ? (
            <SortableContainer
              activeId={3243243}
              container={activeData as containerType}
              index={activeIndex as number}
            />
          ) : (
            <NewItem
              item={activeData as todoType}
              index={activeIndex as number}
              activeId={23424}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default New;
