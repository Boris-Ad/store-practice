export const TableSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="p-3 grid grid-cols-[40px_repeat(6,1fr)] border-b">
        <div className="" />
        <div className="w-24 h-4 rounded-full bg-slate-400" />
        <div className="" />
        <div className="w-24 h-4 rounded-full bg-slate-400" />
        <div className="w-24 h-4 rounded-full bg-slate-400" />
        <div className="w-24 h-4 rounded-full bg-slate-400" />
        <div className="" />
      </div>
      {Array.from(new Array(4).keys()).map(item => (
        <div key={item} className="p-3 grid grid-cols-[40px_repeat(6,1fr)] content-center items-center border-b last:border-0">
          <div className="w-6 h-6 rounded-full bg-slate-400" />
          <div className="w-24 h-4 rounded-full bg-slate-400" />
          <div className="" />
          <div className="w-24 h-4 rounded-full bg-slate-400" />
          <div className="w-24 h-4 rounded-full bg-slate-400" />
          <div className="w-24 h-4 rounded-full bg-slate-400" />
          <div className="w-4 h-6 rounded-full bg-slate-400 ml-auto" />
        </div>
      ))}
    </div>
  );
};
