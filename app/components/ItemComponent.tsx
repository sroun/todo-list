import https from "@/libs/http";
import ButtonComponent from "./ButtonComponent";

type props = {
	id: string,
	todo: string,
	isCompleted: boolean,
	createdAt: any
}

const localDate = (dateString:string) => new Date(dateString).toLocaleString()

const handleDeleteAction = (id:string) => {
	https.delete(`/api/todo/${id}`)
		.then(({ data }) => {
			// alert message but in testing no need to alert
			console.log(data.message);
		})
		.catch((error:any) =>{
			// alert message error 
			console.log(error)
		})
}

const handleUpdateStatus = (id: string) => {
	https.get(`/api/todo/mark-task/${id}`)
		.then(({ data }) => {
			// alert message but in testing no need to alert
			console.log(data.message);
		})
		.catch((error: any) => {
			// alert message error 
			console.log(error)
		})
}

const ItemComponent = (props: props, taskId: any, callBack:any) => {
	const { id, todo, isCompleted, createdAt } = props
	return <div key={taskId} className="bg-gray-100 py-2 px-3 rounded hover:bg-gray-50 duration-300 transition group relative overflow-hidden">
		<p className={`font-semibold ${isCompleted ? 'line-through' : ''}`}>{todo}</p>
		<small className="text-xs text-gray-400">{localDate(createdAt)}</small>
		<div className="hidden group-hover:block">
			<div className="flex space-x-2 absolute right-0 bottom-0 mr-4 mb-2">
				{
					!isCompleted && <ButtonComponent 
						onClick={() => handleUpdateStatus(taskId)}
						className="text-xs bg-blue-600 text-white py-1">Mark as Complete</ButtonComponent>
				}
				{
					isCompleted && <ButtonComponent 
						onClick={() => handleUpdateStatus(taskId)}
						className="text-xs bg-blue-700 py-1 text-white">Mark as Incomplete</ButtonComponent>
				}
				<ButtonComponent className="text-xs bg-yellow-500 py-1"
					onClick={() => callBack({ taskId, ...props })}
				>Edit</ButtonComponent>
				<ButtonComponent className="text-xs bg-red-500 text-gray-200 py-1"
					onClick={() => handleDeleteAction(taskId) }
				>Remove</ButtonComponent>
			</div>
		</div>
	</div>
}

export default ItemComponent;