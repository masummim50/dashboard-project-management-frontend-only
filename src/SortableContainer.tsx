
import { containerType } from "./New";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import NewItem from "./NewItem";

const SortableContainer = ({
  container,
  index,
  activeId
}: {
  container: containerType;
  index: number;
  activeId:number | null
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: container.id,
      data: { index, type: "container", data: container },
    });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div
      style={style}
      className={`min-h-[300px] col-span-1 border-green-400 rounded-md border bg-green-100 ${activeId === container.id ? 'opacity-50' : ''}`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <SortableContext items={container.items}>
        {container.items.map((item, index) => (
          <NewItem activeId={activeId} key={index} item={item} index={index} containerId={container.id}/>
        ))}
      </SortableContext>
    </div>
  );
};

export default SortableContainer;
