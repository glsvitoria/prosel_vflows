import { useField } from '@unform/core'
import { InputHTMLAttributes, useEffect, useRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string
}

export default function Input({ name, ...rest }: InputProps) {
	const inputRef = useRef(null)
	const { fieldName, registerField, defaultValue, error } = useField(name)

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		})
	}, [fieldName, registerField])

	return (
		<div className="flex flex-col items-center w-full">
			<input
				ref={inputRef}
				className="border-black/20 border-[1px] rounded-lg md:w-4/5 w-full h-10 pl-2 sm:text-base text-sm"
				{...rest}
			/>
			{error && (
				<span className="text-error font-semibold mt-2 mb-[-8px] md:text-base text-sm text-center">
					{error}
				</span>
			)}
		</div>
	)
}
