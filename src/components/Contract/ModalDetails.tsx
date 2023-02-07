import { Info, Money, Percent, X } from 'phosphor-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { IInvoice } from '../../@types/interfaces'
import { api } from '../../services/api'

interface ModalDetailsProps {
	modalIsOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	contractID: string
}

const customStyles = {
	content: {
		width: '50%',
		height: '56%',
		margin: 'auto',
		'border-radius': '1.5rem',
		padding: '3rem',
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
					<div className="grid grid-cols-2 mt-12 gap-y-4">
						<p className="text-lg">
							Número da Nota:{' '}
							<span className="text-sm font-bold">{invoice.invoiceNumber}</span>
						</p>
						<p className="text-lg">
							Valor: <span className="text-sm font-bold">{invoice.amount}</span>
						</p>
						<p className="text-lg">
							Data de Emissão:{' '}
							<span className="text-sm font-bold">
								{new Intl.DateTimeFormat('pt-BR').format(
									new Date(invoice.issueDate)
								)}
							</span>
						</p>
						<p className="text-lg">
							Data de Vencimento:{' '}
							<span className="text-sm font-bold">
								{new Intl.DateTimeFormat('pt-BR').format(
									new Date(invoice.dueDate)
								)}
							</span>
						</p>
					</div>

					<div className="border-2 mt-4 mb-4 border-no_black/25"></div>

					<ul className="grid grid-cols-3 gap-x-16 gap-y-8 text-center text-white">
						<li className="text-xl bg-button_green/75 rounded-2xl py-2">
							ISSQN:{' '}
							<span className="text-sm font-bold">
								{invoice.taxesRetention.ISSQN}
							</span>
						</li>
						<li className="text-xl bg-button_blue/75 rounded-2xl py-2">
							IRRF:{' '}
							<span className="text-sm font-bold">
								{invoice.taxesRetention.IRRF}
							</span>
						</li>
						<li className="text-xl bg-button_green/75 rounded-2xl py-2">
							CSLL:{' '}
							<span className="text-sm font-bold">
								{invoice.taxesRetention.CSLL}
							</span>
						</li>
						<li className="text-xl bg-button_blue/75 rounded-2xl py-2">
							COFINS:{' '}
							<span className="text-sm font-bold">
								{invoice.taxesRetention.COFINS}
							</span>
						</li>
						<li className="text-xl bg-button_green/75 rounded-2xl py-2">
							INSS:{' '}
							<span className="text-sm font-bold">
								{invoice.taxesRetention.INSS}
							</span>
						</li>
						<li className="text-xl bg-button_blue/75 rounded-2xl py-2">
							PIS:{' '}
							<span className="text-sm font-bold">
								{invoice.taxesRetention.PIS}
							</span>
						</li>
					</ul>

					<div className="border-2 mt-4 mb-4 border-no_black/25"></div>

					<div className="grid grid-cols-2 text-xl">
						<p className='flex items-center gap-3'>
							<Money size={32} color="#030303" /> Valor: <span className='text-sm font-bold'>xxx, xx</span>
						</p>
						<p className='flex items-center gap-3'><Percent size={32} color="#030303" /> Percentual: <span className='text-sm font-bold'>x%</span></p>
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
