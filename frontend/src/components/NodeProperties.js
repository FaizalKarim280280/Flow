import React from 'react';

export function NodeProperties({ selectedNode, paramValues, handleParamChange }) {

    if (!selectedNode) {
        return <div className='flex-none border bg-gray-50' style={{ "width": "15%"}}>No node selected.</div>;
    }

    // Extract the properties of the selected node
    const { id, type, data, parameters } = selectedNode;

    return (
        <div className='flex-none border bg-gray-50 px-2 py-2 text-sm' style={{ "width": "18%"}}>

            <h3 className='text-xl'>Properties</h3>
            <hr className="h-px border bg-gray-200 mt-2" />
            <p className='mt-4'>ID: {id}</p>
            <h4 className='mt-4'>Parameters:</h4>
            {Object.entries(parameters).map(([paramName, _]) => (
                <div key={paramName} className='mt-4 flex items-center justify-around'>
                    <label htmlFor={paramName} className='w-40'>{paramName}:</label>
                    <input
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        type='text'
                        id={paramName}
                        value={paramValues[id][paramName] || ''}
                        onChange={(e) => handleParamChange(id, paramName, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
}
