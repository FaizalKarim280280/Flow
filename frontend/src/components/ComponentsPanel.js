import React from 'react';
import { useState, Fragment } from 'react';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

export function ComponentsPanel({ handleAddConv1d, handleAddConv2d, handleAddLinear, handleClearAll }) {

    const [open, setOpen] = useState(1);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <div className='flex-none border bg-gray-50' style={{ "width": "15%" }}>
            <div className='px-2 py-2'>
                <h3 className='text-md'>Components</h3>
                <hr className="h-px border bg-gray-200 mt-2" />

                <Fragment>
                    <Accordion open={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)}>
                            What is Material Tailwind?
                        </AccordionHeader>
                        <AccordionBody>
                            We&apos;re not always in the position that we want to be at.
                            We&apos;re constantly growing. We&apos;re constantly making mistakes.
                            We&apos;re constantly trying to express ourselves and actualize our
                            dreams.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)}>
                            How to use Material Tailwind?
                        </AccordionHeader>
                        <AccordionBody>
                            We&apos;re not always in the position that we want to be at.
                            We&apos;re constantly growing. We&apos;re constantly making mistakes.
                            We&apos;re constantly trying to express ourselves and actualize our
                            dreams.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 3}>
                        <AccordionHeader onClick={() => handleOpen(3)}>
                            What can I do with Material Tailwind?
                        </AccordionHeader>
                        <AccordionBody>
                            We&apos;re not always in the position that we want to be at.
                            We&apos;re constantly growing. We&apos;re constantly making mistakes.
                            We&apos;re constantly trying to express ourselves and actualize our
                            dreams.
                        </AccordionBody>
                    </Accordion>
                </Fragment>
            </div>
        </div>
    );
}
