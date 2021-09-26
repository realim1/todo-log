import React, { useState } from "react";
import { Container, Card, Nav } from "react-bootstrap";
import "./App.scss";

function App() {
	const [testData, setTestData] = useState([
		{
			date: "1/2/22",
			todos: ["replicate issue", "fix bugs", "write documentation"],
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
			blockers: ["Cannot access IT tickets", "Mouse was replaced with rat"],
		},
	]);

	return (
		<Container className='App'>
			<header className='my-3'>Todo Log</header>
			{testData.map((item) => {
				return (
					<Card className='mb-4'>
						<Card.Header>
							<Nav variant='pills' defaultActiveKey='#first'>
								<Nav.Item>
									<Nav.Link href='#first'>Todos</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link href='#completed'>Completed</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link href='#blockers'>Blockers</Nav.Link>
								</Nav.Item>
							</Nav>
						</Card.Header>
						<Card.Body>
							<Card.Title className='left-align'>Todo</Card.Title>
							{item.todos.map((todo) => {
								return <Card.Text>- {todo}</Card.Text>;
							})}
						</Card.Body>
						<Card.Footer className='text-muted text-center'>
							{item.date}
						</Card.Footer>
					</Card>
				);
			})}
		</Container>
	);
}

export default App;
