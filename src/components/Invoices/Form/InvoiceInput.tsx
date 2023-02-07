import { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'

interface InvoiceInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	title: string
   initialValue?: string
   disabled?: boolean
}

export default function Input({ title, name, initialValue, disabled, ...rest }: InvoiceInputProps) {
	const inputRef = useRef(null)
	const { fieldName, registerField, error } = useField(name)

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		})
	}, [fieldName, registerField])

	return (
		<label className="flex flex-col items-start w-full">
			{title}
			<input
				ref={inputRef}
				className={`border-black/20 border-[1px] rounded-lg w-4/5 h-10 pl-2 mt-2 ${disabled ? 'bg-disabled' : ''}`}
            disabled={disabled}
				{...rest}
			/>

         {error && (
				<span className="text-error text-xs font-semibold mt-2 mb-[-8px]">
					{error}
				</span>
			)}
		</label>
	)
}
