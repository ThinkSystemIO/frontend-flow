import _ from "lodash"
import { setTreePositions } from "../Models/Tree"
import { Tree } from "../Types"
import { State } from "./Model"

export const SET_ROOT = "SET_ROOT"
export const SET_TREE = "SET_TREE"
export const SET_SELECTED_NODE = "SET_SELECTED_NODE"
export const SET_IS_NODE_DIALOG_OPEN = "SET_IS_NODE_DIALOG_OPEN"
export const SET_SUBSCRIBER_URL = "SET_SUBSCRIBER_URL"

export type Action =
    { type: typeof SET_ROOT, payload: string } |
    { type: typeof SET_TREE, payload: Tree } |
    { type: typeof SET_SELECTED_NODE, payload: string } |
    { type: typeof SET_IS_NODE_DIALOG_OPEN, payload: boolean } |
    { type: typeof SET_SUBSCRIBER_URL, payload: string }

export const setRoot = (state: State, root: string) => {
    const copied = _.cloneDeep(state)
    setTreePositions(copied.tree, root)
    return ({ ...copied, root })
}

export const setTree = (state: State, tree: Tree) => {
    const copied = _.cloneDeep(state)
    setTreePositions(tree, copied.root)
    return ({ ...copied, tree })
}

export const setSelectedNode = (state: State, selectedNode: string) => {
    const copied = _.cloneDeep(state)
    return ({ ...copied, selectedNode })
}

export const setIsNodeDialogOpen = (state: State, isNodeDialogOpen: boolean) => {
    const copied = _.cloneDeep(state)
    return ({ ...copied, isNodeDialogOpen })
}

export const setSubscriberURL = (state: State, subscriberURL: string) => {
    const copied = _.cloneDeep(state)
    return ({ ...copied, subscriberURL })
}