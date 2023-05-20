import React from "react";

import { useAppSelector } from "~/rtk";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "~/components/ui";

const SchemaDoc = () => {

  const { schema } = useAppSelector((state) => state);
  return (
    <div className="relative h-[900px] overflow-hidden py-10">
      {schema.isSchema && (
        <>
        <div className="font-bold text-3xl my-4">Types</div>
        <ul>
          {schema.isSchema && schema.schema?.__schema.types.map((el, ind) => (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>{el.name}</AccordionTrigger>
                <AccordionContent className="p-1">
                  <div className="text-base italic">{el.kind}</div>
                  <div className="text-sm my-2">{el.description}</div>
                    {el.fields && <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Feilds</AccordionTrigger>
                          <AccordionContent className="p-1">
                            <ul>
                              {el.fields.map((field, index) => (
                                <li key={index}>
                                  <div>{field.name}</div>
                                  <div>{field.description}</div>
                                  {field.isDeprecated && <div>Deprecated!</div>}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>}
                      {el.enumValues && <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Enum Values</AccordionTrigger>
                          <AccordionContent className="p-1">
                            <ul>
                              {el.enumValues.map((val, index) => (
                                <li key={index}>
                                  <div>{val.name}</div>
                                  <div>{val.description}</div>
                                  {val.isDeprecated && <div>Deprecated!</div>}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>}
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
