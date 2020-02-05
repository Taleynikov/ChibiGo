const modules = {};

function addNodeData(node, prop, data) {
    if (node.hasOwnProperty('chibigo')) node.chibigo[prop] = data;
    else {
        node.chibigo = {};
        node.chibigo[prop] = data;
    }
}

function getNodeData(node) {
    return node.chibigo;
}