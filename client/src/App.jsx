import React, { useState } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import TodoLogItem from "./components/todo-log-item/todo-log-item.component";
import InputList from "./components/input-list/input-list.component";
import "./App.scss";

function App() {
	const [todos, setTodos] = useState([""]);
	const [completeds, setCompleteds] = useState([""]);
	const [blockers, setBlockers] = useState([""]);

	const [showAddItemModal, setShowAddItemModal] = useState(false);
	const closeShowAddItemModal = () => setShowAddItemModal(false);
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

	const handleSubmit = (e) => {
		const date = new Date();

		const formatedDate =
			date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

		e.preventDefault();
		const newLog = {
			date: formatedDate,
			todos: todos.filter((item) => item),
			completed: completeds.filter((item) => item),
			blockers: blockers.filter((item) => item),
		};
		setTestData([...testData, newLog]);
	};

	return (
		<Container>
			<header className='my-3'>Todo Log</header>
			<Button
				className='text-center w-100 mb-3'
				onClick={() => setShowAddItemModal(true)}>
				Add Log Item +
			</Button>
			{testData.map((logItem, index) => {
				return <TodoLogItem key={index} logItem={logItem} />;
			})}
			<Modal show={showAddItemModal}>
				<Modal.Header>
					<Modal.Title>Log Form</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
						<InputList label='Todos' updateParent={setTodos} />
						<InputList label='Completed' updateParent={setCompleteds} />
						<InputList label='Blockers' updateParent={setBlockers} />
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={closeShowAddItemModal}>
							Close
						</Button>
						<Button
							variant='primary'
							type='submit'
							onClick={closeShowAddItemModal}>
							Submit
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</Container>
	);
}

export default App;
