import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import SignUp from "../../components/sign-up/sign-up.component";
import Login from "../../components/login/login.component";

import "./LoginPage.style.scss";

const LoginPage = () => {
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
