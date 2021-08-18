import { Action, setIsNodeDialogOpen, setRoot, setSelectedNode, setSubscriberURL, setTree, SET_IS_NODE_DIALOG_OPEN, SET_ROOT, SET_SELECTED_NODE, SET_SUBSCRIBER_URL, SET_TREE } from "./Actions"
import { State } from "./Model"

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case SET_ROOT:
            return setRoot(state, action.payload)
        case SET_TREE:
            return setTree(state, action.payload)

        case SET_SELECTED_NODE:
            return setSelectedNode(state, action.payload)
        case SET_IS_NODE_DIALOG_OPEN:
            return setIsNodeDialogOpen(state, action.payload)

        case SET_SUBSCRIBER_URL:
            return setSubscriberURL(state, action.payload)

        default:
            throw new Error("not implemented")
    }
}