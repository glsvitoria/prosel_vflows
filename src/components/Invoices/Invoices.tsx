import { useContext, useEffect, useRef, useState } from 'react'
import { Form } from '@unform/web'
import {
	UserInfo,
	UserInfoContext,
	UserInfoContextType,
} from '../../providers/userInfoContext'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import InvoiceInput from './Form/InvoiceInput'
import AttachFile from './AttachFile'
import Pagination from '../Pagination/Pagination'
import { useLocation, useNavigate } from 'react-router-dom'
import { IContract, IInvoice } from '../../@types/interfaces'
import { api } from '../../services/api'
import * as Yup from 'yup'

interface HandleSubmitProps {
   amount: number
	dueDate: string
	invoiceNumber: string
	issueDate: string
   COFINS: number
   CSLL: number
   IRRF: number
   INSS: number
   ISSQN: number
   PIS: number
   amountTecnhical: number
   technicalRetention: string
}

export default function Invoices() {
	const navigate = useNavigate()
	const location = useLocation()
	const { userInfo, setUserInfo } = useContext(
		UserInfoContext
	) as UserInfoContextType
	const formRef = useRef(null)
	const formRefTaxes = useRef(null)
	const formRefTecnhical = useRef(null)
	const [invoiceChoosed, setInvoiceChoosed] = useState<IInvoice>()
	const [isClickedTaxes, setIsClickedTaxes] = useState(false)
	const [isClickedTecnhical, setIsClickedTecnhical] = useState(false)

	function backToContract() {
		navigate(`${location.pathname.split('/contract')[0]}`)
	}

	function searchInvoice(user: UserInfo) {
		if (!user.invoices) return
		console.log(user)
		api.get(`/invoices/${location.pathname.split('/contract/')[1]}`).then(
			(response) => {
				const invoiceFind: IInvoice = response.data.invoices[0]
				const contract = user.contracts.find(
					(contract: IContract) => contract.id === invoiceFind.contractId
				)
            const amountCalculated = (contract.technicalRetention / 100) * invoiceFind.amount

				formRef.current.setData({
					invoiceNumber: invoiceFind.invoiceNumber,
					issueDate: new Intl.DateTimeFormat('fr-CA', {
						year: 'numeric',
						month: '2-digit',
						day: '2-digit',
					}).format(new Date(invoiceFind.issueDate)),
					dueDate: new Intl.DateTimeFormat('fr-CA', {
						year: 'numeric',
						month: '2-digit',
						day: '2-digit',
					}).format(new Date(invoiceFind.dueDate)),
					amount: invoiceFind.amount / 100,
					ISSQN: invoiceFind.taxesRetention.ISSQN,
					IRRF: invoiceFind.taxesRetention.IRRF,
					CSLL: invoiceFind.taxesRetention.CSLL,
					COFINS: invoiceFind.taxesRetention.COFINS,
					INSS: invoiceFind.taxesRetention.INSS,
					PIS: invoiceFind.taxesRetention.PIS,
					amountTecnhical: amountCalculated / 100,
					technicalRetention: `${contract.technicalRetention}%`,
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

   function sendForm() {
      formRef.current.submitForm()
   }

	async function handleSubmit(data: HandleSubmitProps) {
		try {
			formRef.current.setErrors({})

			const schema = Yup.object().shape({
				invoiceNumber: Yup.string().required(
					'Número da Nota é obrigatório'
				),
				issueDate: Yup.date().required('Data de Emissão é obrigatório').min(new Date(), 'Data inválida'),
				dueDate: Yup.date().required('Data de Vencimento é obrigatório').min(new Date(), 'Data inválida'),
				amount: Yup.number().required('Valor é obrigatório').min(0, 'Valor deve ser maior que 0'),
				ISSQN: Yup.number().required('ISSQN é obrigatório').min(0, 'ISSQN deve ser maior que 0'),
				IRRF: Yup.number().required('IRRF é obrigatório').min(0, 'IRRF deve ser maior que 0'),
				CSLL: Yup.number().required('CSLL é obrigatório').min(0, 'CSLL deve ser maior que 0'),
				COFINS: Yup.number().required('COFINS é obrigatório').min(0, 'COFINS deve ser maior que 0'),
				INSS: Yup.number().required('INSS é obrigatório').min(0, 'INSS deve ser maior que 0'),
				PIS: Yup.number().required('PIS é obrigatório').min(0, 'PIS deve ser maior que 0'),
			})

			await schema.validate(data, {
				abortEarly: false,
			})

         data.amount = data.amount * 100
         data.amountTecnhical = data.amountTecnhical * 100
         data.technicalRetention = data.technicalRetention.replace('%', '')

         sendData(data)
		} catch (err) {
			const validationErrors = {}

			if (err instanceof Yup.ValidationError) {
				err.inner.forEach((error) => {
					// @ts-ignore
					validationErrors[error.path] = error.message
				})
				formRef.current.setErrors(validationErrors)
			}
		}
	}

   function sendData(data: any) {
      console.log(data)
      console.log('Solicitação 999999 foi enviada com sucesso')
   }

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
						onSubmit={handleSubmit}
						className="flex flex-col"
					>
                  
						<div className='flex items-center justify-between mb-16'>
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
                  </div>

						<div>
							<label className="text-xl flex items-center mb-16">
								<input
									type="checkbox"
									name="taxesRetention"
									id="taxesRetention"
									className="mr-4 w-6 h-6"
									onChange={() => setIsClickedTaxes(!isClickedTaxes)}
								/>
								Retenção de Impostos
							</label>

							<div
								className="border-[1px] border-no_black rounded-lg mt-12 mb-16 relative p-10"
								hidden={!isClickedTaxes}
							>
								<h4 className="absolute text-xl -top-4 bg-white w-40 text-center">
									Dados
								</h4>
								<div className="flex">
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
								</div>
							</div>

							<div>
								<label className="text-xl flex items-center">
									<input
										type="checkbox"
										name="technicalRetention"
										id="technicalRetention"
										className="mr-4 w-6 h-6"
										onChange={() =>
											setIsClickedTecnhical(!isClickedTecnhical)
										}
									/>
									Retenção de Técnica
								</label>

								<div
									className="border-[1px] border-no_black rounded-lg mt-12 mb-16 relative p-10"
									hidden={!isClickedTecnhical}
								>
									<h4 className="absolute text-xl -top-4 bg-white w-40 text-center">
										Dados
									</h4>
									<div className="flex">
										<InvoiceInput
											name="amountTecnhical"
											title="Valor (R$)"
											id="amountTecnhical"
											disabled
										/>
										<InvoiceInput
											name="technicalRetention"
											title="Percentual"
											id="technicalRetention"
											disabled
										/>
									</div>
								</div>
							</div>
						</div>

					</Form>

					<AttachFile />
				</section>

				<Pagination
					backTitle="Visualizar contrato"
					backFunction={backToContract}
					nextTitle="Salvar mudanças"
					nextFunction={sendForm}
				/>

				<Footer />
			</section>
		</main>
	)
}
