import os
from layer import Dense


def generate_code(layers, return_model=False):
    code, input_var, output_var = "", "", ""
    curr_layer, prev_layer = layers, None

    var, prev_var = None, None
    input_layers, output_layers = [], []

    while curr_layer is not None:
        prev_var = var
        var, code_temp = curr_layer.layer2code()
        code = code + code_temp

        if var.split('_')[0] == 'inp':
            input_var = var
            input_layers.append(code_temp)
        if var.split('_')[0] == 'out':
            output_var = var
            output_layers.append(code_temp)

        if not curr_layer.input_layer:
            code = code + "({})".format(prev_var)

        prev_layer = curr_layer
        curr_layer = curr_layer.next

        code = code + "\n"

    if return_model:

        code = code + "\n" + "model = keras.models.Model(inputs = {} output = {})"\
            .format(input_var, output_var)

    return code, input_layers, output_layers


def main():
    layers = []

    inp1 = Dense(100, 'relu', input_layer=True)
    inp1.next = Dense(200, 'sigmoid')
    inp1.next.next = Dense(200, 'tanh')
    inp1.next.next.next = Dense(50, activation='relu')
    inp1.next.next.next.next = Dense(135, activation='tanh')
    inp1.next.next.next.next.next = Dense(10, 'softmax', output_layer=True)

    # code, inp, out = generate_code(inp1)

    # print(code)

    # print("Input:", inp)
    # print("Output:", out)

    s = '''
        self.block1 = nn.Sequential(
            nn.Linear(256, 512),
            nn.ReLU()
        )
        '''

    with open('output.txt', 'w+') as f:
        f.write("class Net(nn.Module)\n")
        f.write("\tdef __init__(self):\n")
        f.write("\t\tsuper().__init__()\n")
        f.write("{}\n".format(s))


if __name__ == "__main__":
    main()
