import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

import TodoLogItem from "./components/todo-log-item/todo-log-item.component";
import InputList from "./components/input-list/input-list.component";
import "./App.scss";

function App() {
	const [todos, setTodos] = useState([""]);
	const [completeds, setCompleteds] = useState([""]);
	const [blockers, setBlockers] = useState([""]);

	const [showAddItemModal, setShowAddItemModal] = useState(false);
	const closeShowAddItemModal = () => setShowAddItemModal(false);
	const [todoLogs, setTodoLogs] = useState([]);

	const onComplete = (logItem, index) => {
		let newLogs = [...todoLogs];
		const logIndex = newLogs.findIndex((item) => item === logItem);
		const completedTodoItem = newLogs[logIndex].todos[index];

		newLogs[logIndex].todos.splice(index, 1);
		newLogs[logIndex].completed.push(completedTodoItem);

		setTodoLogs(newLogs);
	};

	const onRemove = (logItem) => {
		let newLogs = [...todoLogs];

		const logIndex = newLogs.findIndex((item) => item === logItem);
		newLogs.splice(logIndex, 1);

		setTodoLogs(newLogs);
	};

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
		setTodoLogs([...todoLogs, newLog]);
	};

	useEffect(() => {
		axios.get("http://localhost:5000/getTodoLogs").then((res) => {
			setTodoLogs(res.data);
		});
	}, []);

	return (
		<Container>
			<header className='my-3'>Todo Log</header>
			<Button
				className='text-center w-100 mb-3'
				onClick={() => setShowAddItemModal(true)}>
				Add Log Item +
			</Button>
			{todoLogs.map((logItem, index) => {
				return (
					<TodoLogItem
						key={index}
						index={index}
						logItem={logItem}
						onComplete={onComplete}
						onRemove={onRemove}
					/>
				);
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
