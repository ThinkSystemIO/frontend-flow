import { Position, Tree, TreeNode } from "../Types"
import { getChildNodeIDs } from "./Node"

// Validations
export const treeIsValid = (tree: Tree) =>
    tree !== undefined &&
    tree !== null

// Queries
export const treeHasNodes = (tree: Tree) =>
    Object.keys(tree.nodes).length !== 0

export const treeHasPipelines = (tree: Tree) =>
    Object.keys(tree.pipelines).length !== 0

export const getNodes = (tree: Tree) =>
    Object.values(tree.nodes)

export const getNode = (tree: Tree, id: string) =>
    tree.nodes[id]

export const getPipelines = (tree: Tree) =>
    Object.values(tree.pipelines)

export const getPipeline = (tree: Tree, id: string) =>
    tree.pipelines[id]

// Mutations
export const setTreePositions = (tree: Tree, rootID: string) => {
    if (!tree) return
    if (!rootID || rootID === "") return

    const root = tree.nodes[rootID]
    if (root) {
        root.position = [0, 0, 0]
        setTreePositionsRecursive(tree, rootID)
    }
}

const setTreePositionsRecursive = (tree: Tree, nodeID: string) => {
    const node = tree.nodes[nodeID]
    setChildrenPositions(tree, node)
    setPipelinePositions(tree, node)

    for (const child in node.children) {
        setTreePositionsRecursive(tree, child)
    }
}

export const setChildrenPositions = (tree: Tree, node: TreeNode) => {
    const { nodes } = tree

    // Scale of object rendered on canvas
    const scale = 25

    const childrenIDs = getChildNodeIDs(node)
    const length = childrenIDs.length

    // Partition of circle projection on z-axis to space out nodes equally
    const partitions = 2 * Math.PI / length

    for (let i = 0; i < length; i++) {
        const n = i + 1
        const x = node.position[0] + scale * Math.cos(n * partitions)
        const y = node.position[1] + scale * Math.sin(n * partitions)
        const z = node.position[2] - scale
        nodes[childrenIDs[i]].position = [x, y, z]
    }
}

export const setPipelinePositions = (tree: Tree, node: TreeNode) => {
    const { nodes } = tree

    for (const childID in node.children) {
        const pipelineID = node.children[childID]

        const scale = .3
        let from: Position = [...node.position]
        let to: Position = [...nodes[childID].position]

        const dx = (from[0] - to[0]) * scale
        const dy = (from[1] - to[1]) * scale
        const dz = (from[2] - to[2]) * scale

        const center = [
            (from[0] + to[0]) / 2,
            (from[1] + to[1]) / 2,
            (from[2] + to[2]) / 2,
        ]

        from = [center[0] + dx, center[1] + dy, center[2] + dz]
        to = [center[0] - dx, center[1] - dy, center[2] - dz]

        tree.pipelines[pipelineID].from = from
        tree.pipelines[pipelineID].to = to
    }
}