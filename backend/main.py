import os
import networkx as nx
from layer import Conv2d, Linear, Dropout, Input, Flatten, MaxPool2d
import matplotlib.pyplot as plt
from jinja2 import Environment, FileSystemLoader
import re

def main():
    env = Environment(loader=FileSystemLoader('./template'))
    
    graph = nx.Graph()

    model_dict = {

        'inp': Input((3, 224, 224)),
        'conv2d_1': Conv2d(3, 32, kernel_size=3, stride=2, padding=1, dropout = 0.2, activation = 'relu'),
        'maxpool2d_1': MaxPool2d((2,2)),
        'conv2d_2': Conv2d(32, 64, kernel_size=3, stride=2, padding=1, dropout = 0.2),
        'maxpool2d_2': MaxPool2d((2,2)),
        'conv2d_3': Conv2d(64, 128, kernel_size=3, stride=2, padding=1, dropout = 0.2),
        'maxpool2d_3': MaxPool2d((2,2)),
        'flatten': Flatten(),
        'fc1': Linear(1152, 512, activation='relu', dropout = 0.2),
        'fc2': Linear(512, 128, activation='tanh', dropout = 0.2),
        'fc3': Linear(128, 10)
    }

    for node in model_dict.keys():
        graph.add_node(node)
        
        
    graph.add_edge('inp', 'conv2d_1')
    graph.add_edge('conv2d_1', 'maxpool2d_1')
    graph.add_edge('maxpool2d_1', 'conv2d_2')
    graph.add_edge('conv2d_2', 'maxpool2d_2')
    graph.add_edge('maxpool2d_2', 'conv2d_3')
    graph.add_edge('conv2d_3', 'maxpool2d_3')
    graph.add_edge('maxpool2d_3', 'flatten')
    graph.add_edge('flatten', 'fc1')
    graph.add_edge('fc1', 'fc2')
    graph.add_edge('fc2', 'fc3')
    
    layers, shapes = [], []
    
    dfs = nx.dfs_preorder_nodes(graph, source='inp')
    curr_out_shape = 0
    
    for node in dfs:
        node = model_dict[node]
        if not isinstance(node, Input):
            node.input_shape = curr_out_shape 
            node.calculate_output_shape()
            layers.append(node.get_code())
            if isinstance(node.output_shape, list):
                shapes.append([str(num) for num in node.output_shape])
            else:
                shapes.append([node.output_shape])
                
        curr_out_shape = node.output_shape        
        
        # print(node)
        # print("Input:", node.input_shape)
        # print("Output:", node.output_shape)
        # print("\n\n")


    # print(layers[0])

    layer_shapes = zip(layers, shapes)
    
    sequential_blocks = env.get_template('modelling/sequential_template.py.j2').render({
        'block' : 'block1',
        'layer_shapes' : layer_shapes
    })
    
    model = env.get_template('modelling/model_template.py.j2').render({
        'model_name' : 'Net',
        'blocks' : [sequential_blocks]
    })
    
    model = re.sub(r'\n\s*\n\s*\n', r'\n\n', model)
    
    with open('output.py', 'w+') as f:
        f.write(model)
        f.close()


if __name__ == "__main__":
    main()
