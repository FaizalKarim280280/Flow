import React from 'react';
import { useState, Fragment } from 'react';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

export function ComponentsPanel({ handleAddConv1d, handleAddConv2d, handleAddLinear, handleClearAll, handleAddInput, handleAddOutput, handleAddMaxpool1d, handleAddMaxpool2d, handleAddBatchNorm1d, handleAddBatchNorm2d}) {

    const [open, setOpen] = useState(1);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <div className='flex-none border bg-gray-50' style={{ "width": "17%" }}>
            
            <div className='px-2 py-2'>
                <h3 className='text-xl'>Components</h3>
                <hr className="h-px border bg-gray-200 mt-2" />

                <Fragment>
                    <Accordion open={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)}>
                            General
                        </AccordionHeader>
                        <AccordionBody>
                        <button
                        className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2'
                        onClick={handleAddInput}
                    >
                        Input
                    </button>
                    <button
                        className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2'
                        onClick={handleAddOutput}
                    >
                        Output
                    </button>
                        <button
                        className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2'
                        onClick={handleAddLinear}
                    >
                        Linear
                    </button>
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)}>
                            1D
                        </AccordionHeader>
                        <AccordionBody>
                        <button
                        className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2'
                        onClick={handleAddConv1d}
                    >
                        Conv1D
                    </button>
                    <button
                        className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2'
                        onClick={handleAddMaxpool1d}
                    >
                        MaxPool1D
                    </button>
                    <button
                        className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2'
                        onClick={handleAddBatchNorm1d}
                    >
                        BatchNorm1D
                    </button>
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 3}>
                        <AccordionHeader onClick={() => handleOpen(3)}>
                            2D
                        </AccordionHeader>
                        <AccordionBody>
                        <button
                        className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2'
                        onClick={handleAddConv2d}
                    >
                        Conv2D
                    </button>
                    <button
                        className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2'
                        onClick={handleAddMaxpool2d}
                    >
                        MaxPool2D
                    </button>
                    <button
                        className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2'
                        onClick={handleAddBatchNorm2d}
                    >
                        BatchNorm2D
                    </button>
                        </AccordionBody>
                    </Accordion>
                </Fragment>
                <div className='flex flex-row justify-center p-4'>
                <button
                        className='bg-transparent hover:bg-red-500 text-neutral-700 font-semibold hover:text-white py-2 px-4 border border-neutral-500 hover:border-transparent rounded m-2'
                        onClick={handleClearAll}
                    >
                        Clear All
                    </button>
                </div>
                
            </div>
        </div>
    );
}
