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
import { NodeProperties } from "./NodeProperties";
import { ComponentsPanel } from "./ComponentsPanel";

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
// let nums = {
//     conv1d: 0,
//     conv2d: 0,
//     linear: 0,
//     maxpool1d: 0,
//     maxpool2d: 0,
//     batchnorm2d: 0,
//     batchnorm1d: 0,
//     inputLayer: 0,
//     outputLayer: 0

// }

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
    const [conv1dCount, setConv1dCount] = useState(1);
    const [conv2dCount, setConv2dCount] = useState(1);
    const [linearCount, setLinearCount] = useState(1);

    const [maxpool1dCount, setMaxpool1dCount] = useState(1);
    const [maxpool2dCount, setMaxpool2dCount] = useState(1);
    const [batchnorm2dCount, setBatchNorm2dCount] = useState(1);
    const [batchnorm1dCount, setBatchNorm1dCount] = useState(1);

    const [inputCount, setInputCount] = useState(1);
    const [outputCount, setOutputCount] = useState(1);

    const [selectedNode, setSelectedNode] = useState(null);

    // button to add new conv1d layer

    const handleAddInput = () => {
        setInputCount((prevCount) => prevCount + 1);
        const id = 'inp_' + inputCount

        setNodes((prev) => [...prev, {
            id: id,
            position: { x: 300, y: 300 },
            type: 'inputLayer',
            data: { opacity: '0.8' },
            parameters: {
                b: '',
                h: '',
                w: '',
                c: '',
            }
        }])
        setParamValues((prevValues) => ({
            ...prevValues,
            [id]: {
                b: '',
                h: '',
                w: '',
                c: '',
            },
        }));
    };
    
    const handleAddOutput = () => {
        setOutputCount((prevCount) => prevCount + 1);
        const id = 'out_' + outputCount

        setNodes((prev) => [...prev, {
            id: id,
            position: { x: 300, y: 300 },
            type: 'outputLayer',
            data: { opacity: '0.8' },
            parameters: {
                b: '',
                h: '',
                w: '',
                c: '',
            }
        }])
        setParamValues((prevValues) => ({
            ...prevValues,
            [id]: {
                b: '',
                h: '',
                w: '',
                c: '',
            },
        }));
    };

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
                    padding_mode: '',
                    dilation: '',
                    groups: '',
                    bias: '',
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
                padding_mode: '',
                dilation: '',
                groups: '',
                bias: '',
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
                parameters: {
                    in_channels: '',
                    out_channels: '',
                    kernel_size: '',
                    stride: '',
                    padding: '',
                    padding_mode: '',
                    dilation: '',
                    groups: '',
                    bias: '',
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
                padding_mode: '',
                dilation: '',
                groups: '',
                bias: '',
            },
        }));
    };

    const handleAddMaxpool1d = () => {
        setMaxpool1dCount((prevCount) => prevCount + 1);
        const id = 'maxpool1d_' + maxpool1dCount;

        setNodes((prev) => [
            ...prev,
            {
                id: id,
                position: { x: 0, y: 0 },
                type: 'maxpool1d',
                data: { opacity: '0.8' },
                parameters: {
                    kernel_size: '',
                    stride: '',
                    padding: '',
                    dilation: '',
                    return_indices: '',
                    ceil_mode: '',
                },
            },
        ]);

        setParamValues((prevValues) => ({
            ...prevValues,
            [id]: {
                kernel_size: '',
                    stride: '',
                    padding: '',
                    dilation: '',
                    return_indices: '',
                    ceil_mode: '',
            },
        }));
    };

    const handleAddMaxpool2d = () => {
        setMaxpool2dCount((prevCount) => prevCount + 1);
        const id = 'maxpool2d_' + maxpool2dCount;

        setNodes((prev) => [
            ...prev,
            {
                id: id,
                position: { x: 0, y: 0 },
                type: 'maxpool2d',
                data: { opacity: '0.8' },
                parameters: {
                    kernel_size: '',
                    stride: '',
                    padding: '',
                    dilation: '',
                    return_indices: '',
                    ceil_mode: '',
                },
            },
        ]);

        setParamValues((prevValues) => ({
            ...prevValues,
            [id]: {
                kernel_size: '',
                stride: '',
                padding: '',
                dilation: '',
                return_indices: '',
                ceil_mode: '',
            },
        }));
    };

    const handleAddBatchNorm1d = () => {
        setBatchNorm1dCount((prevCount) => prevCount + 1);
        const id = 'batchnorm1d_' + batchnorm1dCount;

        setNodes((prev) => [
            ...prev,
            {
                id: id,
                position: { x: 0, y: 0 },
                type: 'batchnorm1d',
                data: { opacity: '0.8' },
                parameters: {
                    num_features: '',
                    eps: '',
                    momentum: '',
                    affine: '',
                    track_running_stats: '',
                },
            },
        ]);

        setParamValues((prevValues) => ({
            ...prevValues,
            [id]: {
                num_features: '',
                eps: '',
                momentum: '',
                affine: '',
                track_running_stats: '',
            },
        }));
    };

    const handleAddBatchNorm2d = () => {
        setBatchNorm2dCount((prevCount) => prevCount + 1);
        const id = 'batchnorm2d_' + batchnorm2dCount;

        setNodes((prev) => [
            ...prev,
            {
                id: id,
                position: { x: 0, y: 0 },
                type: 'batchnorm2d',
                data: { opacity: '0.8' },
                parameters: {
                    num_features: '',
                    eps: '',
                    momentum: '',
                    affine: '',
                    track_running_stats: '',
                },
            },
        ]);

        setParamValues((prevValues) => ({
            ...prevValues,
            [id]: {
                num_features: '',
                eps: '',
                momentum: '',
                affine: '',
                track_running_stats: '',
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
                parameters: {
                    in_features: '',
                    out_features: '',
                    bias: '',
                }
            },
        ]);
        setParamValues((prevValues) => ({
            ...prevValues,
            [id]: {
                in_features: '',
                out_features: '',
                bias: '',
            },
        }));
    };

    const handleClearAll = () => {
        setNodes([]);
        setEdges([]);
        setConv1dCount(1);
        setConv2dCount(1);
        setLinearCount(1);
        setInputCount(1);
        setOutputCount(1);
        setMaxpool1dCount(1);
        setMaxpool2dCount(1);
        setBatchNorm1dCount(1);
        setBatchNorm2dCount(1);
        // nums = {
        //     conv1d: 1,
        //     conv2d: 1,
        //     linear: 1,
        // };
    };

    // const onNodeClick = (event, node) => {
    //     setSelectedNode(node);
    // }

    const onNodeDoubleClick = (event, node) => {
        setSelectedNode(node);
    }

    // when a node is dragged reduce its opacity to 0.5
    const handleOnNodeDragStart = (event, node) => {
        node.data['opacity'] = 0.5;
        setSelectedNode(node);
    }

    // when dragging is stopped, revert back to the previous value
    const handleOnNodeDragStop = (event, node) => {
        node.data['opacity'] = 0.8;
    }

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
                handleAddInput={handleAddInput}
                handleAddOutput={handleAddOutput}
                handleAddMaxpool1d={handleAddMaxpool1d}
                handleAddMaxpool2d={handleAddMaxpool2d}
                handleAddBatchNorm1d={handleAddBatchNorm1d}
                handleAddBatchNorm2d={handleAddBatchNorm2d}
            />
            <div style={{ "width": "80%" }}>
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
                    onNodeDoubleClick={onNodeDoubleClick}
                // onNodeClick={handleOnNodeClick}
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
            {selectedNode && (
                <NodeProperties
                selectedNode={selectedNode}
                paramValues={paramValues}
                handleParamChange={handleParamChange}
            />
            )}
            

        </>
    )
};

export default Flow;


