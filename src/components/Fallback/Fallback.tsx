import { FallbackProps } from "react-error-boundary";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"

export const Fallback = ({ error }: FallbackProps) => (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full h-full flex items-center justify-center">
        <div className="h-[100vh] grow">
          <Button variant="outline">Error</Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Error has happened on the page</AlertDialogTitle>
          <AlertDialogDescription>
            {error.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Link href='/'><AlertDialogAction>Go To Welcome Page</AlertDialogAction></Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
