import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { useState } from "react";
import { createNode } from "../../Clients/Flow";
import { SET_ROOT } from "../../State/Actions";
import { useDispatchContext } from "../../State/Context";

const nodeTypes = ["Publisher", "Subscriber", "Mongo"]

interface Props {
	closeDialog: () => void
}

const FormAddNode = ({ closeDialog }: Props) => {
	// Context
	const dispatch = useDispatchContext()

	// State
	const [state, setState] = useState({ name: "", type: "", hasSubmitted: false })
	const { name, type, hasSubmitted } = state

	const onChange = async (name: string) =>
		setState(state => ({ ...state, name, hasSubmitted: false }))

	const onSelect = async (type: string) =>
		setState(state => ({ ...state, type, hasSubmitted: false }))

	const onSubmit = async () => {
		setState(state => ({ ...state, hasSubmitted: true }))
		if (name === "" || type === "") return

		const id = await createNode(state)
		id && id !== "" && dispatch({ type: SET_ROOT, payload: id })
		closeDialog()
	}

	// Validations
	const nameError = hasSubmitted && name === ""
	const typeError = hasSubmitted && type === ""

	return (
		<>
			<TextField
				value={name}
				onChange={e => onChange(e.target.value)}
				error={nameError}
				helperText={nameError && "node must have a name"}
				label="Name"
				fullWidth
			/>
			<Box m={2} />
			<FormControl error={typeError} fullWidth>
				<InputLabel>Type</InputLabel>
				<Select
					value={type}
					onChange={e => onSelect(e.target.value as string)}
				>
					<MenuItem value={""} disabled>Type</MenuItem>
					{nodeTypes.map(type =>
						<MenuItem key={type} value={type}>{type}</MenuItem>
					)}
				</Select>
			</FormControl>
			<Box m={4} />
			<Grid container justify="center">
				<Button onClick={onSubmit}>Add Node</Button>
			</Grid>
			<Box m={1} />
		</>
	);
}

export default FormAddNode