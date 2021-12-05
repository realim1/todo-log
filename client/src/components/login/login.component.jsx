import React from "react";
import axios from "axios";
import { Card, Form, Button, Col, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "./login.style.scss";

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

	return errors;
};

const Login = () => {
	const navigate = useNavigate();
	const onSubmit = (values) => {
		axios
			.post("/login", values)
			.then((res) => {
				if (res.status === 201) {
					localStorage.token = res.data;
					navigate("/logs");
				}
			})
			.catch((error) => {
				if (error.response) {
					alert(error.response.data);
				}
			});
	};
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		validate,
		onSubmit,
	});

	return (
		<Card style={{ width: "30rem" }}>
			<Card.Header>Login</Card.Header>
			<Card.Body>
				<Form noValidate onSubmit={formik.handleSubmit}>
					<Form.Group className='mb-4' controlId='loginEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							required
							name='email'
							type='email'
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder='Enter email'
							isInvalid={formik.touched.email && !!formik.errors.email}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.email}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group controlId='loginPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							required
							name='password'
							type='password'
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder='Password'
							isInvalid={formik.touched.password && !!formik.errors.password}
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.password}
						</Form.Control.Feedback>
					</Form.Group>
					<Row className='justify-content-center align-items-center'>
						<Button variant='primary' type='submit'>
							Submit
						</Button>
					</Row>
				</Form>

				<Col className='mt-4'>
					<Row className='justify-content-center align-items-center'>
						<Button
							variant='link'
							className='text-align-center'
							onClick={() => navigate("/signup")}>
							Don't have an account?
						</Button>
					</Row>
				</Col>
			</Card.Body>
		</Card>
	);
};

export default Login;
