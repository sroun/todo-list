'use client'

import https from "@/libs/http";
import { useEffect, useState } from "react";

type InputComponentProp = {
	selectedItem: any,
	onFilterChange: (filterValue:string) => void,
	filteredExactItems: Array<string>
}

const InputComponent = ({ selectedItem, onFilterChange, filteredExactItems }: InputComponentProp) => {
	const [model, setModel] = useState({
		todo: '',
		taskId: ''
	});
	const [error, setError] = useState({
		required: false,
		duplicated: false
	});

	const handleInputChange = (e:any) => {
		setModel({...model, todo: e.target.value })
		onFilterChange(e.target.value)
	}

	const clearInput = () => {
		setError({ ...error, required: false, duplicated: false})
		setModel({ ...model, todo: '', taskId: '' })
	}

	const handleSubmit = (event:any) => {
		event.preventDefault()
		if(model.todo.length == 0) {
			setError({ ...error, required: true})
			return
		}
		// validate duplicate should do it on server because client fetch as paging 
		if(filteredExactItems.length > 0) {
			setError({ ...error, duplicated: true })
			return
		}

		// call to clear search text
		onFilterChange('')
		
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
			{ error.duplicated && (
				<div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
					<span className="font-medium">Warning alert!</span> Adding duplicate tasks is not allowed.
				</div>
			) }
			<input
				id="todo"
				name="todo"
				value={model.todo}
				type="text"
				className={`w-full py-2 px-3 rounded-md outline-none ${error.required ? 'border-red-600 border' : 'border' }`}
				placeholder="Try typing..."
				onChange={handleInputChange}
			/>
		</form>
	</div>
}

export default InputComponent;