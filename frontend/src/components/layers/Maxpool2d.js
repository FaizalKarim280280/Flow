import React from 'react'
import { Handle, Position } from 'reactflow';

export default function Maxpool2d(props) {

    return (

        <>
            <Handle type="source" position={Position.Left} id='left' />
            <Handle type="target" position={Position.Right} />

            <div style={{
                width: '110px',
                height: '110px',
                background: '#4DD0E1',
                borderRadius: '5px',
                opacity: props.data.opacity,
                border: '1px solid #4DD0E1',
            }}>
                <h1 className='text-center'>{props.id}</h1>

            </div>
            
        </>
    )
}
