import itertools
from jinja2 import Environment, FileSystemLoader

input_id = itertools.count()
output_id = itertools.count()
general_id = itertools.count()
module_id = itertools.count()

env = Environment(loader=FileSystemLoader('./template'))


class Layer:
    def __init__(self, is_input=False, is_output=False):
        self.visited = False
        self.is_input = is_input
        self.is_output = is_output


class Dropout():
    pass


class MaxPool2d():
    pass


class MaxPool1d():
    pass


class Conv1d():
    def __init__(self, in_channels, out_channels, kernel_size, stride=1, padding=0, dilation=1, groups=1, bias=True, padding_mode='zeros', is_input=False, is_output=False):
        super().__init__(is_input, is_output)
        self.in_channels = in_channels
        self.out_channels = out_channels
        self.kernel_size = kernel_size
        self.stride = stride
        self.padding = padding
        self.dilation = dilation
        self.groups = groups
        self.bias = bias
        self.padding_mode = padding_mode

        self.conv2d_template = env.get_template('conv2d_template.py.j2')

    def get_code(self):
        code = self.conv2d_template.render(
            {
                "in_channels": self.in_channels,
                "out_channels": self.out_channels,
                "kernel_size": self.kernel_size,
                "stride": self.stride,
                "padding": self.padding,
                "dilation": self.dilation,
                "groups": self.groups,
                "bias": self.bias,
                "padding_mode": self.padding_mode
            }
        )
        return code



class Conv2d(Layer):
    def __init__(self, in_channels, out_channels, kernel_size, stride=1, padding=0, dilation=1, groups=1, bias=True, padding_mode='zeros', is_input=False, is_output=False):
        super().__init__(is_input, is_output)
        self.in_channels = in_channels
        self.out_channels = out_channels
        self.kernel_size = kernel_size
        self.stride = stride
        self.padding = padding
        self.dilation = dilation
        self.groups = groups
        self.bias = bias
        self.padding_mode = padding_mode

        self.conv2d_template = env.get_template('conv2d_template.py.j2')

    def get_code(self):
        code = self.conv2d_template.render(
            {
                "in_channels": self.in_channels,
                "out_channels": self.out_channels,
                "kernel_size": self.kernel_size,
                "stride": self.stride,
                "padding": self.padding,
                "dilation": self.dilation,
                "groups": self.groups,
                "bias": self.bias,
                "padding_mode": self.padding_mode
            }
        )
        return code


class Linear(Layer):
    def __init__(self, in_features, out_features, bias=True, is_input=False, is_output=False):
        super().__init__(is_input, is_output)
        self.in_features = in_features
        self.out_features = out_features
        self.bias = bias
        self.linear_template = env.get_template('linear_template.py.j2')

    def get_code(self):
        code = self.linear_template.render(
            {
                "in_features": self.in_features,
                'out_features': self.out_features,
                'bias': self.bias,
            }
        )

        return code


def main():
    conv2d = Conv2d(3, 32, 3, stride = 5)
    linear = Linear(128, 64)
    print(conv2d.get_code())
    print(linear.get_code())


if __name__ == "__main__":
    main()

# class Linear():

#     def __init__(self,
#                 units = None,
#                 activation = None,
#                 dropout = None,
#                 regularizer = None,
#                 input_layer: bool = False,
#                 output_layer: bool = False,
#                 visited: bool = False):

#         super().__init__()

#         self.id = self.generate_id(input_layer, output_layer)
#         self.units = units
#         self.activation = activation
#         self.dropout = dropout
#         self.regularizer = regularizer
#         self.input_layer = input_layer
#         self.output_layer = output_layer
#         self.next = None

#         if self.input_layer == self.output_layer == True:
#             raise ValueError('input_layer and output_layer cannot be true at the same time')


#     # On printing the object
#     def __str__(self):
#         return "[id : {} units: {} activation: {} dropout: {}]" \
#         .format(self.id, self.units, self.activation, self.dropout)

#     # generate ids for the input which are going to be used for the layer names
#     def generate_id(self, input_layer, output_layer):
#         if input_layer:
#             return "layer_" + str(next(input_id))
#         if output_layer:
#             return "layer_" + str(next(output_id))

#         return "layer_" + str(next(general_id))

#     # generate ids for the input which are going to be used for the variable names
#     def generate_var_name(self):
#         temp = self.id.split('_')

#         if self.input_layer:
#             return "inp_" + str(temp[1])
#         elif self.output_layer:
#             return "out_" + str(temp[1])
#         else:
#             return "x_" + str(temp[1])

#     #
#     def layer2code(self):
#         var_name = self.generate_var_name()

#         code = var_name + \
#         " = " + "keras.layers.Dense(units = {}, activation = '{}')"\
#             .format(self.units, self.activation)

#         return (var_name, code)
