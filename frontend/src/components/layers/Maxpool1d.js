import React from 'react'
import { Handle, Position } from 'reactflow';

export default function Maxpool1d(props) {

    return (

        <>

            <Handle type="source" position={Position.Left} id='left' />
            <Handle type="target" position={Position.Right} />

            <div
                style={{
                    width: '150px',
                    height: '30px',
                    background: '#009688',
                    borderRadius: '5px',
                    opacity: props.data['opacity'],
                    border: '1px solid #009688',
                    // boxShadow: '#4DB6AC 5px -5px, #80CBC4 10px -10px, #B2DFDB 15px -15px, #B2EBF2 20px -20px, #E0F2F1 25px -25px'
                }}>

                <p className='text-center'>{props.id}</p>

            </div>
        </>
    )
}
