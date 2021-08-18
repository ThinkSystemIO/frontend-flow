export type Position = [number, number, number]

export type NodeID = string
export type PipelineID = string
export type ChildID = string

export type Nodes = Record<NodeID, TreeNode>
export type Pipelines = Record<PipelineID, TreePipeline>
export type Children = Record<ChildID, PipelineID>

export interface Tree {
	nodes: Nodes
	pipelines: Pipelines
}

export interface TreeNode {
	id: string
	name: string
	active: boolean
	type: string
	children: Children
	position: Position
	props: Props
}

export interface Props {
	url?: string
}

export interface TreePipeline {
	id: string
	name: string
	active: boolean
	from: Position
	to: Position
}

export const PUBLISHER = "publisher"
export const SUBSCRIBER = "subscriber"
export const MONGO = "mongo"

export const CREATE_NODE = "create_node"
export const ADD_CHILD = "add_child"
export const CREATE_PIPELINE = "create_pipeline"

export const ACTIVATE_NODE = "activate_node"
export const DEACTIVATE_NODE = "deactivate_node"

export const ACTIVATE_WS = "activate_ws"
export const DEACTIVATE_WS = "deactivate_ws"
export const UPDATE_URL = "update_url"

export const ADD_SUBSCRIBER = "add_subscriber"
export const LISTEN = "listen"

export const CONNECT_MONGO = "connect_mongo"
export const ADD_MONGO = "add_mongo"
export const UPDATE_MONGO = "update_mongo"
export const UPDATE_BY_ID_MONGO = "update_by_id_mongo"
export const REMOVE_MONGO = "remove_mongo"
export const REMOVE_BY_ID_MONGO = "remove_by_id_mongo"
export const QUERY_ALL_MONGO = "query_all_mongo"

export const UPDATE_FILTER_PIPELINE = "update_filter_pipeline"