import { PropsWithChildren } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui";

type CustomCardProps = {
  title?: string;
  description?: string;
}

export const CustomCard = (props: PropsWithChildren<CustomCardProps>) => (
  <Card className="sm:w-6/12">
    <CardHeader>
      <CardTitle>{props.title}</CardTitle>
      <CardDescription>{props.description}</CardDescription>
    </CardHeader>
    <CardContent>{props.children}</CardContent>
  </Card>
);
