import { Dialog, DialogContent, DialogTitle } from "@material-ui/core"

interface Props {
	title?: string
	open: boolean
	onClose: () => void
	children: JSX.Element
}

export const BottomBarDialog = ({ title, open, onClose, children }: Props) => {
	return (
		<Dialog open={open} onClose={onClose} aria-labelledby="add-node-dialog" >
			{title && <DialogTitle>{title}</DialogTitle>}
			<DialogContent>
				{children}
			</DialogContent>
		</Dialog >
	)
}

export default BottomBarDialog