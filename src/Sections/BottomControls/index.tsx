import { useMemo, useState } from "react"
import BottomBar from "./BottomBar"
import BottomBarDialog from "./BottomBarDialog"
import FormAddChild from "./FormAddChild"
import FormAddNode from "./FormAddNode"
import FormSetRoot from "./FormSetRoot"

export const ADD_NODE = "ADD_NODE"
export const ADD_CHILD = "ADD_CHILD"
export const SET_ROOT = "SET_ROOT"

const BottomControls = () => {
	// State
	const [state, setState] = useState({ isDialogOpen: false, buttonPressed: "" })
	const { buttonPressed, isDialogOpen } = state

	const openDialog = (buttonPressed: string) =>
		setState(state => ({ ...state, buttonPressed, isDialogOpen: true }))

	const closeDialog = () =>
		setState(state => ({ ...state, buttonPressed: "", isDialogOpen: false }))

	const content = useMemo(() => {
		if (buttonPressed === ADD_NODE) return <FormAddNode closeDialog={closeDialog} />
		if (buttonPressed === ADD_CHILD) return <FormAddChild closeDialog={closeDialog} />
		if (buttonPressed === SET_ROOT) return <FormSetRoot closeDialog={closeDialog} />
		return <></>
	}, [buttonPressed])

	const title = useMemo(() => {
		if (buttonPressed === SET_ROOT) return "Set Root"
	}, [buttonPressed])

	return (
		<>
			<BottomBar openDialog={openDialog} />
			<BottomBarDialog open={isDialogOpen} onClose={closeDialog} title={title}>
				{content}
			</BottomBarDialog>
		</>
	)
}


export default BottomControls
