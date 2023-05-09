import dynamic from 'next/dynamic';

export const Monaco = dynamic(() => import('~/graphql/graphql').then(module => module.Monaco), {
  ssr: false,
  loading: () => <div>Loading ...</div>
});
