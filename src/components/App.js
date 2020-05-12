import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./Menu";
import Users from "./users/index";
import Publications from "./Publications/index";
const Tareas = () => <div>aqui estan las tareas</div>;
const App = (props) => (
	<BrowserRouter>
		<Menu />
		<div id="margen">
			<Route exact path='/' component={Users} />
			<Route exact path='/tareas' component={Tareas} />
			<Route exact path='/publicaciones/:key' component={Publications} />
		</div>
	</BrowserRouter>
);

export default App;