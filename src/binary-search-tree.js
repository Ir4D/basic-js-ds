const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootTree = null;
  }

  root() {
    console.log('root', this.rootTree)
    return this.rootTree;
  }

  add(data) {
    let newNode = new Node(data);
    if (this.rootTree === null) {
      this.rootTree = newNode;
    } else {
      this.addNew(this.rootTree, newNode);
    }
  }

  addNew(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.addNew(node.left, newNode);
      }
    } else if (newNode.data > node.data) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.addNew(node.right, newNode);
      }
    } else  {
      return node;
    }
  }

  has(data) {
    if (this === null) {
      return null;
    } else if (this.find(data)) {
      return true;
    }

    if (!this.find(data)) {
      return false;
    }
  }

  find(data) {
    return this.newFind(this.rootTree, data);
  }

  newFind(node, data) {
    if (node === null) {
      return null;
    } else if (node.data > data) {
      return this.newFind(node.left, data);
    } else if (node.data < data) {
      return this.newFind(node.right, data);
    } else {
      return node;
    }
  }

  remove(data) {
    this.rootTree = this.newRemove(this.rootTree, data);
  }

  newRemove(node, data) {
    if (node === null) {
      return null;
    }
    
    if (node.data > data) {
      node.left = this.newRemove(node.left, data);
      return node;
    } else if (node.data < data) {
      node.right = this.newRemove(node.right, data);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        return null;
      } 
      
      if (node.left === null) {
        node = node.right;
        return node;
      }
      
      if (node.right === null) {
        node = node.left;
        return node;
      }

      let leftMin = node.left;
      while (leftMin.right) {
        leftMin = leftMin.right;
      }
      node.data = leftMin.data;
      node.left = this.newRemove(node.left, leftMin.data);
      return node;
    }
  }

  min() {
    if (this.rootTree === null) {
      return null;
    }
    return this.newMin(this.rootTree);
  }

  newMin(node) {
    if (node.left === null) {
      return node.data;
    } else {
      return this.newMin(node.left);
    }
  }

  max() {
    if (this.rootTree === null) {
      return null;
    }
    return this.newMax(this.rootTree);
  }

  newMax(node) {
    if (node.right === null) {
      return node.data;
    } else {
      return this.newMax(node.right);
    }
  }
}

module.exports = {
  BinarySearchTree
};