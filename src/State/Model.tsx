import { Tree } from "../Types";

export type State = typeof initialState

export const initialState = {
	root: "",
	tree: {
		nodes: {},
		pipelines: {},
	} as Tree,
	selectedNode: "",
	isNodeDialogOpen: false,
	subscriberURL: "",
}

