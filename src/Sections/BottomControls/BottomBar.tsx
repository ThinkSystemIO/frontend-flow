import { Grid } from "@material-ui/core"
import { Grain, Lens, LinearScale } from "@material-ui/icons"
import { ADD_CHILD, ADD_NODE, SET_ROOT } from "."
import { useStyles } from "../../Styles/Hooks"
import BottomBarFab from "./BottomBarFab"

interface Props {
	openDialog: (buttonPressed: string) => void
}

const BottomBar = ({ openDialog }: Props) => {
	const { bottomBar } = useStyles({ theme: "dark" })

	return (
		<Grid
			className={bottomBar}
			container
			justify="space-evenly"
			alignItems="center"
		>
			<Grid item>
				<BottomBarFab
					icon={<Lens />}
					onClick={() => openDialog(ADD_NODE)}
				/>
			</Grid>
			<Grid item>
				<BottomBarFab
					icon={<LinearScale />}
					onClick={() => openDialog(ADD_CHILD)}
				/>
			</Grid>
			<Grid item>
				<BottomBarFab
					icon={<Grain />}
					onClick={() => openDialog(SET_ROOT)}
				/>
			</Grid>
		</Grid>
	)
}

export default BottomBar
