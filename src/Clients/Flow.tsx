import { SET_TREE } from "../State/Actions"
import { Dispatch } from "../State/Context"
import { ACTIVATE_NODE, ACTIVATE_WS, ADD_CHILD, CREATE_NODE, DEACTIVATE_NODE, DEACTIVATE_WS, UPDATE_URL } from "../Types"

const BASE_URL = `${window.location.host}${window.location.pathname}`
const HTTP_URL = `http://${BASE_URL}/api`
const WS_URL = `ws://${BASE_URL}/api/tree`

//
// Fetches tree on each change via websocket connection
//
interface SubscribeTree {
	dispatch: Dispatch
}

export const subscribeTree = ({ dispatch }: SubscribeTree) => {
	const socket = new WebSocket(WS_URL)

	socket.onmessage = e => {
		const data = JSON.parse(e.data)
		dispatch({ type: SET_TREE, payload: data })
	}

	socket.onerror = e => {
		console.error(e)
		setTimeout(() => subscribeTree({ dispatch }), 1000)
	}
}

//
// Base command for all requests
//
interface Command {
	action: string
	errors: string[]
}

//
// Creates new node and adds it to tree
//
interface CreateNode {
	name: string
	type: string
}

interface CreateNodeResponse extends Command {
	data: string
}

export const createNode = async ({ name, type }: CreateNode): Promise<string | null> => {
	const body = JSON.stringify({
		name,
		type,
		action: CREATE_NODE,
	})

	try {
		const res = await fetch(HTTP_URL, { method: "POST", body })
		const cmd: CreateNodeResponse = await res.json()
		return cmd.data
	} catch (e) {
		console.error(e)
	}

	return null
}

//
// Adds child node with pipeline
//
interface AddChild {
	parent: string
	child: string
	pipeline: string
}

interface AddChildResponse extends Command {
	data: string
}

export const addChild = async ({ parent, child, pipeline }: AddChild): Promise<string | null> => {
	const body = JSON.stringify({
		parent,
		child,
		pipeline,
		action: ADD_CHILD,
	})

	try {
		const res = await fetch(HTTP_URL, { method: "POST", body })
		const cmd: AddChildResponse = await res.json()
		return cmd.data
	} catch (e) {
		console.error(e)
	}

	return null
}

//
// Activates node
//
interface ActivateNode {
	node: string
}

export const activateNode = async ({ node }: ActivateNode): Promise<Command | null> => {
	const body = JSON.stringify({
		action: ACTIVATE_NODE,
		node,
	})

	try {
		const res = await fetch(HTTP_URL, { method: "POST", body })
		const cmd: Command = await res.json()
		return cmd
	} catch (e) {
		console.error(e)
	}

	return null
}

//
// Deactivates node
//
interface DeactivateNode {
	node: string
}

export const deactivateNode = async ({ node }: DeactivateNode): Promise<Command | null> => {
	const body = JSON.stringify({
		action: DEACTIVATE_NODE,
		node,
	})

	try {
		const res = await fetch(HTTP_URL, { method: "POST", body })
		const cmd: Command = await res.json()
		return cmd
	} catch (e) {
		console.error(e)
	}

	return null
}

//
// Subscriber
//

//
// Activate websocket that subscriber subscribes to
//
interface ActivateWS {
	node: string
}

export const activateWS = async ({ node }: ActivateWS): Promise<Command | null> => {
	const body = JSON.stringify({
		action: ACTIVATE_WS,
		node,
	})

	try {
		const res = await fetch(HTTP_URL, { method: "POST", body })
		const cmd: Command = await res.json()
		return cmd
	} catch (e) {
		console.error(e)
	}

	return null
}

//
// Deactivate websocket that subscriber subscribes to
//
interface DeactivateWS {
	node: string
}

export const deactivateWS = async ({ node }: DeactivateWS): Promise<Command | null> => {
	const body = JSON.stringify({
		action: DEACTIVATE_WS,
		node,
	})

	try {
		const res = await fetch(HTTP_URL, { method: "POST", body })
		console.log(res)
		const cmd: Command = await res.json()
		console.log(cmd)
		return cmd
	} catch (e) {
		console.error(e)
	}

	return null
}

//
// Set URL for websocket
//
interface UpdateURL {
	node: string
	url: string
}

export const updateURL = async ({ node, url }: UpdateURL): Promise<Command | null> => {
	const body = JSON.stringify({
		action: UPDATE_URL,
		node,
		url,
	})

	try {
		const res = await fetch(HTTP_URL, { method: "POST", body })
		const cmd: Command = await res.json()
		return cmd
	} catch (e) {
		console.error(e)
	}

	return null
}

//
// Publisher
//

//
// Set URL for websocket
//
// interface UpdateURL {
// 	node: string
// 	url: string
// }

// export const updateURL = async ({ node, url }: UpdateURL): Promise<Command | null> => {
// 	const body = JSON.stringify({
// 		action: UPDATE_URL,
// 		node,
// 		url,
// 	})

// 	try {
// 		const res = await fetch(HTTP_URL, { method: "POST", body })
// 		const cmd: Command = await res.json()
// 		return cmd
// 	} catch (e) {
// 		console.error(e)
// 	}

// 	return null
// }