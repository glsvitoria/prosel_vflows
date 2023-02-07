import { useContext, useEffect, useRef } from 'react'
import { Form } from '@unform/web'
import {
	UserInfoContext,
	UserInfoContextType,
} from '../../providers/userInfoContext'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import InvoiceInput from './Form/InvoiceInput'
import TaxesRetention from './TaxesRetention'
import TechnicalRetention from './TechnicalRetention'
import AttachFile from './AttachFile'
import Pagination from '../Pagination/Pagination'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Invoices() {
	const navigate = useNavigate()
	const location = useLocation()
	const { userInfo, setUserInfo } = useContext(
		UserInfoContext
	) as UserInfoContextType
	const formRef = useRef(null)

	function backToContract() {
		navigate(`${location.pathname.split('/contract')[0]}`)
	}

	useEffect(() => {
		if (userInfo == null) {
			const userInfoStorage = localStorage.getItem('userInfo')
			const userInfoParse = JSON.parse(userInfoStorage)
			setUserInfo(userInfoParse)
		}
	}, [])

	return (
		<main className="w-full h-full">
			<section className="bg-white mx-10 mt-10 rounded border-4 px-6">
				<Header
					title="Dados da Nota Fiscal"
					company={userInfo?.company}
					isSuitcase={false}
				/>

				<section className="border-2 border-no_black/25 rounded-2xl p-8">
					<div className="grid grid-cols-2 text-2xl mb-12">
						<h3>Código do contrato</h3>
						<h3>Título do contratoooo</h3>
					</div>

					<Form
						ref={formRef}
						onSubmit={() => console.log('enviado')}
						className="flex items-center justify-between mb-16"
					>
						<InvoiceInput
							title="Número da nota"
							type="number"
							name="invoiceNumber"
							id="invoiceNumber"
						/>
						<InvoiceInput
							title="Data de emisão"
							type="date"
							name="issueDate"
							id="issueDate"
						/>
						<InvoiceInput
							title="Data de vencimento"
							type="date"
							name="dueDate"
							id="dueDate"
						/>
						<InvoiceInput
							title="Valor"
							type="number"
							name="amount"
							id="amount"
							min="0"
							step=".01"
						/>
					</Form>

					<TaxesRetention />

					<TechnicalRetention />

					<AttachFile />
				</section>

				<Pagination
					backTitle="Visualizar contrato"
					backFunction={backToContract}
					nextTitle="Salvar mudanças"
					nextFunction={() => console.log('salvo')}
				/>

				<Footer />
			</section>
		</main>
	)
}
