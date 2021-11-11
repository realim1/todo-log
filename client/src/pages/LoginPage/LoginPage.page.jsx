import React from "react";
import { Container } from "react-bootstrap";
import SignUp from "../../components/sign-up/sign-up.component";

import "./LoginPage.style.scss";

const LoginPage = () => {
	return (
		<Container className='d-flex justify-content-center align-items-center vh-100'>
			<SignUp />
		</Container>
	);
};

export default LoginPage;
