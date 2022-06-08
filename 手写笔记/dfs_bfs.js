/**
 * 二叉树 先（前）序遍历
 * @param {*} root
 * @returns
 */
function dfs(root) {
    const result = [];

    const preorder = (node) => {
        if (!node) return;
        result.push(node.val);
        preorder(node.letf);
        preorder(node.right);
    };
    preorder(root);
    return result;
}

/**
 * 二叉树 中序遍历
 * @param {*} root
 */
function dfs2(root) {
    const result = [];

    const preorder = (node) => {
        if (!node) return;
        preorder(node.left);
        result.push(node.val);
        preorder(node.right);
    };
    preorder(root);
    return result;
}

/**
 * 二叉树 后序遍历
 * @param {*} root
 */
function dfs3(root) {
    const result = [];

    const preorder = (node) => {
        if (!node) return;
        preorder(node.left);
        preorder(node.right);
        result.push(node.val);
    };
    preorder(root);
    return result;
}

/**
 * 二叉树 层序遍历
 * @param {*} root
 */
function bfs(root) {
    let result = [],
        queue = [];

    const levelOrder = (node) => {
        if (!node) return;
        result.push(node.val);
        if (node.left) {
            queue.unshift(node.left);
        }
        if (node.right) {
            queue.unshift(node.right);
        }

        levelOrder(queue.pop());
    };

    levelOrder(root);
}

/**
 * dom 深度优先遍历
 * @param {*} dom 
 */
function dfs4(dom) {
    let result = [];

    const order = (node) => {
        if (node) {
            result.push(node);

            for (let child of node.children) {
                order(child);
            }
        }
    };

    order(dom);
}

/**
 * dom 广度优先遍历
 * @param {*} dom 
 */
function dfs5(dom) {
    let result = [],
        queue = [];

    const order = (node) => {
        if (!node) return;
        result.push(node);

        for (let child of node.children) {
            queue.unshift(child);
        }

        order(queue.pop());
    };

    order(dom);
}

