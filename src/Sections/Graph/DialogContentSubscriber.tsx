import { Grid, TextField } from "@material-ui/core";
import { useEffect } from "react";
import { activateWS, deactivateWS, updateURL } from "../../Clients/Flow";
import { getNode } from "../../Models/Tree";
import { SET_SUBSCRIBER_URL } from "../../State/Actions";
import { useDispatchContext, useStateContext } from "../../State/Context";


const DialogContentSubscriber = () => {
	// context
	const dispatch = useDispatchContext()
	const { tree, selectedNode, subscriberURL } = useStateContext()
	const node = getNode(tree, selectedNode)
	const url = node?.props?.url
	const length = url?.length || 0

	useEffect(() => {
		dispatch({ type: SET_SUBSCRIBER_URL, payload: url || "" })
	}, [dispatch, url])

	// state
	const onUrlChange = (value: string) => {
		dispatch({ type: SET_SUBSCRIBER_URL, payload: value })
	}

	useEffect(() => {
		const timeout = setTimeout(async () => {
			console.log("1")
			if (subscriberURL && subscriberURL !== url) {
				console.log("2")
				await deactivateWS({ node: selectedNode })
				console.log("3")
				await updateURL({ node: node.id, url: subscriberURL })
				console.log("4")
				await activateWS({ node: selectedNode })
				console.log("5")
			}
		}, 3000);
		return () => clearTimeout(timeout)
	}, [node.id, selectedNode, subscriberURL, url])

	return (
		<Grid container alignItems="flex-end">
			<TextField
				autoFocus
				multiline
				value={subscriberURL}
				onChange={e => onUrlChange(e.target.value)}
				onFocus={e => e.target.setSelectionRange(length, length)}
				label="URL"
				fullWidth
			/>
		</Grid>
	)
}

export default DialogContentSubscriber
