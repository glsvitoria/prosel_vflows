import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Info, X } from 'phosphor-react'
import { IContract, IInvoice } from '../../../@types/interfaces'
import { api } from '../../../services/api'

import Modal from 'react-modal'
import ModalTaxes from './TaxesRetention/ModalTaxes'
import ModalTechnicalRetention from './TechnicalRetention/ModalTechnicalRetention'
import ModalContractInfo from './ContractInfo/ModalContractInfo'

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

// MODAL STYLES
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

               <ModalContractInfo invoice={invoice} />

					<div className="border-2 sm:mt-12 mt-8 mb-4 border-no_black/25"></div>

					<ModalTaxes invoiceTaxes={invoice.taxesRetention} />

					<div className="border-2 sm:mt-12 mt-10 mb-4 border-no_black/25"></div>

					<ModalTechnicalRetention
						technicalRetention={technicalRetention}
					/>
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
