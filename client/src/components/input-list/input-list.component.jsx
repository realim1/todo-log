import React, { useState } from "react";
import { FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";

import "./input-list.style.scss";

const InputList = ({ label, updateParent }) => {
	const [values, setValues] = useState([""]);

	const handleChange = (values, setValues, i, e) => {
		let newValues = [...values];
		newValues[i] = e.target.value;
		setValues(newValues);
		updateParent(newValues);
	};

	const addFields = (values, setValues) => {
		setValues([...values, ""]);
	};

	const removeFields = (values, setValues, i) => {
		let newValues = [...values];
		newValues.splice(i, 1);
		setValues(newValues);
	};
	return (
		<FormGroup className='mb-3' controlId='formAddTodo'>
			<FormLabel>{label}</FormLabel>
			{values.map((value, index) => {
				return (
					<div className='d-block'>
						<FormControl
							className='mb-3 w-75 d-inline-block'
							value={value}
							type='text'
							onChange={(e) => handleChange(values, setValues, index, e)}
						/>
						{index ? (
							<Button
								type='button'
								variant='danger'
								onClick={() => removeFields(values, setValues, index)}>
								Remove -
							</Button>
						) : null}
					</div>
				);
			})}
			<Button onClick={() => addFields(values, setValues)}>Add +</Button>
		</FormGroup>
	);
};

export default InputList;
