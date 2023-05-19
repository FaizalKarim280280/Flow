import React from 'react'
import { Handle, Position } from 'reactflow';

export default function outputLayer(props) {

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
                
            </div>

            <p className=''>{props.id}</p>

        </>
    )
}
