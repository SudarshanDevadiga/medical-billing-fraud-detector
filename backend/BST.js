class TreeNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(key, value) {
    const newNode = new TreeNode(key, value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this._insertNode(this.root, newNode);
    }
  }

  _insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) node.left = newNode;
      else this._insertNode(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else this._insertNode(node.right, newNode);
    }
  }

  rangeSearch(minKey, maxKey) {
    const result = [];
    this._rangeHelper(this.root, minKey, maxKey, result);
    return result;
  }

  _rangeHelper(node, minKey, maxKey, result) {
    if (node === null) return;
    if (node.key > minKey) this._rangeHelper(node.left, minKey, maxKey, result);
    if (node.key >= minKey && node.key <= maxKey) {
      result.push({ key: node.key, value: node.value });
    }
    if (node.key < maxKey) this._rangeHelper(node.right, minKey, maxKey, result);
  }
}

module.exports = BST;
