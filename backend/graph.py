import networkx as nx
import matplotlib.pyplot as plt

def main():
    graph = nx.Graph()
    
    graph.add_node("1")
    graph.add_node("2")
    graph.add_node("3")
    graph.add_node("4")
    graph.add_node("5")
    
    
    graph.add_edge("2", "3")
    graph.add_edge("1", "2")
    graph.add_edge("4", "2")
    graph.add_edge("3", "4")
    graph.add_edge("5", "4")
    
    dfs_nodes = nx.dfs_preorder_nodes(graph, source="4")
    
    for node in dfs_nodes:
        print(node)
        
    nx.draw(graph, with_labels=True, node_size=1000, node_color='lightblue', font_weight='bold') # type: ignore
    plt.show()

if __name__ == "__main__":
    main()