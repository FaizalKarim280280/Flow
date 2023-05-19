import React from 'react';

export function NodeProperties({ selectedNode, paramValues, handleParamChange }) {
    if (!selectedNode) {
        return <div className='flex-none border bg-gray-50' style={{ "width": "15%"}}>No node selected.</div>;
    }

    // Extract the properties of the selected node
    const { id, type, data, parameters } = selectedNode;

    return (
        <div className='flex-none border bg-gray-50' style={{ "width": "15%"}}>

            <h3 className='text-2xl py-4'>Properties</h3>
            <p className='mt-4'>ID: {id}</p>
            <p className='mt-4'>Type: {type}</p>
            <h4 className='mt-4'>Parameters:</h4>
            {Object.entries(parameters).map(([paramName, _]) => (
                <div key={paramName} className='mt-4'>
                    <label htmlFor={paramName}>{paramName}:</label>
                    <input
                        className='bg-gray-200'
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
