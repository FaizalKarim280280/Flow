import React from 'react'
import ReactFlow, { Controls, Background, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { useState, useCallback } from 'react';
import Conv1d from './layers/Conv1d';
import Conv2d from './layers/Conv2d';
import Linear from './layers/Linear';

// define the node types
const nodeTypes = {
    conv1d: Conv1d,
    conv2d: Conv2d,
    linear: Linear
}

// store the number of each layers to use it later for ids
let nums = {
    conv1d: 1,
    conv2d: 1,
    linear: 1
}

const Flow = () => {

    // list of sample nodes
    const initialNodes = [];

    const initialEdges = [
        // { id: 'edge-1', source: '2', target: '1', sourceHandle: 'left'}
    ];


    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    // when a node is dragged or selected
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );

    // when edges are changed
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    // connecting nodes manually
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const handleOnClick = () => {
        console.log(edges);
    }
    const [conv1dCount, setConv1dCount] = useState(2);
    const [conv2dCount, setConv2dCount] = useState(2);
    const [linearCount, setLinearCount] = useState(2);

    // button to add new conv1d layer
    const handleAddConv1d = () => {
        setConv1dCount((prevCount) => prevCount + 1);
        const id = 'conv1d_' + conv1dCount;

        setNodes((prev) => [
            ...prev,
            {
                id: id,
                position: { x: 0, y: 0 },
                type: 'conv1d',
                data: { opacity: '0.8' },
            },
        ]);
    };



    const handleAddConv2d = () => {
        setConv2dCount((prevCount) => prevCount + 1);
        const id = 'conv2d_' + conv2dCount;

        setNodes((prev) => [
            ...prev,
            {
                id: id,
                position: { x: 0, y: 0 },
                type: 'conv2d',
                data: { opacity: '0.8' },
            },
        ]);
    };

    const handleAddLinear = () => {
        setLinearCount((prevCount) => prevCount + 1);
        const id = 'linear_' + linearCount;

        setNodes((prev) => [
            ...prev,
            {
                id: id,
                position: { x: 0, y: 0 },
                type: 'linear',
                data: { opacity: '0.8' },
            },
        ]);
    };


    // when a node is dragged reduce its opacity to 0.5
    const handleOnNodeDragStart = (event, node) => {
        node.data['opacity'] = 0.5;
    }

    // when dragging is stopped, revert back to the previous value
    const handleOnNodeDragStop = (event, node) => {
        node.data['opacity'] = 0.8;
    }

    const handleClearAll = () => {
        setNodes([]);
        setEdges([]);
        setConv1dCount(1);
        setConv2dCount(1);
        setLinearCount(1);
        nums = {
            conv1d: 1,
            conv2d: 1,
            linear: 1,
        };
    };


    return (
        <>
        <div className='flex-none border-2 border-black px-8'>

            <div className='flex flex-col items-center justify-center'>
                Components
                {/*<div className='py-8'>*/}
                {/*    <button*/}
                {/*        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'*/}
                {/*        onClick={handleOnClick}>*/}
                {/*        Button*/}
                {/*    </button>*/}
                {/*</div>*/}
                <div className='py-8'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleAddConv1d}
                    >
                        Add Conv1d
                    </button>
                </div>
                <div className='py-8'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleAddConv2d}
                    >
                        Add Conv2d
                    </button>
                </div>
                <div className='py-8'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleAddLinear}
                    >
                        Add Linear
                    </button>
                </div>
                <div className='py-8'>
                    <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleClearAll}
                    >
                        Clear All
                    </button>
                </div>
            </div>


        </div>
        <div className='flex-grow'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onNodeDragStart={handleOnNodeDragStart}
                onNodeDragStop={handleOnNodeDragStop}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
        </>
    )
};

export default Flow;


