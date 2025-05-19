import { ReactElement } from "react";

interface ButtonProps{
    variant: "primary"|"secondary";
    text: string;
    startIcon?:ReactElement;
    onClick?: ()=>void;
    fullWidth?:boolean;
    loading?:boolean;
}

const variantClasses = {
    "primary":"bg-black text-white",
    "secondary":"bg-gray-600 text-white"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center hover:bg-gray-800 transition"

export function Button({variant,text,startIcon,onClick,fullWidth,loading}: ButtonProps){
    return <button onClick={onClick} className={variantClasses[variant] + " " + defaultStyles+`${fullWidth ? " w-full flex justify-center items-center":""} ${loading ? " opacity-45":""}`} disabled={loading}>
        {startIcon && <div className="pr-2">
        {startIcon}
        </div>}
        {text}
    </button>
}