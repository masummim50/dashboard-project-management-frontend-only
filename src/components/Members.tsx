import React from 'react';

const members = [
    {name: 'Cecil White', time: '08:45:33 for this week'},
    {name: 'John Doe', time: '02:45:33 for this week'},
    {name: 'Kevin Robinson', time: '06:45:33 for this week'},
    {name: 'Brown Hill', time: '03:45:33 for this week'},
]

const Members = () => {
    return (
        <div>
            <div className="flex justify-between items-center text-white my-4">
                <p>Members</p>
                <div className='size-10 flex items-center justify-center rounded-full shadow-[1px_1px_4px_black_inset,-1px_-1px_4px_gray_inset] font-bold'>+</div>
            </div>
            {
                members.map((member, i)=> (
                    <div key={i} className="py-2 px-2 flex items-center mb-2 gap-1 rounded-xl shadow-[1px_1px_4px_black_inset,-1px_-1px_4px_gray_inset]">
                        <img src={`/${i}.jpg`} alt="" className='size-6 rounded-full' />
                        <div className="flex flex-col text-white">
                            <p className='text-xs'>{member.name}</p>
                            <p className='text-[8px]'>{member.time}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Members;