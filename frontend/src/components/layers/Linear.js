import React from 'react'
import { Handle, Position } from 'reactflow';

export default function Linear(props) {

    return (

        <>

            <Handle type="source" position={Position.Left} id='left' />
            <Handle type="target" position={Position.Right} />

            <div
                style={{
                    width: '80px',
                    height: '300px',
                    background: '#B39DDB',
                    border: '1px solid',
                    borderColor: '#512DA8',
                    borderRadius: '5px',
                    opacity: props.data['opacity'],
                }}>

                <div className='flex flex-column justify-center'>
                    <p className='p-1'>{props.id}</p>
                </div>
                
            </div>

            {/* <p className=''>Linear</p> */}


        </>
    )
}
