import { type NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
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
    <>
      <Head>
        <title>404</title>
      </Head>
      <section className="flex h-full grow flex-col items-center justify-center">
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
    </>
  );
};

export default Custom404;
