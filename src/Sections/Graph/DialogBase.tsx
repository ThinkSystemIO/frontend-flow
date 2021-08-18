import { Box, Dialog, DialogContent, DialogTitle, Divider, Grid, Switch, Typography } from "@material-ui/core";
import { activateNode, deactivateNode } from "../../Clients/Flow";
import { getNode } from "../../Models/Tree";
import { SET_IS_NODE_DIALOG_OPEN } from "../../State/Actions";
import { useDispatchContext, useStateContext } from "../../State/Context";

interface Props {
	content: JSX.Element | null
}

const DialogBase = ({ content }: Props) => {
	// Context
	const dispatch = useDispatchContext()

	const { tree, selectedNode, isNodeDialogOpen: open } = useStateContext()
	const node = getNode(tree, selectedNode)

	const toggleActive = async (activate: boolean) => activate ?
		await activateNode({ node: node.id }) :
		await deactivateNode({ node: node.id })

	const onClose = () =>
		dispatch({ type: SET_IS_NODE_DIALOG_OPEN, payload: false })

	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby={`${node.type}-config-dialog`}
		>
			<DialogTitle>{node.type.toUpperCase()}</DialogTitle>
			<Divider />
			<Divider />
			<DialogContent>
				<Typography variant="h6">ID</Typography>
				<Box m={0.1} />
				<Typography variant="body1">{node?.id}</Typography>
				<Box m={1} />
				<Typography variant="h6">Name</Typography>
				<Box m={0.1} />
				<Typography variant="body1">{node?.name}</Typography>
				<Box m={1} />
			</DialogContent>
			{content &&
				<>
					<Divider />
					<Divider />
					<DialogContent>
						{content}
					</DialogContent>
					<Box m={1} />
				</>
			}
			<Divider />
			<Divider />
			<DialogContent>
				<Grid container justify="center">
					<Switch checked={node?.active} onChange={e => toggleActive(e.target.checked)} />
				</Grid>
			</DialogContent>
		</Dialog>
	)
}

export default DialogBase
