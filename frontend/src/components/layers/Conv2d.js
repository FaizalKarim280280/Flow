import React from 'react'
import { Handle, Position } from 'reactflow';

export default function Conv2d(props) {

    return (

        <>
            <Handle type="source" position={Position.Left} id='left' />
            <Handle type="target" position={Position.Right} />

            <div style={{
                width: '120px',
                height: '120px',
                background: '#00ACC1',
                borderRadius: '3px',
                opacity: props.data.opacity,
                border: '1px solid #00ACC1',
                boxShadow: '#26C6DA 5px -5px, #4DD0E1 10px -10px, #80DEEA 15px -15px, #B2EBF2 20px -20px, #E0F7FA 25px -25px'
            }}>

                <h1 className='text-center p-2'>{props.id}</h1>

            </div>

        </>
    )
}
