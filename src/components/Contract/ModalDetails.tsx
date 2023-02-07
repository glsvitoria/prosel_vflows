import { Info, X } from 'phosphor-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { IInvoice } from '../../@types/interfaces'
import { api } from '../../services/api'

interface ModalDetailsProps {
	modalIsOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	contractID: stirng
}

const customStyles = {
	content: {
		width: '50%',
		height: '50%',
		margin: 'auto',
      'border-radius': '1.5rem',
      padding: '3rem'
	},
}

export default function ModalDetails({
	modalIsOpen,
	setIsOpen,
	contractID,
}: ModalDetailsProps) {
	const [invoice, setInvoice] = useState<IInvoice | null>(null)

	function closeModal() {
		setIsOpen(false)
	}

	useEffect(() => {
		api.get(`/invoices/contract/${contractID}`).then((response) => {
			const invoiceFind = response.data.invoices[0]
			setInvoice(invoiceFind)
		})
	}, [contractID])

	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Modal Details"
			ariaHideApp={false}
		>
			{invoice && (
				<section>
					<div className="flex items-center justify-center">
						<Info
							size={40}
							color="rgba(193, 159, 159, 0.90)"
							className="mr-4"
						/>
						<h1 className="text-3xl">Detalhes do Contrato</h1>
					</div>
					<div className="grid grid-cols-2 mt-12 gap-4">
						<p className="text-lg">
							Número da Nota:{' '}
							<span className="text-sm">{invoice.invoiceNumber}</span>
						</p>
						<p className="text-lg">
							Valor: <span className="text-sm">{invoice.amount}</span>
						</p>
						<p className="text-lg">
							Data de Emissão:{' '}
							<span className="text-sm">
								{new Intl.DateTimeFormat('pt-BR').format(
									new Date(invoice.issueDate)
								)}
							</span>
						</p>
						<p className="text-lg">
							Data de Vencimento:{' '}
							<span className="text-sm">
								{new Intl.DateTimeFormat('pt-BR').format(
									new Date(invoice.dueDate)
								)}
							</span>
						</p>
					</div>

               <div className='border-2 mt-4 mb-4 border-no_black/25'></div>

               <ul className='grid grid-cols-2'>
                  <li className='text-xl'>ISSQN: <span className='text-sm'>{invoice.taxesRetention.ISSQN}</span></li>
                  <li className='text-xl'>IRRF: <span className='text-sm'>{invoice.taxesRetention.IRRF}</span></li>
                  <li className='text-xl'>CSLL: <span className='text-sm'>{invoice.taxesRetention.CSLL}</span></li>
                  <li className='text-xl'>COFINS: <span className='text-sm'>{invoice.taxesRetention.COFINS}</span></li>
                  <li className='text-xl'>INSS: <span className='text-sm'>{invoice.taxesRetention.INSS}</span></li>
                  <li className='text-xl'>PIS: <span className='text-sm'>{invoice.taxesRetention.PIS}</span></li>
               </ul>

               <div className='border-2 mt-4 mb-4 border-no_black/25'></div>

               <div>
                  <p>Valor: valor</p>
                  <p>Percentual: percentual</p>
               </div>
				</section>
			)}

			<button
				onClick={closeModal}
				className="absolute right-4 top-4 hover:scale-125 duration-300"
			>
				<X size={32} color="#030303" />
			</button>
		</Modal>
	)
}
