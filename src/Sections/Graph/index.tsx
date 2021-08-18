import { getNode } from "../../Models/Tree";
import { useStateContext } from "../../State/Context";
import { MONGO, PUBLISHER, SUBSCRIBER } from "../../Types";
import DialogBase from "./DialogBase";
import DialogContentMongo from "./DialogContentMongo";
import DialogContentPublisher from "./DialogContentPublisher";
import DialogContentSubscriber from "./DialogContentSubscriber";
import ThreeJSBridge from "./ThreeJSBridge";

const Graph = () => {
    const { tree, selectedNode } = useStateContext()
    const node = getNode(tree, selectedNode)

    const selectContent = (type: string) => {
        if (type === PUBLISHER) return DialogContentPublisher()
        if (type === SUBSCRIBER) return DialogContentSubscriber()
        if (type === MONGO) return DialogContentMongo()
        return null
    }

    return (
        <>
            {node && <DialogBase content={selectContent(node.type)} />}
            <ThreeJSBridge />
        </>
    )
}

export default Graph
