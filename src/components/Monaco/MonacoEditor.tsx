import dynamic from 'next/dynamic';
import { Skeleton } from "~/components/ui/";

export const MonacoEditor = dynamic(() => import('~/monaco').then(module => module.MonacoEditor), {
  ssr: false,
  loading: () => (<div className="space-y-2">
        <Skeleton className="h-4 w-[220px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[180px]" />
    </div>),
});
