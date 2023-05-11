import dynamic from 'next/dynamic';
import GraphqlResponseSkeleton from "~/components/ui/graphqlResponseSkeleton";

export const Monaco = dynamic(() => import('~/monaco').then(module => module.MonacoEditor), {
  ssr: false,
  loading: () => (<GraphqlResponseSkeleton />),
});
