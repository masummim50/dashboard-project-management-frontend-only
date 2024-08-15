

const TaskMembers = ({ members }: { members: number[] }) => {
  const lefts = ["left-[0px]", "left-[20px]", "left-[40px]"];
  return (
    <div className="relative  h-[28px] w-[40px]">
      {[...members].slice(0, 3).map((m, i) => (
        <img
          className={`border-[1px] border-black size-7 w-[28px] h-[28px] rounded-full z-[1] absolute block top-0 left-[${
            i * 20
          }px]`}
          src={`/${m}.jpg`}
        />
      ))}
      {members.slice(3).length > 0 && (
        <div className="size-7 bg-sky-600 absolute top-0 left-[60px] rounded-full font-bold text-xs justify-center border-[1px] border-black text-white flex items-center">
          +{members.slice(3).length}
        </div>
      )}
    </div>
  );
};

export default TaskMembers;
