type props = {
	children: any,
	className?: string,
	onClick?: any
}

const ButtonComponent = ({ className, children, onClick }: props) => {
	return <button className={`${className} px-3 py-2 rounded`} onClick={onClick} >{children}</button>
}


export default ButtonComponent;