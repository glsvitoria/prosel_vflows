import { useEffect, useRef, useState } from 'react'
import { Form } from '@unform/web'

import InvoiceInput from './Form/InvoiceInput'
import { IInvoice } from '../../@types/interfaces'

interface TaxesRetentionProps {
	invoice: IInvoice | undefined
}

export default function TaxesRetention({ invoice }: TaxesRetentionProps) {
	const [isClicked, setIsClicked] = useState(false)
	const formRef = useRef(null)

	useEffect(() => {
		if (!invoice) return
		console.log(invoice.taxesRetention.ISSQN)
		formRef.current.setData({
			ISSQN: invoice.taxesRetention.ISSQN,
			IRRF: invoice.taxesRetention.IRRF,
			CSLL: invoice.taxesRetention.CSLL,
			COFINS: invoice.taxesRetention.COFINS,
         INSS: invoice.taxesRetention.INSS,
         PIS: invoice.taxesRetention.PIS
		})
	}, [invoice])

	return (
		<div>
			<label className="text-xl flex items-center mb-16">
				<input
					type="checkbox"
					name="taxesRetention"
					id="taxesRetention"
					className="mr-4 w-6 h-6"
					onChange={() => setIsClicked(!isClicked)}
				/>
				Retenção de Impostos
			</label>

			<div
				className="border-[1px] border-no_black rounded-lg mt-12 mb-16 relative p-10"
				hidden={!isClicked}
			>
				<h4 className="absolute text-xl -top-4 bg-white w-40 text-center">
					Dados
				</h4>
				<Form
					ref={formRef}
					onSubmit={() => console.log('enviado')}
					className="flex"
				>
					<InvoiceInput
						type="number"
						name="ISSQN"
						title="ISSQN"
						id="ISSQN"
						min="0"
						max="99.99"
						step=".01"
					/>
					<InvoiceInput
						name="IRRF"
						title="IRRF"
						id="IRRF"
						min="0"
						max="99.99"
						step=".01"
					/>
					<InvoiceInput
						name="CSLL"
						title="CSLL"
						id="CSLL"
						min="0"
						max="99.99"
						step=".01"
					/>
					<InvoiceInput
						name="COFINS"
						title="COFINS"
						id="COFINS"
						min="0"
						max="99.99"
						step=".01"
					/>
					<InvoiceInput
						name="INSS"
						title="INSS"
						id="INSS"
						min="0"
						max="99.99"
						step=".01"
					/>
					<InvoiceInput
						name="PIS"
						title="PIS"
						id="PIS"
						min="0"
						max="99.99"
						step=".01"
					/>
				</Form>
			</div>
		</div>
	)
}
