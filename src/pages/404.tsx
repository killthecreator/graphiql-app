import { type NextPage } from "next";
import Link from "next/link";
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui";

const Custom404: NextPage = () => {
  return (
    <section className="flex flex-col items-center h-full grow justify-center">
      <Card className="">
      <CardHeader>
        <CardTitle>404</CardTitle>
        <CardDescription>Page Not Found</CardDescription>
      </CardHeader>
            <CardFooter>
        <Button className="w-full">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </CardFooter>
    </Card>
    </section>
  );
};

export default Custom404;
