import { Separator } from '@/components/ui/separator';
import { Image as LucideImage } from 'lucide-react';

export const CategoriesSkeleton = () => {
  return (
    <div className="h-40 p-2 border border-slate-400 rounded flex gap-3">
      <div className="h-full aspect-[3/2] border border-slate-400 rounded grid place-content-center cursor-pointer">
        <div className="w-36 h-4 rounded-full bg-slate-300 animate-pulse" />
      </div>
      <Separator className="bg-slate-400" orientation="vertical" />
      <div className="h-full aspect-[3/2] border border-slate-400 bg-slate-300 rounded grid place-content-center cursor-pointer">
        <LucideImage className='text-slate-400' />
      </div>
      <div className="h-full aspect-[3/2] border border-slate-400 bg-slate-300 rounded grid place-content-center cursor-pointer">
        <LucideImage className='text-slate-400' />
      </div>
      <div className="h-full aspect-[3/2] border border-slate-400 bg-slate-300 rounded grid place-content-center cursor-pointer">
        <LucideImage className='text-slate-400' />
      </div>
    </div>
  );
};
