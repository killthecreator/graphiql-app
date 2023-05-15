import { type NextPage } from "next";
import Link from "next/link";
import { Button } from "~/components/ui";

const Custom404: NextPage = () => {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <Button>
        <Link href="/">Go to Homepage</Link>
      </Button>
    </>
  );
};

export default Custom404;
