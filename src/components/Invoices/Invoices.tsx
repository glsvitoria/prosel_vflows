import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import { Form } from '@unform/web'
import {
	UserInfo,
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
import { IInvoice } from '../../@types/interfaces'
import { api } from '../../services/api'

export default function Invoices() {
	const navigate = useNavigate()
	const location = useLocation()
	const { userInfo, setUserInfo } = useContext(
		UserInfoContext
	) as UserInfoContextType
	const formRef = useRef(null)
	const [invoiceChoosed, setInvoiceChoosed] = useState<IInvoice>()

	function backToContract() {
		navigate(`${location.pathname.split('/contract')[0]}`)
	}

	function searchInvoice(user: UserInfo) {
		if (!user.invoices) return
      console.log(user)
		api.get(`/invoices/${location.pathname.split('/contract/')[1]}`).then(
			(response) => {
				const invoiceFind: IInvoice = response.data.invoices[0]

				formRef.current.setData({
					invoiceNumber: invoiceFind.invoiceNumber,
					issueDate: new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}).format(
						new Date(invoiceFind.issueDate)
					),
					dueDate: (new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}).format(
						new Date(invoiceFind.dueDate)
					)),
               amount: invoiceFind.amount / 100
				})

				setInvoiceChoosed(invoiceFind)
			}
		)
	}

	useEffect(() => {
		if (userInfo == null) {
			const userInfoStorage = localStorage.getItem('userInfo')
			// @ts-ignore
			const userInfoParse = JSON.parse(userInfoStorage)
			setUserInfo(userInfoParse)

			searchInvoice(userInfoParse)
		} else {
         searchInvoice(userInfo)
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
							title="Valor (R$)"
							type="number"
							name="amount"
							id="amount"
							min="0"
							step=".01"
						/>
					</Form>

					<TaxesRetention invoice={invoiceChoosed} />

					<TechnicalRetention invoice={invoiceChoosed} />

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
