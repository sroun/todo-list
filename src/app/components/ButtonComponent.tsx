import React from "react";

interface props {
	children: any,
	className?: string
}

const ButtonComponent = ({ className, children }: props) => {
	return <button className={`${className} px-3 py-2 rounded`} >{children}</button>
}


export default ButtonComponent;