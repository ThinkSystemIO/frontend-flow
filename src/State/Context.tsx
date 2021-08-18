import { createContext, useContext, useEffect, useReducer } from "react"
import { subscribeTree } from "../Clients/Flow"
import { Action } from "./Actions"
import { initialState, State } from "./Model"
import { reducer } from "./Reducer"

export type Dispatch = React.Dispatch<Action>

interface Context {
	state: State,
	dispatch: Dispatch
}

interface StateProviderProps {
	children: React.ReactNode
}

export const StateContext = createContext<Context | null>(null)

const StateProvider = ({ children }: StateProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const context = { state, dispatch }

	useEffect(() => {
		subscribeTree({ dispatch })
	}, [])

	return (
		<StateContext.Provider value={context}>
			{children}
		</StateContext.Provider>
	)
}

function useDispatchContext() {
	const context = useContext(StateContext)
	if (!context) throw new Error("useDispatch context cannot be null and must be used within the StateProvider")
	return context.dispatch
}

function useStateContext() {
	const context = useContext(StateContext)
	if (!context) throw new Error("useState context cannot be null and must be used within the StateProvider")
	return context.state
}

export { StateProvider, useDispatchContext, useStateContext }

