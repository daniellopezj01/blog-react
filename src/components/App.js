import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./Menu";
import Users from "./users/index";
import Publications from "./Publications/index";
import Tasks from "./Tasks/index";
import SaveTask from "./Tasks/Save";
const App = (props) => (
	<BrowserRouter>
		<Menu />
		<div id="margen">
			<Route exact path='/' component={Users} />
			<Route exact path='/tareas' component={Tasks} />
			<Route exact path='/publicaciones/:key' component={Publications} />
			<Route exact path='/tareas/guardar' component={SaveTask} />
		</div>
	</BrowserRouter>
);

export default App;