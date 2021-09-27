import React, { useState } from "react";
import { Container } from "react-bootstrap";
import TodoLogItem from "./components/todo-log-item/todo-log-item.component";
import "./App.scss";

function App() {
	const [testData, setTestData] = useState([
		{
			date: "1/2/22",
			todos: [
				"replicate issue",
				"fix bugs",
				"write documentation",
				"replicate issue",
				"fix bugs",
				"write documentation",
			],
			completed: ["Resolved issue with application"],
			blockers: ["Cannot access IT tickets", "Mouse was replaced with rat"],
		},
		{
			date: "1/3/22",
			todos: ["fix bugs", "write documentation"],
			completed: ["Resolved issue with application"],
			blockers: ["Cannot access IT tickets", "Mouse was replaced with rat"],
		},
		{
			date: "1/4/22",
			todos: ["replicate issue", "fix bugs", "write documentation"],
			completed: ["Resolved issue with application"],
			blockers: [],
		},
	]);

	return (
		<Container>
			<header className='my-3'>Todo Log</header>
			{testData.map((logItem, index) => {
				return <TodoLogItem key={index} logItem={logItem} />;
			})}
		</Container>
	);
}

export default App;
