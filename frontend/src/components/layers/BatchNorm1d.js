import React from 'react'
import { Handle, Position } from 'reactflow';

export default function BatchNorm1d(props) {

    return (

        <>
            <Handle type="source" position={Position.Left} id='left' />
            <Handle type="target" position={Position.Right} />

            <div style={{
                width: '150px',
                height: '30px',
                background: '#E53935',
                borderRadius: '3px',
                opacity: props.data.opacity,
                border: '1px solid #E53935',
                boxShadow: '#D32F2F 5px -5px, #E57373 10px -10px, #EF9A9A 15px -15px, #FFCDD2 20px -20px, #FFEBEE 25px -25px'
            }}>

                <h1 className='text-center p-2'>{props.id}</h1>

            </div>

        </>
    )
}
