import os
import networkx as nx
from layer import Conv2d, Linear, Dropout, Input, Flatten
import matplotlib.pyplot as plt
from jinja2 import Environment, FileSystemLoader
import re

def main():
    env = Environment(loader=FileSystemLoader('./template'))
    
    graph = nx.Graph()

    model_dict = {

        'inp': Input((3, 224, 224)),
        'conv2d_1': Conv2d(3, 32, kernel_size=3, stride=2, padding=1, dropout = 0.2, activation = 'relu'),
        'conv2d_2': Conv2d(32, 64, kernel_size=3, stride=2, padding=1, dropout = 0.2),
        'conv2d_3': Conv2d(64, 128, kernel_size=3, stride=2, padding=1, dropout = 0.2),
        'flatten': Flatten(),
        'fc1': Linear(1024, 512, activation='relu', dropout = 0.2),
        'fc2': Linear(512, 128, activation='tanh', dropout = 0.2),
        'fc3': Linear(128, 10, dropout = 0.1)
    }

    for node in model_dict.keys():
        graph.add_node(node)
        
        
    graph.add_edge('inp', 'conv2d_1')
    graph.add_edge('conv2d_1', 'conv2d_2')
    graph.add_edge('conv2d_2', 'conv2d_3')
    graph.add_edge('conv2d_3', 'flatten')
    graph.add_edge('flatten', 'fc1')
    graph.add_edge('fc1', 'fc2')
    graph.add_edge('fc2', 'fc3')
    
    layers = []
    
    dfs = nx.dfs_preorder_nodes(graph, source='inp')
    for node in dfs:
        if node != 'inp':
            layers.extend(model_dict[node].get_code().split("\n"))
    
    
    sequential_blocks = env.get_template('modelling/sequential_template.py.j2').render({
        'block' : 'block1',
        'layers' : layers
    })
    
    model = env.get_template('modelling/model_template.py.j2').render({
        'model_name' : 'Net',
        'blocks' : [sequential_blocks]
    })
    
    model = re.sub(r'\n\s*\n\s*\n', r'\n\n', model)
    
    with open('output.txt', 'w+') as f:
        f.write(model)
        f.close()


if __name__ == "__main__":
    main()


# def generate_code(layers, return_model=False):
#     code, input_var, output_var = "", "", ""
#     curr_layer, prev_layer = layers, None

#     var, prev_var = None, None
#     input_layers, output_layers = [], []

#     while curr_layer is not None:
#         prev_var = var
#         var, code_temp = curr_layer.layer2code()
#         code = code + code_temp

#         if var.split('_')[0] == 'inp':
#             input_var = var
#             input_layers.append(code_temp)
#         if var.split('_')[0] == 'out':
#             output_var = var
#             output_layers.append(code_temp)

#         if not curr_layer.input_layer:
#             code = code + "({})".format(prev_var)

#         prev_layer = curr_layer
#         curr_layer = curr_layer.next

#         code = code + "\n"

#     if return_model:

#         code = code + "\n" + "model = keras.models.Model(inputs = {} output = {})"\
#             .format(input_var, output_var)

#     return code, input_layers, output_layers


# def main():
    # layers = []

    # inp1 = Dense(100, 'relu', input_layer=True)
    # inp1.next = Dense(200, 'sigmoid')
    # inp1.next.next = Dense(200, 'tanh')
    # inp1.next.next.next = Dense(50, activation='relu')
    # inp1.next.next.next.next = Dense(135, activation='tanh')
    # inp1.next.next.next.next.next = Dense(10, 'softmax', output_layer=True)

    # code, inp, out = generate_code(inp1)

    # print(code)

    # print("Input:", inp)
    # print("Output:", out)
