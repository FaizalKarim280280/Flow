import React from 'react';

export function ComponentsPanel({ handleAddConv1d, handleAddConv2d, handleAddLinear, handleClearAll }) {
    return (

        <div className='flex-none border-2 border-black px-8'>
            <div className='flex flex-col items-center justify-center'>
                <h3 className='text-2xl py-4'>Components</h3>

                <div className='py-8'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleAddConv1d}
                    >
                        Add Conv1d
                    </button>
                </div>
                <div className='py-8'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleAddConv2d}
                    >
                        Add Conv2d
                    </button>
                </div>
                <div className='py-8'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleAddLinear}
                    >
                        Add Linear
                    </button>
                </div>
                <div className='py-8'>
                    <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleClearAll}
                    >
                        Clear All
                    </button>
                </div> */}
            </div>
        </div>
    );
}
