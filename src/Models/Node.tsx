import { TreeNode } from "../Types";

// Validations
export const nodeIsValid = (node: TreeNode) =>
    node !== undefined &&
    node !== null &&
    node.name !== undefined &&
    node.name !== null &&
    node.name !== "" &&
    node.id !== undefined &&
    node.id !== null &&
    node.id !== ""

export const nodeIsValidAndHasPosition = (node: TreeNode) =>
    nodeIsValid(node) &&
    nodeHasPosition(node)

// Queries
export const nodeHasChildren = (node: TreeNode) =>
    Object.keys(node.children).length > 0;

export const nodeHasNoChildren = (node: TreeNode) =>
    Object.keys(node.children).length === 0;

export const nodeHasPosition = (node: TreeNode) =>
    node.position !== undefined &&
    node.position !== null &&
    node.position.length === 3 &&
    node.position.every(coordinate => typeof coordinate === "number");

export const getChildNodeIDs = (node: TreeNode): string[] =>
    Object.keys(node.children)
