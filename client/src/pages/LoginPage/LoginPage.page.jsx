import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import SignUp from "../../components/sign-up/sign-up.component";
import Login from "../../components/login/login.component";

import "./LoginPage.style.scss";

const LoginPage = () => {
	const navigate = useNavigate();
	useEffect(() => {
		if (localStorage.token) {
			navigate("/logs");
		}
	}, [navigate]);

	return (
		<Container className='d-flex justify-content-center align-items-center vh-100'>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/' element={<Navigate to='/login' replace={true} />} />
			</Routes>
		</Container>
	);
};

export default LoginPage;
