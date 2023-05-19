import React from 'react'
import ReactFlow, { Controls, Background, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { useState, useCallback } from 'react';
import Conv1d from './layers/Conv1d';
import Conv2d from './layers/Conv2d';
import Linear from './layers/Linear';
import Maxpool1d from './layers/Maxpool1d';
import Maxpool2d from './layers/Maxpool2d';
import BatchNorm2d from './layers/BatchNorm2d';
import BatchNorm1d from './layers/BatchNorm1d';
import Input from './layers/InputLayer';
import Output from './layers/OutputLayer';

// define the node types
const nodeTypes = {
    conv1d: Conv1d,
    conv2d: Conv2d,
    linear: Linear,
    maxpool1d: Maxpool1d,
    maxpool2d: Maxpool2d,
    batchnorm2d: BatchNorm2d,
    batchnorm1d: BatchNorm1d,
    inputLayer: Input,
    outputLayer: Output
}

// store the number of each layers to use it later for ids
let nums = {
    conv1d: 0,
    conv2d: 0,
    linear: 0,
    maxpool1d: 0,
    maxpool2d: 0,
    batchnorm2d: 0,
    batchnorm1d: 0,
    inputLayer: 0,
    outputLayer: 0

}

export default function Flow() {

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



    // when a node is dragged reduce its opacity to 0.5
    const handleOnNodeDragStart = (event, node) => {
        node.data['opacity'] = 0.5;
    }

    // when dragging is stopped, revert back to the previous value
    const handleOnNodeDragStop = (event, node) => {
        node.data['opacity'] = 0.8;
    }


    // button to add new conv1d layer
    const handleAddConv1d = () => {
        nums['conv1d'] += 1;
        const id = 'conv1d_' + nums['conv1d']

        setNodes((prev) => [...prev, {
            id: id,
            position: { x: 300, y: 300 },
            type: 'conv1d',
            data: { opacity: '0.8' }
        }])
    }

    const handleAddConv2d = () => {
        nums['conv2d'] += 1;
        const id = 'conv2d_' + nums['conv2d']

        setNodes((prev) => [...prev, {
            id: id,
            position: { x: 300, y: 300 },
            type: 'conv2d',
            data: { opacity: '0.8' }
        }])
    }

    const handleAddBatchNorm1d = () => {
        nums['batchnorm1d'] += 1;
        const id = 'bn1d_' + nums['batchnorm1d']

        setNodes((prev) => [...prev, {
            id: id,
            position: { x: 300, y: 300 },
            type: 'batchnorm1d',
            data: { opacity: '0.8' }
        }])
    }

    const handleAddBatchNorm2d = () => {
        nums['batchnorm2d'] += 1;
        const id = 'bn2d_' + nums['batchnorm2d']

        setNodes((prev) => [...prev, {
            id: id,
            position: { x: 300, y: 300 },
            type: 'batchnorm2d',
            data: { opacity: '0.8' }
        }])
    }

    const handleAddInput = () => {
        nums['inputLayer'] += 1;
        const id = 'inp_' + nums['inputLayer']

        setNodes((prev) => [...prev, {
            id: id,
            position: { x: 300, y: 300 },
            type: 'inputLayer',
            data: { opacity: '0.8' }
        }])
    }

    const handleAddLinear = () => {
        nums['linear'] += 1;
        const id = 'linear_' + nums['linear']

        setNodes((prev) => [...prev, {
            id: id,
            position: { x: 300, y: 300 },
            type: 'linear',
            data: { opacity: '0.8' }
        }])
    }

    const handleAddOutput = () => {
        nums['outputLayer'] += 1;
        const id = 'out_' + nums['outputLayer']

        setNodes((prev) => [...prev, {
            id: id,
            position: { x: 300, y: 300 },
            type: 'outputLayer',
            data: { opacity: '0.8' }
        }])
    }



    return (
        <div style={{ height: "800px", width: "80%" }}>
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

            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-5' onClick={handleAddConv2d}>Add Conv2d</button>

            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-5' onClick={handleAddBatchNorm1d}>Add BatchNorm1d</button>

            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-5' onClick={handleAddBatchNorm2d}>Add BatchNorm2d</button>

            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-5' onClick={handleAddInput}>Add Input</button>

            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-5' onClick={handleAddLinear}>Add Linear</button>

            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-5' onClick={handleAddOutput}>Add Output</button>


        </div>
    )
}
