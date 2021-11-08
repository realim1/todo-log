import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage.page";
import TodoLogPage from "../../pages/TodoLogPage/TodoLogPage.page";
import "./App.scss";

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<LoginPage />} />
			<Route path='/logs' element={<TodoLogPage />} />
		</Routes>
	);
};

export default App;
