import React, { useState } from "react";
import { Card, Nav, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

import "./todo-log-item.style.scss";

const TodoLogItem = ({ logItem, onComplete, onRemove }) => {
	const [activeNav, setActiveNav] = useState("todos");

	const buildCardBody = (item) => {
		switch (activeNav) {
			case "todos":
				return (
					<>
						<Card.Title>Todos</Card.Title>
						{item.todos.length > 0 ? (
							logItem.todos.map((todo, index) => {
								return (
									<Card.Text key={index}>
										<Button
											variant='outline-success'
											size='sm'
											onClick={() => onComplete(logItem, index)}>
											Completed
										</Button>{" "}
										- {todo}
									</Card.Text>
								);
							})
						) : (
							<Card.Text>No todo tasks</Card.Text>
						)}
					</>
				);
			case "completed":
				return (
					<>
						<Card.Title>Completed</Card.Title>
						{item.completed.length > 0 ? (
							logItem.completed.map((completed, index) => {
								return <Card.Text key={index}>- {completed}</Card.Text>;
							})
						) : (
							<Card.Text>No completed tasks</Card.Text>
						)}
					</>
				);
			case "blockers":
				return (
					<>
						<Card.Title>Blockers</Card.Title>
						{item.blockers.length > 0 ? (
							logItem.blockers.map((blocker, index) => {
								return <Card.Text key={index}>- {blocker}</Card.Text>;
							})
						) : (
							<Card.Text>No blockers</Card.Text>
						)}
					</>
				);
			default:
				break;
		}
	};
	return (
		<Card className='mb-4'>
			<Card.Header>
				<Nav variant='pills' defaultActiveKey='#todos'>
					<Nav.Item>
						<Nav.Link href='#todos' onClick={() => setActiveNav("todos")}>
							Todos
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							href='#completed'
							onClick={() => setActiveNav("completed")}>
							Completed
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href='#blockers' onClick={() => setActiveNav("blockers")}>
							Blockers
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link onClick={() => onRemove(logItem)}>
							<Trash className='text-danger' />
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Card.Header>
			<Card.Body style={{ minHeight: "200px" }}>
				{buildCardBody(logItem)}
			</Card.Body>
			<Card.Footer className='text-muted text-center'>
				{logItem.date}
			</Card.Footer>
		</Card>
	);
};

export default TodoLogItem;
