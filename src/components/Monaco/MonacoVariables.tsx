import dynamic from 'next/dynamic';

export const MonacoVariables = dynamic(() => import('~/monaco').then(module => module.MonacoVariables), {
  ssr: false,
  loading: () => (<></>),
});
