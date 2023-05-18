
from jinja2 import Environment, FileSystemLoader
from functools import reduce
import operator
env = Environment(loader=FileSystemLoader('./template'))


class Layer:
    def __init__(self):
        self.visited = False
        self.input_shape = self.output_shape = [0] * 3


class MaxPool2d(Layer):
    def __init__(self,
                 kernel_size,
                 stride=None,
                 padding=0,
                 dilation=1,
                 return_indices=False,
                 ceil_mode=False):

        super().__init__()

        if isinstance(kernel_size, int):
            self.kernel_size = (kernel_size, kernel_size)  
        elif isinstance(kernel_size, tuple) and len(kernel_size) == 2:
            self.kernel_size = kernel_size  # Use the provided tuple as is
        else:
            raise ValueError("Invalid kernel_size value. Expected an integer or a tuple of length 2.")
        
        if isinstance(stride, int):
            self.stride = (stride, stride)  
        elif isinstance(stride, tuple) and len(stride) == 2:
            self.stride = stride  # Use the provided tuple as is
        else:
            self.stride = self.kernel_size
        
        if isinstance(padding, int):
            self.padding = (padding, padding)  
        elif isinstance(padding, tuple) and len(padding) == 2:
            self.padding = padding  # Use the provided tuple as is
        else:
            raise ValueError("Invalid padding value. Expected an integer or a tuple of length 2.")
        
        self.dilation = dilation
        self.return_indices = return_indices
        self.ceil_mode = ceil_mode
        self.maxpool1d_template = env.get_template(
            'layers/maxpool2d_template.py.j2')
        
        
    def calculate_output_shape(self):
        self.output_shape[0] = self.input_shape[0]
        self.output_shape[1] = ((self.input_shape[1] + 2 * self.padding[0] - 
                                 self.dilation * (self.kernel_size[0] - 1) - 1)//self.stride[0]) + 1
        self.output_shape[2] = ((self.input_shape[2] + 2 * self.padding[1] - 
                                 self.dilation * (self.kernel_size[1] - 1) - 1)//self.stride[1]) + 1

    def get_code(self):
        code = self.maxpool1d_template.render(
            {
                'kernel_size': self.kernel_size,
                'stride': self.stride,
                'padding': self.padding,
                'dilation': self.dilation,
                'return_indices': self.return_indices,
                'ceil_mode': self.ceil_mode
            }
        )

        return code


class MaxPool1d:
    pass


class Conv1d(Layer):
    def __init__(self,
                 in_channels,
                 out_channels,
                 kernel_size,
                 stride=1,
                 padding=0,
                 dilation=1,
                 groups=1,
                 bias=True,
                 padding_mode='zeros'):

        super().__init__()

        self.in_channels = in_channels
        self.out_channels = out_channels
        self.kernel_size = kernel_size
        self.stride = stride
        self.padding = padding
        self.dilation = dilation
        self.groups = groups
        self.bias = bias
        self.padding_mode = padding_mode

        self.conv2d_template = env.get_template('layers/conv1d_template.py.j2')

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
    def __init__(self,
                 in_channels,
                 out_channels,
                 kernel_size,
                 stride=1,
                 padding=0,
                 dilation=1,
                 groups=1,
                 bias=True,
                 padding_mode='zeros',
                 activation=None,
                 dropout=None):

        super().__init__()

        self.in_channels = in_channels
        self.out_channels = out_channels
        
        if isinstance(kernel_size, int):
            self.kernel_size = (kernel_size, kernel_size)  
        elif isinstance(kernel_size, tuple) and len(kernel_size) == 2:
            self.kernel_size = kernel_size  # Use the provided tuple as is
        else:
            raise ValueError("Invalid kernel_size value. Expected an integer or a tuple of length 2.")
        
        if isinstance(stride, int):
            self.stride = (stride, stride)  
        elif isinstance(stride, tuple) and len(stride) == 2:
            self.stride = stride  # Use the provided tuple as is
        else:
            raise ValueError("Invalid stride value. Expected an integer or a tuple of length 2.")
        
        if isinstance(padding, int):
            self.padding = (padding, padding)  
        elif isinstance(padding, tuple) and len(padding) == 2:
            self.padding = padding  # Use the provided tuple as is
        else:
            raise ValueError("Invalid padding value. Expected an integer or a tuple of length 2.")
        
        self.dilation = dilation
        self.groups = groups
        self.bias = bias
        self.padding_mode = padding_mode
        self.activation = activation
        self.dropout = dropout
        self.conv2d_template = env.get_template('layers/conv2d_template.py.j2')
        
    
    def calculate_output_shape(self):
        
        if self.input_shape[0] != self.in_channels:
            raise ValueError("input_shape[0] and in_channels do not match for {}".format(self))
        
        self.output_shape[0] = self.out_channels
        self.output_shape[1] = ((self.input_shape[1] + 2 * self.padding[0] - 
                                 self.dilation * (self.kernel_size[0] - 1) - 1)//self.stride[0]) + 1
        self.output_shape[2] = ((self.input_shape[2] + 2 * self.padding[1] - 
                                 self.dilation * (self.kernel_size[1] - 1) - 1)//self.stride[1]) + 1
        

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

        if self.activation:
            code = code + "\n" + \
                env.get_template(
                    "/activations/{}_template.py.j2".format(self.activation)).render()

        if self.dropout:
            code = code + "\n" + Dropout(self.dropout).get_code()

        return code


class Linear(Layer):
    def __init__(self,
                 in_features,
                 out_features,
                 bias=True,
                 activation=None,
                 dropout=None):

        super().__init__()

        self.in_features = in_features
        self.out_features = out_features
        self.bias = bias
        self.linear_template = env.get_template('layers/linear_template.py.j2')
        self.activation = activation
        self.dropout = dropout
        
    def calculate_output_shape(self):
        if self.in_features != self.input_shape:
            raise ValueError('input_shape={} and in_features={} do not match for {}'.format(self.input_shape, self.in_features, self))
        
        self.output_shape = self.out_features

    def get_code(self):
        code = self.linear_template.render(
            {
                "in_features": self.in_features,
                'out_features': self.out_features,
                'bias': self.bias,
            }
        )

        if self.activation:
            code = code + "\n" + \
                env.get_template(
                    "/activations/{}_template.py.j2".format(self.activation)).render()

        if self.dropout:
            code = code + "\n" + Dropout(self.dropout).get_code()

        return code


class Flatten(Layer):
    def __init__(self,
                 start_dim=1,
                 end_dim=-1):

        super().__init__()
        
        self.start_dim = start_dim
        self.end_dim = end_dim
        self.flatten_template = env.get_template(
            'layers/flatten_template.py.j2')
        
    def calculate_output_shape(self):
        self.output_shape = reduce(operator.mul, self.input_shape)

    def get_code(self):
        code = self.flatten_template.render({
            'start_dim': self.start_dim,
            'end_dim': self.end_dim
        })

        return code


class Dropout(Layer):
    def __init__(self, drop):
        super().__init__()
        self.drop = drop
        self.dropout_template = env.get_template(
            'layers/dropout_template.py.j2')
        
        
    def calculate_output_shape(self):
        self.output_shape = self.input_shape

    def get_code(self):
        code = self.dropout_template.render({
            'drop': self.drop
        })

        return code


class Input(Layer):
    def __init__(self, input_shape):
        super().__init__()
        self.input_shape = input_shape
        self.output_shape = input_shape


class Output(Layer):
    def __init__(self):
        super().__init__()


def main():
    conv2d = Conv2d(3, 32, 3, stride=5, activation='relu')
    linear = Linear(128, 64)
    maxpool1d = MaxPool2d(kernel_size=3, stride=2, padding=3)
    dropout = Dropout(0.2)

    print(maxpool1d.get_code())
    print(conv2d.get_code())
    print(linear.get_code())
    print(dropout.get_code())


if __name__ == "__main__":
    main()
