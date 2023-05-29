import dynamic from "next/dynamic";
import { Skeleton } from "~/components/ui/";

export const MonacoResponse = dynamic(
  () => import("~/monaco").then((module) => module.MonacoResponse),
  {
    ssr: false,
    loading: () => <Skeleton className="h-4 w-[250px]" />,
  }
);
