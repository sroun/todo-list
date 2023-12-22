'use client'

import https from "@/libs/http";
import { useEffect, useState } from "react";


const InputComponent = ({ selectedItem }: { selectedItem:any}) => {
	const [model, setModel] = useState({
		todo: '',
		taskId: ''
	});
	const [error, setError] = useState(false);

	const handleInputChange = (e:any) => {
		setModel({...model, todo: e.target.value })
	}

	const clearInput = () => {
		setError(false)
		setModel({ ...model, todo: '', taskId: '' })
	}

	const handleSubmit = (event:any) => {
		event.preventDefault()
		if(model.todo.length == 0) {
			setError(true)
			return
		}

		if(model.taskId) {
			return https.put(`/api/todo/${model.taskId}`, model)
				.then(({ data }) => {
					console.log(data.message)
					clearInput()
				})
				.catch((error: any) => {
					// alert message error 
					console.log(error)
				})
		}

		// set loading dedicator before call api
		https.post('/api/todo', model)
			.then(({ data  }) => {
				console.log(data.message)
				clearInput()
			})
			.catch((error: any) => {
				// alert message error 
				console.log(error)
			})
	}

	useEffect(() => {
		if(selectedItem){
			setModel({ ...model, todo: selectedItem.todo, taskId: selectedItem.taskId })
		}
	}, [selectedItem])

	return <div>
		<form onSubmit={handleSubmit}>
			{ error }
			<input
				value={model.todo}
				type="text"
				className={`w-full py-2 px-3 rounded-md outline-none ${error ? 'border-red-600 border' : 'border' }`}
				placeholder="Try typing..."
				onChange={handleInputChange}
			/>
		</form>
	</div>
}

export default InputComponent;