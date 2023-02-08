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

function isSmallScreen(size: number): Boolean {
	if (typeof window !== 'undefined') {
		return window.innerWidth < size
	}
	return false
}

const customStyles = {
	content: {
		width: isSmallScreen(560) ? '90%' : '60%',
		maxWidth: '800px',
		minWidth: '240px',
		height: '64%',
		margin: 'auto',
		borderRadius: '1.5rem',
		padding: isSmallScreen(480) ? '2rem 1rem' : '3rem 2rem',
		inset: isSmallScreen(480) ? '0px' : '40px',
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
		setIsLoading(true)
		if (!contractID) return

		api.get(`/invoices/contract/${contractID}`).then((response) => {
			const invoiceFind = response.data.invoices[0]
			console.log(invoiceFind)
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
		>
			{invoice && !isLoading ? (
				<section>
					<div className="flex items-center justify-center">
						<Info
							size={32}
							color="rgba(193, 159, 159, 0.90)"
							className="mr-4 lg:w-8 lg:h-8 w-6 h-6"
						/>
						<h1 className="lg:text-3xl md:text-2xl text-lg">
							Detalhes do Contrato
						</h1>
					</div>
					<div className="grid xl:grid-cols-2 grid-cols-1 text-center md:mt-10 mt-6 gap-y-4">
						<p className="lg:text-lg md:text-base text-sm">
							Número da Nota:{' '}
							<span className="md:text-sm text-xs font-bold">
								{invoice.invoiceNumber}
							</span>
						</p>
						<p className="lg:text-lg md:text-base text-sm">
							Valor:{' '}
							<span className="md:text-sm text-xs font-bold">
								{new Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								}).format(invoice.amount / 100)}
							</span>
						</p>
						<p className="lg:text-lg md:text-base text-sm">
							Data de Emissão:{' '}
							<span className="md:text-sm text-xs font-bold">
								{new Intl.DateTimeFormat('pt-BR').format(
									new Date(invoice.issueDate)
								)}
							</span>
						</p>
						<p className="lg:text-lg md:text-base text-sm">
							Data de Vencimento:{' '}
							<span className="md:text-sm text-xs font-bold">
								{new Intl.DateTimeFormat('pt-BR').format(
									new Date(invoice.dueDate)
								)}
							</span>
						</p>
					</div>

					<div className="border-2 sm:mt-12 mt-8 mb-4 border-no_black/25"></div>

					<ul className="grid md:grid-cols-3 xs:grid-cols-2 xl:gap-x-16 gap-x-8 xl:gap-y-8 text-center text-white relative">
						<div className="absolute -top-8 w-full">
							<h2 className=" text-no_black xl:w-2/5 lg:w-3/5 xs:w-4/5 w-11/12 text-center border-2 mx-auto border-no_black/25 -top-8 m-auto md:text-lg text-base bg-white">
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

					<div className="border-2 sm:mt-12 mt-10 mb-4 border-no_black/25"></div>

					<div className="grid md:grid-cols-2 grid-cols-1 text-xl relative justify-items-center">
						<div className="absolute -top-8 w-full">
							<h2 className=" text-no_black xl:w-2/5 lg:w-3/5 xs:w-4/5 w-11/12 text-center border-2 mx-auto border-no_black/25 -top-8 m-auto md:text-lg text-base bg-white">
								Retenção Técnica
							</h2>
						</div>
						<p className="flex items-center gap-3 md:mt-8 mt-4 xl:text-xl lg:text-lg text-sm">
							<Money size={24} color="#030303" /> Valor:{' '}
							<span className="lg:text-sm text-xs font-bold">
								{new Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								}).format(technicalRetention.amount / 100)}
							</span>
						</p>
						<p className="flex items-center gap-3 md:mt-8 mt-4 xl:text-xl lg:text-lg text-sm">
							<Percent size={24} color="#030303" /> Percentual:{' '}
							<span className="lg:text-sm text-xs font-bold">
								{technicalRetention.percentage}%
							</span>
						</p>
					</div>
				</section>
			) : (
				<div className="w-full h-full flex items-center justify-center">
					<div className="border-[20px] border-line_2 border-t-table_header h-64 w-64 animate-spin rounded-[50%]"></div>
				</div>
			)}

			<button
				onClick={closeModal}
				className="absolute right-4 top-4 hover:scale-125 duration-300"
			>
				<X size={32} color="#030303" className="lg:w-8 lg:h-8 w-6 h-6" />
			</button>
		</Modal>
	)
}
