import React from 'react'
import ReactFlow, { Controls, Background, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { useState, useCallback } from 'react';
import Conv1d from './layers/Conv1d';
import Conv2d from './layers/Conv2d';
import Linear from './layers/Linear';
import { NodeProperties } from "./NodeProperties";
import { ComponentsPanel } from "./ComponentsPanel";

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

    // const handleOnClick = () => {
    //     console.log(edges);
    // }
    const [conv1dCount, setConv1dCount] = useState(2);
    const [conv2dCount, setConv2dCount] = useState(2);
    const [linearCount, setLinearCount] = useState(2);
    const [selectedNode, setSelectedNode] = useState(null);

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
                parameters: {
                    in_channels: '',
                    out_channels: '',
                    kernel_size: '',
                    stride: '',
                    padding: '',
                },
            },
        ]);

        setParamValues((prevValues) => ({
            ...prevValues,
            [id]: {
                in_channels: '',
                out_channels: '',
                kernel_size: '',
                stride: '',
                padding: '',
            },
        }));
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
                parameters : {
                    in_channels : '',
                    out_channels : '',
                    kernel_size : '',
                    stride : '',
                    padding : '',
                }
            },
        ]);
        setParamValues((prevValues) => ({
            ...prevValues,
            [id]: {
                in_channels: '',
                out_channels: '',
                kernel_size: '',
                stride: '',
                padding: '',
            },
        }));
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
                parameters : {
                    in_features : '',
                    out_features : '',
                    bias : '',
                }
            },
        ]);
        setParamValues((prevValues) => ({
            ...prevValues,
            [id]: {
                in_features : '',
                out_features : '',
                bias : '',
            },
        }));
    };


    // when a node is dragged reduce its opacity to 0.5
    const handleOnNodeDragStart = (event, node) => {
        node.data['opacity'] = 0.5;
        setSelectedNode(node);
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

    const clearSelectedNode = () => {
        setSelectedNode(null);
    };

    // const handleOnNodeClick = (event, node) => {
    //     setSelectedNode(node);
    // };

    const [paramValues, setParamValues] = useState({});

    const handleParamChange = (nodeId, paramName, value) => {
        setParamValues((prevParamValues) => ({
            ...prevParamValues,
            [nodeId]: {
                ...prevParamValues[nodeId],
                [paramName]: value,
            },
        }));
    };

    return (
        <>
            <ComponentsPanel
                handleAddConv1d={handleAddConv1d}
                handleAddConv2d={handleAddConv2d}
                handleAddLinear={handleAddLinear}
                handleClearAll={handleClearAll}
            />
            <div style={{ "width": "70%" }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    onNodeDragStart={handleOnNodeDragStart}
                    onNodeDragStop={handleOnNodeDragStop}
                    onClick={clearSelectedNode}
                // onNodeClick={handleOnNodeClick}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
            <div className='flex-none border-2 border-black px-8'>
                <NodeProperties
                    selectedNode={selectedNode}
                    paramValues={paramValues}
                    handleParamChange={handleParamChange}
                />
            </div>
        </>
    )
};

export default Flow;


