import React, { useState } from 'react';

export function NodeProperties({ selectedNode }) {
    const [parameters, setParameters] = useState(selectedNode?.parameters || {});

    const handleInputChange = (e, key) => {
        const { value } = e.target;
        setParameters((prevParameters) => ({
            ...prevParameters,
            [key]: value,
        }));
    };

    if (!selectedNode) {
        return <div>No node selected.</div>;
    }

    const { id, type } = selectedNode;

    return (
        <div>
            <h3 className='text-2xl py-4'>Properties</h3>
            <p>ID: {id}</p>
            <p>Type: {type}</p>
            <h4>Parameters:</h4>
            <ul>
                {Object.entries(parameters).map(([key, value]) => (
                    <li key={key}>
                        {key}:
                        <input
                            type='text'
                            value={value}
                            onChange={(e) => handleInputChange(e, key)}
                            className='bg-gray-200'
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
