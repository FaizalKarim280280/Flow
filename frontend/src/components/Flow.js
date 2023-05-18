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

export default function Flow() {

    // list of sample nodes
    const initialNodes = [
        {
            id: 'conv1d_' + nums['conv1d'],
            position: { x: 0, y: 0 },
            type: 'conv1d',
            data: { opacity: 0.8 }

        },
        {
            id: 'conv2d_' + nums['conv2d'],
            position: { x: 100, y: 100 },
            type: 'conv2d',
            data: { opacity: 0.8 }
        },

        {
            id: 'linear',
            position: { x: 200, y: 100 },
            type: 'linear',
            data: { opacity: 0.8 }
        },
    ];



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

    // button to add new conv1d layer
    const handleAddConv1d = () => {
        nums['conv1d'] += 1;
        const id = 'conv1d_' + nums['conv1d']

        setNodes((prev) => [...prev, {
            id: id,
            position: { x: 300, y: 300 },
            type: 'conv1d'
        }])
    }

    // when a node is dragged reduce its opacity to 0.5
    const handleOnNodeDragStart = (event, node) => {
        node.data['opacity'] = 0.5;
    }

    // when dragging is stopped, revert back to the previous value
    const handleOnNodeDragStop = (event, node) => {
        node.data['opacity'] = 0.8;
    }




    return (
        <div style={{ height: "600px" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onNodeDragStart={handleOnNodeDragStart}
                onNodeDragStop={handleOnNodeDragStop}>
                <Background />
                <Controls />
            </ReactFlow>

            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleOnClick}>Button</button>

            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-5' onClick={handleAddConv1d}>Add Conv1d</button>

        </div>
    )
}
