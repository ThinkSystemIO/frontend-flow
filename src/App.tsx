import React from 'react';
import "./App.css";
import BottomBar from './Sections/BottomControls';
import Graph from './Sections/Graph';
import { StateProvider } from './State/Context';
import { DARK_DARK } from './Styles/Colors';


const App = () => {
	return (
		<StateProvider>
			<Layout />
		</StateProvider>
	);
}

const Layout = () => {
	return (
		<div style={style} >
			<Graph />
			<BottomBar />
		</div >
	)
}

const style = {
	width: "100vw",
	height: "100vh",
	backgroundColor: DARK_DARK,
	zIndex: -1,
	display: "flex",
	justifyContent: "center",
	alignItems: "center"
}

export default App;
