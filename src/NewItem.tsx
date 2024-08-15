import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { todoType } from './New';
import {CSS} from '@dnd-kit/utilities'

const NewItem = ({item, index, activeId, containerId}:{item:todoType, index:number, activeId:number|null,containerId:number}) => {
    const {setNodeRef, attributes, listeners, transform, transition} = useSortable({id:item.id, data:{index:index, type:'item', data:item, containerId}});
    const style = {transform: CSS.Transform.toString(transform), transition};

    return (
        <div  style={style} ref={setNodeRef} {...attributes} {...listeners}>
            <p className={`p-4 border border-gray-400 rounded-md mb-2 bg-white/40 ${activeId === item.id ? 'opacity-50' : ''}`}>{item.title}</p>
        </div>
    );
};

export default NewItem;