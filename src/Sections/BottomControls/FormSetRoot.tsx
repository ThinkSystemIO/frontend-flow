import { List, ListItem } from "@material-ui/core";
import { SET_ROOT } from "../../State/Actions";
import { useDispatchContext, useStateContext } from "../../State/Context";

interface Props {
	closeDialog: () => void
}

const FormSetRoot = ({ closeDialog }: Props) => {
	// Context
	const dispatch = useDispatchContext()
	const { tree: { nodes } } = useStateContext()

	const onClick = (id: string) => {
		id && dispatch({ type: SET_ROOT, payload: id })
		closeDialog()
	}

	return (
		<List>
			{Object.values(nodes).map(({ id, name }) => (
				<ListItem key={id} button onClick={() => onClick(id)} >
					{name}
				</ListItem>
			))}
		</List>
	);
}

export default FormSetRoot