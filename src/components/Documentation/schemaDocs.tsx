import React from "react";

import { useAppSelector } from "~/rtk";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui";

const SchemaDoc = () => {
  const { schema } = useAppSelector((state) => state);
  return (
    <div className="relative py-10">
      {schema.isSchema && (
        <>
          <div className="my-4 text-3xl font-bold">Types</div>
          <ul>
            {schema.isSchema &&
              schema.schema?.__schema.types.map((el, ind) => (
                <Accordion type="single" collapsible key={ind}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{el.name}</AccordionTrigger>
                    <AccordionContent className="p-1">
                      <div className="text-base italic">{el.kind}</div>
                      <div className="my-2 text-sm">{el.description}</div>
                      {el.fields && (
                        <Accordion type="single" collapsible>
                          <AccordionItem value="item-1">
                            <AccordionTrigger>Feilds</AccordionTrigger>
                            <AccordionContent className="p-1">
                              <ul className="gap-4">
                                {el.fields.map((field, index) => (
                                  <li key={index} className="gap-2">
                                    <div className="font-semibold">
                                      {field.name}
                                    </div>
                                    <div>{field.description}</div>
                                    {field.isDeprecated && (
                                      <div>Deprecated!</div>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                      {el.enumValues && (
                        <Accordion type="single" collapsible>
                          <AccordionItem value="item-1">
                            <AccordionTrigger>Enum Values</AccordionTrigger>
                            <AccordionContent className="p-1">
                              <ul className="gap-4">
                                {el.enumValues.map((val, index) => (
                                  <li key={index} className="gap-2">
                                    <div className="font-semibold">
                                      {val.name}
                                    </div>
                                    <div>{val.description}</div>
                                    {val.isDeprecated && <div>Deprecated!</div>}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SchemaDoc;
