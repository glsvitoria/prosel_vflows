import { Info, Money, Percent, X } from 'phosphor-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { IContract, IInvoice } from '../../../@types/interfaces'
import { api } from '../../../services/api'
import ModalTaxesItem from './ModalTaxesItem'

interface ModalDetailsProps {
	modalIsOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	contractID: string
}

interface TechnicalRetentionState {
	percentage: number
	amount: number
}

const customStyles = {
	content: {
		width: '60%',
      maxWidth: '800px',
		height: '60%',
		margin: 'auto',
		borderRadius: '1.5rem',
		padding: '3rem',
	},
}

export default function ModalDetails({
	modalIsOpen,
	setIsOpen,
	contractID,
}: ModalDetailsProps) {
	const [invoice, setInvoice] = useState<IInvoice | null>(null)
	const [technicalRetention, setTechnicalRetention] =
		useState<TechnicalRetentionState>({
			percentage: 0,
			amount: 0,
		})
	const [isLoading, setIsLoading] = useState(false)

	function closeModal() {
		setIsOpen(false)
	}

	useEffect(() => {
		if (!contractID) return

		api.get(`/invoices/contract/${contractID}`).then((response) => {
			const invoiceFind = response.data.invoices[0]
			setInvoice(invoiceFind)

			api.get(`/contracts/${contractID}`).then((response) => {
				const contractFind: IContract = response.data.contracts[0]
				setTechnicalRetention({
					percentage: contractFind.technicalRetention,
					amount:
						(contractFind.technicalRetention / 100) * invoiceFind.amount,
				})
            setIsLoading(false)
			})
		})
	}, [contractID])

	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Modal Details"
			ariaHideApp={false}
         onAfterOpen={() => setIsLoading(true)}
		>
			{invoice && !isLoading ? (
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
							<span className="text-sm font-bold">
								{invoice.invoiceNumber}
							</span>
						</p>
						<p className="text-lg">
							Valor:{' '}
							<span className="text-sm font-bold">{invoice.amount}</span>
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

					<div className="border-2 mt-6 mb-4 border-no_black/25"></div>

					<ul className="grid grid-cols-3 gap-x-16 gap-y-8 text-center text-white relative">
						<div className="absolute -top-8 w-full">
							<h2 className=" text-no_black w-2/5 text-center border-2 mx-auto border-no_black/25 -top-8 m-auto text-lg bg-white">
								Retenção de Impostos
							</h2>
						</div>
						<ModalTaxesItem
							title="ISSQN"
							taxesValue={invoice.taxesRetention.ISSQN}
							color="green"
						/>
						<ModalTaxesItem
							title="IRRF"
							taxesValue={invoice.taxesRetention.IRRF}
							color="blue"
						/>
						<ModalTaxesItem
							title="CSLL"
							taxesValue={invoice.taxesRetention.CSLL}
							color="green"
						/>
						<ModalTaxesItem
							title="COFINS"
							taxesValue={invoice.taxesRetention.COFINS}
							color="blue"
						/>
						<ModalTaxesItem
							title="INSS"
							taxesValue={invoice.taxesRetention.INSS}
							color="green"
						/>
						<ModalTaxesItem
							title="PIS"
							taxesValue={invoice.taxesRetention.PIS}
							color="blue"
						/>
					</ul>

					<div className="border-2 mt-6 mb-4 border-no_black/25"></div>

					<div className="grid grid-cols-2 text-xl relative">
						<div className="absolute -top-8 w-full">
							<h2 className=" text-no_black w-2/5 text-center border-2 mx-auto border-no_black/25 -top-8 m-auto text-lg bg-white">
								Retenção Técnica
							</h2>
						</div>
						<p className="flex items-center gap-3 mt-4">
							<Money size={32} color="#030303" /> Valor:{' '}
							<span className="text-sm font-bold">
								{new Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								}).format(technicalRetention.amount / 100)}
							</span>
						</p>
						<p className="flex items-center gap-3  mt-4">
							<Percent size={32} color="#030303" /> Percentual:{' '}
							<span className="text-sm font-bold">
								{technicalRetention.percentage}%
							</span>
						</p>
					</div>
				</section>
			) : (
				<div className='w-full h-full flex items-center justify-center'>
					<div className="border-[20px] border-line_2 border-t-table_header h-64 w-64 animate-spin rounded-[50%]"></div>
				</div>
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
