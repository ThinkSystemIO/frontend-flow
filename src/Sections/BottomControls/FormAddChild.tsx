import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { useState } from "react";
import { addChild } from "../../Clients/Flow";
import { useStateContext } from "../../State/Context";

interface Props {
	closeDialog: () => void
}

const FormAddChild = ({ closeDialog }: Props) => {
	// Context
	const { tree: { nodes } } = useStateContext()

	// State
	const [state, setState] = useState({ parent: "", child: "", pipeline: "", hasSubmitted: false })
	const { parent, child, pipeline, hasSubmitted } = state

	const onParentSelect = async (parent: string) =>
		setState(state => ({ ...state, parent, hasSubmitted: false }))

	const onChildSelect = async (child: string) =>
		setState(state => ({ ...state, child, hasSubmitted: false }))

	const onPipelineChange = async (pipeline: string) =>
		setState(state => ({ ...state, pipeline, hasSubmitted: false }))

	const onSubmit = async () => {
		setState(state => ({ ...state, hasSubmitted: true }))
		if (parent === "" || child === "" || pipeline === "") return
		await addChild(state)
		closeDialog()
	}

	// Validations
	const parentError = hasSubmitted && parent === ""
	const childError = hasSubmitted && child === ""
	const pipelineError = hasSubmitted && pipeline === ""

	// Derivations
	const selectableParentNodes = Object.values(nodes).filter(node => node.id !== child)
	const selectableChildNodes = Object.values(nodes).filter(node => node.id !== parent)

	return (
		<>
			<TextField
				value={pipeline}
				onChange={e => onPipelineChange(e.target.value)}
				error={pipelineError}
				helperText={pipelineError && "pipeline must have a name"}
				label="Pipeline Name"
				fullWidth
			/>
			<Box m={2} />
			<FormControl error={parentError} fullWidth>
				<InputLabel>Parent Node</InputLabel>
				<Select
					value={parent}
					onChange={e => onParentSelect(e.target.value as string)}
				>
					{selectableParentNodes.map(({ id, name }) =>
						<MenuItem key={id} value={id}>{name}</MenuItem>
					)}
				</Select>
			</FormControl>
			<Box m={2} />
			<FormControl error={childError} fullWidth>
				<InputLabel>Child Node</InputLabel>
				<Select
					value={child}
					onChange={e => onChildSelect(e.target.value as string)}
				>
					{selectableChildNodes.map(({ id, name }) =>
						<MenuItem key={id} value={id}>{name}</MenuItem>
					)}
				</Select>
			</FormControl>
			<Box m={4} />
			<Grid container justify="center">
				<Button onClick={onSubmit}>Add Pipeline</Button>
			</Grid>
			<Box m={1} />
		</>
	);
}

export default FormAddChild