import { PropsWithChildren } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui";

type CustomCardProps = {
  title?: string;
  description?: string;
}

export const CustomCard = (props: PropsWithChildren<CustomCardProps>) => (
  <Card className="sm:min-w-6/12 grow">
    <CardHeader>
      <CardTitle>{props.title}</CardTitle>
      <CardDescription>{props.description}</CardDescription>
    </CardHeader>
    <CardContent>{props.children}</CardContent>
  </Card>
);
