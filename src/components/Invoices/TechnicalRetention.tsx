import { useContext, useEffect, useRef, useState } from 'react'
import { Form } from '@unform/web'

import InvoiceInput from './Form/InvoiceInput'
import { IInvoice } from '../../@types/interfaces'
import { UserInfoContext, UserInfoContextType } from '../../providers/userInfoContext'

interface TecnhicalRetentionProps {
   invoice: IInvoice | undefined
}

export default function TechnicalRetention({invoice}: TecnhicalRetentionProps) {
	const [isClicked, setIsClicked] = useState(false)
   const { userInfo } = useContext(UserInfoContext) as UserInfoContextType
   const formRef = useRef(null)

	useEffect(() => {
		if (!invoice) return
      const contract = userInfo?.contracts.find((contract) => contract.id === invoice.contractId)

      const amountWithPercentage = new Intl.NumberFormat('pt-BR', {
         style:'currency',
         currency: 'BRL'
      }).format((contract.technicalRetention / 100) * invoice.amount / 100 )
		formRef.current.setData({
			amount: amountWithPercentage,
         percentage: `${contract.technicalRetention}%`
		})
	}, [invoice])

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

				<div className="border-[1px] border-no_black rounded-lg mt-12 mb-16 relative p-10" hidden={!isClicked}>
					<h4 className="absolute text-xl -top-4 bg-white w-40 text-center">
						Dados
					</h4>
					<Form ref={formRef} onSubmit={() => console.log('oi')} className="flex">
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
		</div>
	)
}
