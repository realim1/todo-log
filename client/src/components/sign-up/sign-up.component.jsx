import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";

import "./sign-up.style.scss";

const validate = (values) => {
	const errors = {};

	//Email Address Validations
	if (!values.email) {
		errors.email = "Required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = "Invalid email address";
	}

	//Password Validations
	if (!values.password) {
		errors.password = "Required";
	} else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
		errors.password =
			"Password must have minimum eight characters, at least one letter and one number";
	}

	//Confirm Password Validations
	if (!values.confirmPassword) {
		errors.confirmPassword = "Required";
	} else if (values.confirmPassword !== values.password) {
		errors.confirmPassword = "Password does not match";
	}

	return errors;
};

const SignUp = () => {
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		validate,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<Card style={{ width: "30rem" }}>
			<Card.Header>Sign Up</Card.Header>
			<Card.Body>
				<Form noValidate onSubmit={formik.handleSubmit}>
					<Form.Group className='mb-4' controlId='signUpEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							required
							name='email'
							type='email'
							value={formik.values.email}
							onChange={formik.handleChange}
							placeholder='Enter email'
							isInvalid={!!formik.errors.email}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.email}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId='signUpPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							required
							name='password'
							type='password'
							value={formik.values.password}
							onChange={formik.handleChange}
							placeholder='Password'
							isInvalid={!!formik.errors.password}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.password}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId='signUpConfirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							required
							name='confirmPassword'
							type='password'
							value={formik.values.confirmPassword}
							onChange={formik.handleChange}
							placeholder='Password'
							isInvalid={formik.errors.confirmPassword}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.confirmPassword}
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
