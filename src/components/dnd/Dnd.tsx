import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useState } from "react";
import {
  initialContainers,
  initialInProgressItems,
  initialReadyItems,
  initialUnderReviewItems,
  inititalTodos,
} from "./data";
import { containerType, itemType } from "./types";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import NewContainer from "./NewContainer";
import Task from "./Task";

const Dnd = () => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(KeyboardSensor));
  const [containers, setContainers] =
    React.useState<containerType[]>(initialContainers);
  const [todoItems, setTodoItems] = React.useState<itemType[]>(inititalTodos);
  const [inProgressItems, setInProgressItems] = React.useState<itemType[]>(
    initialInProgressItems
  );
  const [underReviewItems, setUnderReviewItems] = React.useState<itemType[]>(
    initialUnderReviewItems
  );
  const [readyItems, setReadyItems] =
    React.useState<itemType[]>(initialReadyItems);

  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [activeItem, setActiveItem] = React.useState<
    itemType | containerType | null | undefined
  >(null);
  const [activeType, setActiveType] = useState<"container" | "item" | null>(
    null
  );

  const handleDragStart = (event: DragStartEvent) => {
    console.log("drag start: ", event);
    setActiveId(event.active.id as string);
    setActiveType(event.active.data.current?.type);

    if (event.active.data.current?.type === "item") {
      if (event.active.data.current?.status === "todo") {
        setActiveItem(todoItems.find((t) => t.id === event.active.id));
      }
      if (event.active.data.current?.status === "in-progress") {
        setActiveItem(inProgressItems.find((t) => t.id === event.active.id));
      }
      if (event.active.data.current?.status === "under-review") {
        setActiveItem(underReviewItems.find((t) => t.id === event.active.id));
      }
      if (event.active.data.current?.status === "ready") {
        setActiveItem(readyItems.find((t) => t.id === event.active.id));
      }
    }

    if (event.active.data.current?.type === "container") {
      setActiveItem(containers.find((t) => t.id === event.active.id));
    }
  };

  const handledDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;
    if (!active || !over) return;
    if (active.id === over.id) return;

    console.log("didn't return early: ");

    // if active element has a status that means its an item
    if (active.data.current?.type === "item") {
      // dragging item
      if (over.data.current?.type === "item") {
        // dragged over another item, check if the status is same for both
        if (active.data.current?.status === over.data.current?.status) {
          // dragged over the same status, just do array move on either todos, or in-progressitems
          if (active.data.current?.status === "todo") {
            const activeIndex = todoItems.findIndex((t) => t.id === active.id);
            const overIndex = todoItems.findIndex((t) => t.id === over.id);
            setTodoItems(arrayMove(todoItems, activeIndex, overIndex));
          }

          if (active.data.current?.status === "in-progress") {
            const activeIndex = inProgressItems.findIndex(
              (t) => t.id === active.id
            );
            const overIndex = inProgressItems.findIndex(
              (t) => t.id === over.id
            );
            setInProgressItems(
              arrayMove(inProgressItems, activeIndex, overIndex)
            );
          }
          //   same status under-review
          if (active.data.current?.status === "under-review") {
            const activeIndex = underReviewItems.findIndex(
              (t) => t.id === active.id
            );
            const overIndex = underReviewItems.findIndex(
              (t) => t.id === over.id
            );
            setUnderReviewItems(
              arrayMove(underReviewItems, activeIndex, overIndex)
            );
          }
          // same status ready
          if (active.data.current?.status === "ready") {
            const activeIndex = readyItems.findIndex((t) => t.id === active.id);
            const overIndex = readyItems.findIndex((t) => t.id === over.id);
            setReadyItems(arrayMove(readyItems, activeIndex, overIndex));
          }
        } else {
          // dragged over a different status/container, remove item from original container and add to new container
          const activeStatus = active.data.current?.status;
          const overStatus = over.data.current?.status;

          if (activeStatus === "todo") {
            // over status in progress
            if (overStatus === "in-progress") {
              const activeIndex = todoItems.findIndex(
                (t) => t.id === active.id
              );
              const overIndex = inProgressItems.findIndex(
                (t) => t.id === over.id
              );
              if (activeIndex < 0 || overIndex < 0) return;
              const updatedItem = { ...todoItems[activeIndex] };

              updatedItem.status = "in-progress";

              setTodoItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
                return updatedItems; // Return the updated array
              });
              setInProgressItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(overIndex, 0, { ...updatedItem }); // Add the element at overIndex
                return updatedItems; // Return the updated array
              });
            }
            // over status in under review
            if (overStatus === "under-review") {
              console.log("todo over underreview");
              const activeIndex = todoItems.findIndex(
                (t) => t.id === active.id
              );
              const overIndex = underReviewItems.findIndex(
                (t) => t.id === over.id
              );

              if (activeIndex < 0 || overIndex < 0) return;
              const updatedItem = { ...todoItems[activeIndex] };

              updatedItem.status = "under-review";
              setTodoItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
                return updatedItems; // Return the updated array
              });
              setUnderReviewItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(overIndex, 0, { ...updatedItem }); // Add the element at overIndex
                return updatedItems; // Return the updated array
              });
            }

            // over status in ready
            if (overStatus === "ready") {
              const activeIndex = todoItems.findIndex(
                (t) => t.id === active.id
              );
              const overIndex = readyItems.findIndex((t) => t.id === over.id);

              if (activeIndex < 0 || overIndex < 0) return;
              const updatedItem = { ...todoItems[activeIndex] };

              updatedItem.status = "ready";
              setTodoItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
                return updatedItems; // Return the updated array
              });
              setReadyItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(overIndex, 0, { ...updatedItem }); // Add the element at overIndex
                return updatedItems; // Return the updated array
              });
            }
          }
          // activestatus is in progress
          if (activeStatus === "in-progress") {
            // over status in progress
            if (overStatus === "todo") {
              const activeIndex = inProgressItems.findIndex(
                (t) => t.id === active.id
              );
              const overIndex = todoItems.findIndex((t) => t.id === over.id);

              if (activeIndex < 0 || overIndex < 0) return;
              const updatedItem = { ...inProgressItems[activeIndex] };
              console.log("active index from in-progress", activeIndex);
              console.log("updated item: ", updatedItem);
              updatedItem.status = "todo";

              setInProgressItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
                return updatedItems; // Return the updated array
              });
              setTodoItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(overIndex, 0, { ...updatedItem }); // Add the element at overIndex
                return updatedItems; // Return the updated array
              });
            }
            // over status in under review
            if (overStatus === "under-review") {
              const activeIndex = inProgressItems.findIndex(
                (t) => t.id === active.id
              );
              const overIndex = underReviewItems.findIndex(
                (t) => t.id === over.id
              );

              if (activeIndex < 0 || overIndex < 0) return;
              const updatedItem = { ...inProgressItems[activeIndex] };
              updatedItem.status = "under-review";

              setInProgressItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
                return updatedItems; // Return the updated array
              });
              setUnderReviewItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(overIndex, 0, { ...updatedItem }); // Add the element at overIndex
                return updatedItems; // Return the updated array
              });
            }
            // over status in ready
            if (overStatus === "ready") {
              const activeIndex = inProgressItems.findIndex(
                (t) => t.id === active.id
              );
              const overIndex = readyItems.findIndex((t) => t.id === over.id);

              if (activeIndex < 0 || overIndex < 0) return;
              const updatedItem = { ...inProgressItems[activeIndex] };
              updatedItem.status = "ready";

              setInProgressItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
                return updatedItems; // Return the updated array
              });
              setReadyItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(overIndex, 0, { ...updatedItem }); // Add the element at overIndex
                return updatedItems; // Return the updated array
              });
            }
          }
          // active status in under review
          if (activeStatus === "under-review") {
            // over status in progress
            if (overStatus === "todo") {
              const activeIndex = underReviewItems.findIndex(
                (t) => t.id === active.id
              );
              const overIndex = todoItems.findIndex((t) => t.id === over.id);

              if (activeIndex < 0 || overIndex < 0) return;
              const updatedItem = { ...underReviewItems[activeIndex] };
              updatedItem.status = "todo";

              setUnderReviewItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
                return updatedItems; // Return the updated array
              });
              setTodoItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(overIndex, 0, { ...updatedItem }); // Add the element at overIndex
                return updatedItems; // Return the updated array
              });
            }
            // over status in in-progress
            if (overStatus === "in-progress") {
              const activeIndex = underReviewItems.findIndex(
                (t) => t.id === active.id
              );
              const overIndex = inProgressItems.findIndex(
                (t) => t.id === over.id
              );

              if (activeIndex < 0 || overIndex < 0) return;
              const updatedItem = { ...underReviewItems[activeIndex] };
              updatedItem.status = "in-progress";

              setUnderReviewItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
                return updatedItems; // Return the updated array
              });
              setInProgressItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(overIndex, 0, { ...updatedItem }); // Add the element at overIndex
                return updatedItems; // Return the updated array
              });
            }
            // over status in ready
            if (overStatus === "ready") {
              const activeIndex = underReviewItems.findIndex(
                (t) => t.id === active.id
              );
              const overIndex = readyItems.findIndex((t) => t.id === over.id);

              if (activeIndex < 0 || overIndex < 0) return;
              const updatedItem = { ...underReviewItems[activeIndex] };
              updatedItem.status = "ready";

              setUnderReviewItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
                return updatedItems; // Return the updated array
              });
              setReadyItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(overIndex, 0, { ...updatedItem }); // Add the element at overIndex
                return updatedItems; // Return the updated array
              });
            }
          }
          // actie status in ready
          if (activeStatus === "ready") {
            // over status in todo
            if (overStatus === "todo") {
              const activeIndex = readyItems.findIndex(
                (t) => t.id === active.id
              );
              const overIndex = todoItems.findIndex((t) => t.id === over.id);

              if (activeIndex < 0 || overIndex < 0) return;
              const updatedItem = { ...readyItems[activeIndex] };
              updatedItem.status = "todo";
              setReadyItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
                return updatedItems; // Return the updated array
              });
              setTodoItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(overIndex, 0, { ...updatedItem }); // Add the element at overIndex
                return updatedItems; // Return the updated array
              });
            }
            //over status in-progress
            if (overStatus === "in-progress") {
              const activeIndex = readyItems.findIndex(
                (t) => t.id === active.id
              );
              const overIndex = inProgressItems.findIndex(
                (t) => t.id === over.id
              );

              if (activeIndex < 0 || overIndex < 0) return;
              const updatedItem = { ...readyItems[activeIndex] };
              updatedItem.status = "in-progress";
              setReadyItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
                return updatedItems; // Return the updated array
              });
              setInProgressItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(overIndex, 0, { ...updatedItem }); // Add the element at overIndex
                return updatedItems; // Return the updated array
              });
            }
            //over status under-review
            if (overStatus === "under-review") {
              const activeIndex = readyItems.findIndex(
                (t) => t.id === active.id
              );
              const overIndex = underReviewItems.findIndex(
                (t) => t.id === over.id
              );

              if (activeIndex < 0 || overIndex < 0) return;
              const updatedItem = { ...readyItems[activeIndex] };
              updatedItem.status = "under-review";
              setReadyItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
                return updatedItems; // Return the updated array
              });
              setUnderReviewItems((prev) => {
                const updatedItems = [...prev]; // Create a shallow copy of the array
                updatedItems.splice(overIndex, 0, { ...updatedItem }); // Add the element at overIndex
                return updatedItems; // Return the updated array
              });
            }
          }
        }
      } else {
        // dragged over a container,
        console.log("dragged over a container: ");
        // get active status type, get container id, remove item from container and add to new container
        // item status is todo
        if (active.data.current?.status === "todo") {
          // container id is in-progress
          if (over.id === "in-progress") {
            // get active index,
            const activeIndex = todoItems.findIndex((t) => t.id === active.id);
            // copy item;
            if (activeIndex < 0) return;
            const updatedItem = { ...todoItems[activeIndex] };
            updatedItem.status = "in-progress";
            // remove item from todo
            setTodoItems((prev) => {
              const updatedItems = [...prev]; // Create a shallow copy of the array
              updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
              return updatedItems; // Return the updated array
            });
            // add item to in-progress
            setInProgressItems((prev) => [...prev, { ...updatedItem }]);
            //
          }
          // container id is under-review
          if (over.id === "under-review") {
            // get active index,
            const activeIndex = todoItems.findIndex((t) => t.id === active.id);
            // copy item;

            if (activeIndex < 0) return;
            const updatedItem = { ...todoItems[activeIndex] };
            updatedItem.status = "under-review";
            // remove item from todo
            setTodoItems((prev) => {
              const updatedItems = [...prev]; // Create a shallow copy of the array
              updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
              return updatedItems; // Return the updated array
            });
            // add item to in-progress
            setUnderReviewItems((prev) => [...prev, { ...updatedItem }]);
            //
          }

          // container id is ready
          if (over.id === "ready") {
            // get active index,
            const activeIndex = todoItems.findIndex((t) => t.id === active.id);
            // copy item;
            if (activeIndex < 0) return;
            const updatedItem = { ...todoItems[activeIndex] };
            updatedItem.status = "ready";
            // remove item from todo
            setTodoItems((prev) => {
              const updatedItems = [...prev]; // Create a shallow copy of the array
              updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
              return updatedItems; // Return the updated array
            });
            // add item to in-progress
            setReadyItems((prev) => [...prev, { ...updatedItem }]);
            //
          }
        }
        // item status is in-progress
        if (active.data.current?.status === "in-progress") {
          // container id is under-review
          if (over.id === "todo") {
            // get active index
            const activeIndex = inProgressItems.findIndex(
              (t) => t.id === active.id
            );
            if (activeIndex < 0) return;
            // copy item
            const updatedItem = { ...inProgressItems[activeIndex] };
            updatedItem.status = "todo";
            // remove item from in-progress
            setInProgressItems((prev) => {
              const updatedItems = [...prev]; // Create a shallow copy of the array
              updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
              return updatedItems; // Return the updated array
            });
            // add item to todo
            setTodoItems((prev) => [...prev, { ...updatedItem }]);
          }
          // container id is ready
          if (over.id === "ready") {
            // get active index
            const activeIndex = inProgressItems.findIndex(
              (t) => t.id === active.id
            );
            if (activeIndex < 0) return;
            // copy item
            const updatedItem = { ...inProgressItems[activeIndex] };
            updatedItem.status = "ready";
            // remove item from in-progress
            setInProgressItems((prev) => {
              const updatedItems = [...prev]; // Create a shallow copy of the array
              updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
              return updatedItems; // Return the updated array
            });
            // add item to todo
            setReadyItems((prev) => [...prev, { ...updatedItem }]);
          }
          //   container is under-review
          if (over.id === "under-review") {
            // get active index
            const activeIndex = inProgressItems.findIndex(
              (t) => t.id === active.id
            );
            if (activeIndex < 0) return;
            // copy item
            const updatedItem = { ...inProgressItems[activeIndex] };
            updatedItem.status = "under-review";
            // remove item from in-progress
            setInProgressItems((prev) => {
              const updatedItems = [...prev]; // Create a shallow copy of the array
              updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
              return updatedItems; // Return the updated array
            });
            // add item to todo
            setUnderReviewItems((prev) => [...prev, { ...updatedItem }]);
          }
        }
        // item status is under-review
        if (active.data.current?.status === "under-review") {
          // container id is todo
          if (over.id === "todo") {
            // get active index
            const activeIndex = underReviewItems.findIndex(
              (t) => t.id === active.id
            );
            if (activeIndex < 0) return;
            // copy item
            const updatedItem = { ...underReviewItems[activeIndex] };
            updatedItem.status = "todo";
            // remove item from under-review
            setUnderReviewItems((prev) => {
              const updatedItems = [...prev]; // Create a shallow copy of the array
              updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
              return updatedItems; // Return the updated array
            });
            // add item to todo
            setTodoItems((prev) => [...prev, { ...updatedItem }]);
          }
          // container id is in-progress
          if (over.id === "in-progress") {
            // get active index
            const activeIndex = underReviewItems.findIndex(
              (t) => t.id === active.id
            );
            if (activeIndex < 0) return;
            // copy item
            const updatedItem = { ...underReviewItems[activeIndex] };
            updatedItem.status = "in-progress";
            // remove item from under-review
            setUnderReviewItems((prev) => {
              const updatedItems = [...prev]; // Create a shallow copy of the array
              updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
              return updatedItems; // Return the updated array
            });
            // add item to in-progress
            setInProgressItems((prev) => [...prev, { ...updatedItem }]);
          }
          // container id is ready
          if (over.id === "ready") {
            // get active index
            const activeIndex = underReviewItems.findIndex(
              (t) => t.id === active.id
            );
            if (activeIndex < 0) return;
            // copy item
            const updatedItem = { ...underReviewItems[activeIndex] };
            updatedItem.status = "ready";
            // remove item from under-review
            setUnderReviewItems((prev) => {
              const updatedItems = [...prev]; // Create a shallow copy of the array
              updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
              return updatedItems; // Return the updated array
            });
            // add item to ready
            setReadyItems((prev) => [...prev, { ...updatedItem }]);
          }
        }

        // item status is ready
        if (active.data.current?.status === "ready") {
          // container id is todo
          if (over.id === "todo") {
            // get active index
            const activeIndex = readyItems.findIndex((t) => t.id === active.id);
            // copy item
            if (activeIndex < 0) return;
            const updatedItem = { ...readyItems[activeIndex] };
            updatedItem.status = "todo";
            // remove item from ready
            setReadyItems((prev) => {
              const updatedItems = [...prev]; // Create a shallow copy of the array
              updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
              return updatedItems; // Return the updated array
            });
            // add item to todo
            setTodoItems((prev) => [...prev, { ...updatedItem }]);
          }
          // container id is in-progress
          if (over.id === "in-progress") {
            // get active index
            const activeIndex = readyItems.findIndex((t) => t.id === active.id);
            // copy item
            if (activeIndex < 0) return;
            const updatedItem = { ...readyItems[activeIndex] };
            updatedItem.status = "in-progress";
            // remove item from ready
            setReadyItems((prev) => {
              const updatedItems = [...prev]; // Create a shallow copy of the array
              updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
              return updatedItems; // Return the updated array
            });
            // add item to in-progress
            setInProgressItems((prev) => [...prev, { ...updatedItem }]);
          }
          // container id is under-review
          if (over.id === "under-review") {
            // get active index
            const activeIndex = readyItems.findIndex((t) => t.id === active.id);
            // copy item
            if (activeIndex < 0) return;
            const updatedItem = { ...readyItems[activeIndex] };
            updatedItem.status = "under-review";
            // remove item from ready
            setReadyItems((prev) => {
              const updatedItems = [...prev]; // Create a shallow copy of the array
              updatedItems.splice(activeIndex, 1); // Remove the element at activeIndex
              return updatedItems; // Return the updated array
            });
            // add item to under-review
            setUnderReviewItems((prev) => [...prev, { ...updatedItem }]);
          }
        }
      }
    } else {
      // dragging container,

      //   get index of active and over and perform arraymove
      const activeContainerIndex = containers.findIndex(
        (c) => c.id === active.id
      );
      if (
        over.id === "todo" ||
        over.id === "in-progress" ||
        over.id === "under-review" ||
        over.id === "ready"
      ) {
        const overContainerIndex = containers.findIndex(
          (c) => c.id === over.id
        );
        console.log(
          "active: ",
          activeContainerIndex,
          "over: ",
          overContainerIndex
        );
        setContainers(
          arrayMove(containers, activeContainerIndex, overContainerIndex)
        );
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("drag end: ", event);
    setActiveId(null);
    setActiveItem(null);
    setActiveType(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragMove={handledDragMove}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <div className="grid grid-cols-4 gap-3">
        <SortableContext items={containers.map((c) => c.id)}>
          {containers.map((container) => (
            <NewContainer
              setTodoItems={setTodoItems}
              key={container.id}
              container={container}
              isDragging={activeId === container.id}
            >
              <SortableContext
                items={
                  container.id === "todo"
                    ? todoItems
                    : container.id === "in-progress"
                    ? inProgressItems
                    : container.id === "under-review"
                    ? underReviewItems
                    : container.id === "ready"
                    ? readyItems
                    : []
                }
              >
                {container.id === "todo" &&
                  todoItems.map((item, index) => (
                    <Task
                      isDragging={activeId === item.id}
                      key={index}
                      item={item}
                    />
                  ))}

                {container.id === "in-progress" &&
                  inProgressItems.map((item, index) => (
                    <Task
                      isDragging={activeId === item.id}
                      key={index}
                      item={item}
                    />
                  ))}

                {container.id === "under-review" &&
                  underReviewItems.map((item, index) => (
                    <Task
                      isDragging={activeId === item.id}
                      key={index}
                      item={item}
                    />
                  ))}

                {container.id === "ready" &&
                  readyItems.map((item, index) => (
                    <Task
                      isDragging={activeId === item.id}
                      key={index}
                      item={item}
                    />
                  ))}
              </SortableContext>
            </NewContainer>
          ))}
        </SortableContext>
      </div>
      <DragOverlay adjustScale={false}>
        {activeId && activeType === "item" && activeItem?.id && (
          <Task
            isOverlay={true}
            isDragging={false}
            item={activeItem as itemType}
          />
        )}

        {activeId && activeType === "container" && (
          <NewContainer
            setTodoItems={setTodoItems}
            container={activeItem as containerType}
            isDragging={false}
          >
            {activeItem?.id === "todo" &&
              todoItems.map((item, index) => (
                <Task isDragging={false} key={index} item={item} />
              ))}
            {activeItem?.id === "in-progress" &&
              inProgressItems.map((item, index) => (
                <Task isDragging={false} key={index} item={item} />
              ))}
            {activeItem?.id === "under-review" &&
              underReviewItems.map((item, index) => (
                <Task isDragging={false} key={index} item={item} />
              ))}
            {activeItem?.id === "ready" &&
              readyItems.map((item, index) => (
                <Task isDragging={false} key={index} item={item} />
              ))}
          </NewContainer>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Dnd;
