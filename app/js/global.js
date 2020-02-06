const modules = {};

const nodeData = {
    add(node, prop, data) {
        if (node.hasOwnProperty('chibigo')) node.chibigo[prop] = data;
        else {
            node.chibigo = {};
            node.chibigo[prop] = data;
        }
    },
    get(node) {
        return node.chibigo;
    },
    remove(node, prop) {
        delete node.chibigo[prop];
    }
};