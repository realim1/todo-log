import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

import "./sign-up.style.scss";

const SignUp = () => {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		console.log(form);
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
	};
	return (
		<Card style={{ width: "30rem" }}>
			<Card.Header>Sign Up</Card.Header>
			<Card.Body>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group className='mb-4' controlId='signUpEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control required type='email' placeholder='Enter email' />
						<Form.Control.Feedback type='invalid'>
							Please enter a valid email address.
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId='signUpPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control required type='password' placeholder='Password' />
						<Form.Control.Feedback type='invalid'>
							Please enter a valid password
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId='signUpConfirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control required type='password' placeholder='Password' />
						<Form.Control.Feedback type='invalid'>
							Please enter a valid password.
						</Form.Control.Feedback>
					</Form.Group>

					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default SignUp;
