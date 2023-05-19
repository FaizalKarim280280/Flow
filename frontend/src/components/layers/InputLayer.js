import React from 'react'
import { Handle, Position } from 'reactflow';

export default function InputLayer(props) {

    return (

        <>
            <Handle type="source" position={Position.Left} id='left' />
            <Handle type="target" position={Position.Right} />

            <div
                style={{
                    width: '50px',
                    height: '300px',
                    background: '#388E3C',
                    border: '1px solid',
                    borderColor: '#388E3C',
                    borderRadius: '5px',
                    opacity: props.data['opacity'],
                }}>

                <div className='flex flex-column justify-center'>
                    <p className='p-1'>{props.id}</p>
                </div>
                
            </div>

        </>
    )
}
