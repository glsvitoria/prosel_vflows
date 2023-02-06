import { useField } from '@unform/core'
import { useEffect, useRef } from 'react'

interface InputProps {
	name: string
}

function Input({ name, ...rest }: InputProps) {
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
		<div className='flex flex-col items-center w-full'>
			<input
				ref={inputRef}
				className="border-black/20 border-[1px] rounded-lg w-4/5 h-10 pl-2"
				{...rest}
			/>
         {error && <span className='text-error font-semibold mt-2 mb-[-8px]'>{error}</span>}
		</div>
	)
}

export default Input
