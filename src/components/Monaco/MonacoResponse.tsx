import dynamic from 'next/dynamic';

export const MonacoResponse = dynamic(() => import('~/monaco').then(module => module.MonacoResponse), {
  ssr: false,
  loading: () => (<></>),
});
