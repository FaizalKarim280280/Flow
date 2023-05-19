import React from 'react';

export function ComponentsPanel({ handleAddConv1d, handleAddConv2d, handleAddLinear, handleClearAll }) {
    return (
        <div className='flex-none border bg-gray-50' style={{ "width": "15%" }}>
            <div className='px-2 py-2'>
                <h3 className='text-md'>Components</h3>
                <hr className="h-px border bg-gray-200 mt-2" />


                <div class="collapse">
                    <input type="checkbox" />
                    <div class="collapse-title text-xl font-medium">
                        Click me to show/hide content
                    </div>
                    <div class="collapse-content">
                        <p>hello</p>
                    </div>
                </div>

                {/* <div className='py-8'>
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
