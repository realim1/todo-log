import React from "react";
import { Row, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/todo-logo.svg";
import settingsIcon from "../../assets/images/settings.svg";

import "./header.style.scss";

const Header = () => {
	const navigate = useNavigate();

	const handleLogOut = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<header className='my-3 d-flex flex-wrap justify-content-between'>
			<div className='font-weight-bold'>
				<img src={logo} className='logo mr-2' alt='Logo' />
				Todo Logs
			</div>
			<Row className='dropdown show justify-content-center align-items-center'>
				<Dropdown>
					<Dropdown.Toggle as='a' id='dropdown-basic'>
						<img
							src={settingsIcon}
							className='setting-icon'
							alt='settings icon'
						/>
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item href='#' onClick={() => handleLogOut()}>
							Log Out
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Row>
		</header>
	);
};

export default Header;
