import React from "react";
import ButtonComponent from "@/components/ButtonComponent";

interface props {
	id: number,
	todo: string,
	isCompleted: boolean,
	createdAt: any
}

const ItemComponent = (props: props) => {
	const { id, todo, isCompleted, createdAt } = props
	return (
		<div className="bg-gray-100 py-2 px-3 rounded hover:bg-gray-50 duration-300 transition group relative overflow-hidden">
		<p className={`font-semibold ${isCompleted ? 'line-through' : ''}`}>{todo}</p>
		<small className="text-xs text-gray-400">{createdAt}</small>
		<div className="flex space-x-2 absolute right-0 bottom-0 mr-4 mb-2 hidden group-hover:block">
			{
				!isCompleted && <ButtonComponent className="text-xs bg-blue-600 text-white py-1">Mark as Complete</ButtonComponent>
			}
			{
				isCompleted && <ButtonComponent className="text-xs bg-blue-700 py-1 text-white">Mark as Incomplete</ButtonComponent>
			}
			<ButtonComponent className="text-xs bg-yellow-500 py-1">Edit</ButtonComponent>
			<ButtonComponent className="text-xs bg-red-500 text-gray-200 py-1">Remove</ButtonComponent>
		</div>
	</div>
	)
}

export default ItemComponent;