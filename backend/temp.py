from jinja2 import Environment, FileSystemLoader
import re


def main():
    env = Environment(loader=FileSystemLoader('./template'))
    template = env.get_template('model_template.py.j2')
    linear = env.get_template('linear_template.py.j2')

    block1_code = env.get_template('sequential_template.py.j2').render({
        'layers': [linear.render({
            'in_channels': 256, 'out_channels': 512, 'bias': True}),
            'nn.ReLU()'],
        'block': 'block1'
    })

    block2_code = env.get_template('sequential_template.py.j2').render({
        'layers': ['nn.Linear(512, 256)', 'nn.LeakyReLU()', 'nn.Linear(256, 512)', 'nn.LeakyReLU()'],
        'block': 'block2'

    })

    data = {
        'model_name': 'MyModel',
        'input_size': 100,
        'output_size': 10,
        'blocks': [block1_code, block2_code]
    }

    generated_code = template.render(data)
    generated_code = re.sub(r'\n\s*\n\s*\n', r'\n\n', generated_code)

    with open('./output.txt', 'w') as f:
        f.write(generated_code)
        f.write("\n")
        f.close()


if __name__ == "__main__":
    main()
