import React, { useState } from "react";
import { Card, Nav } from "react-bootstrap";

import "./todo-log-item.style.scss";

const TodoLogItem = ({ logItem }) => {
	const [activeNav, setActiveNav] = useState("todos");

	const buildCardBody = (item) => {
		switch (activeNav) {
			case "todos":
				return (
					<>
						<Card.Title>Todos</Card.Title>
						{item.todos.map((todo, index) => {
							return <Card.Text key={index}>- {todo}</Card.Text>;
						})}
					</>
				);
			case "completed":
				return (
					<>
						<Card.Title>Completed</Card.Title>
						{item.completed.map((completedTasks, index) => {
							return <Card.Text key={index}>- {completedTasks}</Card.Text>;
						})}
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
