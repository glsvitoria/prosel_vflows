import { useState } from 'react'
import { Form } from '@unform/web'

import InvoiceInput from './Form/InvoiceInput'

export default function TechnicalRetention() {
	const [isClicked, setIsClicked] = useState(false)

	return (
		<div>
			<label className="text-xl flex items-center">
				<input
					type="checkbox"
					name="technicalRetention"
					id="technicalRetention"
					className="mr-4 w-6 h-6"
					onChange={() => setIsClicked(!isClicked)}
				/>
				Retenção de Técnica
			</label>

			{isClicked && (
				<div className="border-[1px] border-no_black rounded-lg mt-12 mb-16 relative p-10">
					<h4 className="absolute text-xl -top-4 bg-white w-40 text-center">
						Dados
					</h4>
					<Form onSubmit={() => console.log('oi')} className="flex">
						<InvoiceInput
							name="amount"
							title="Valor"
							id="amount"
							disabled
						/>
						<InvoiceInput
							name="percentage"
							title="Percentual"
							id="percentage"
							disabled
						/>
					</Form>
				</div>
			)}
		</div>
	)
}
