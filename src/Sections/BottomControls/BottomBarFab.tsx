import { Fab } from "@material-ui/core"
import { useStyles } from "../../Styles/Hooks"

interface Props {
	icon: JSX.Element
	onClick: () => void
}

const BottomBarFab = ({ icon, onClick }: Props) => {
	const { fab } = useStyles({ theme: "dark" })

	return (
		<Fab className={fab} onClick={onClick}>
			{icon}
		</Fab>
	)
}

export default BottomBarFab