import dynamic from 'next/dynamic';

export const Monaco = dynamic(() => import('~/monaco').then(module => module.MonacoEditor), {
  ssr: false,
  loading: () => <div>Loading ...</div>
});
