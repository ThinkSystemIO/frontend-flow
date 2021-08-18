import { Canvas } from "@react-three/fiber"
import { nodeIsValidAndHasPosition } from "../../Models/Node"
import { pipelineIsValidAndHasPosition } from "../../Models/Pipeline"
import { getNode, getPipeline } from "../../Models/Tree"
import { StateContext, useStateContext } from "../../State/Context"
import { Tree, TreeNode, TreePipeline } from "../../Types"
import ThreeJSControls from "./ThreeJSControls"
import ThreeJSNode from "./ThreeJSNode"
import ThreeJSPipe from "./ThreeJSPipe"

const ThreeJSBridge = () => {
	return (
		<StateContext.Consumer>
			{value => (
				<Canvas camera={{ position: [0, 0, -50] }}>
					<StateContext.Provider value={value}>
						<ThreeJSContent />
					</StateContext.Provider >
				</Canvas>
			)}
		</StateContext.Consumer>
	)
}

const ThreeJSContent = () => {
	const { tree, root } = useStateContext()

	const node = getNode(tree, root)
	const nodesToRender = [] as TreeNode[]
	const pipelinesToRender = [] as TreePipeline[]

	node && dfs({ tree, node, nodesToRender, pipelinesToRender })

	return (
		<>
			<ThreeJSControls />
			<ambientLight />
			{nodesToRender.map(node =>
				nodeIsValidAndHasPosition(node) &&
				<ThreeJSNode key={node.id} node={node} />
			)}
			{pipelinesToRender.map(pipe =>
				pipelineIsValidAndHasPosition(pipe) &&
				<ThreeJSPipe key={pipe.id} from={pipe.from} to={pipe.to} />
			)}
		</>
	)
}

interface DFS {
	tree: Tree
	node: TreeNode,
	nodesToRender: TreeNode[]
	pipelinesToRender: TreePipeline[]
}

const dfs = ({ tree, node, nodesToRender, pipelinesToRender }: DFS) => {
	nodesToRender.push(node)

	for (const [childID, pipelineID] of Object.entries(node.children)) {
		dfs({ tree, node: getNode(tree, childID), nodesToRender, pipelinesToRender })
		pipelinesToRender.push(getPipeline(tree, pipelineID))
	}
}

export default ThreeJSBridge