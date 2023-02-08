import { useContext, useEffect, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { UserInfoContext } from '../../providers/userInfoContext'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import InvoiceInput from './Form/InvoiceInput'
import AttachFile from './AttachFile'
import Pagination from '../Pagination/Pagination'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	IContract,
	IInvoice,
	UserInfo,
	UserInfoContextType,
} from '../../@types/interfaces'
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
	files: string[]
}

export default function Invoices() {
	const navigate = useNavigate()
	const location = useLocation()
	const { userInfo, setUserInfo } = useContext(
		UserInfoContext
	) as UserInfoContextType
	const formRef = useRef(null)
	const [isClickedTaxes, setIsClickedTaxes] = useState(false)
	const [isClickedTecnhical, setIsClickedTecnhical] = useState(false)
	const [filesName, setFilesName] = useState<string[]>([])
	const [contractInfo, setContractInfo] = useState({
		code: '',
		title: '',
	})

	function backToContract() {
		navigate(`${location.pathname.split('/contract')[0]}`)
	}

	function searchInvoice(user: UserInfo) {
		api.get(`/invoices/${location.pathname.split('/contract/')[1]}`).then(
			(response) => {
				const invoiceFind: IInvoice = response.data.invoices[0]
				if (user.contracts == null) return
				const contract = user.contracts.find(
					(contract) => contract.id === invoiceFind.contractId
				)
				if (contract == null) return
				const amountCalculated =
					(contract.technicalRetention / 100) * invoiceFind.amount

				setContractInfo({
					code: contract.contractCode,
					title: contract.contractName,
				})

				// @ts-ignore
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
		// @ts-ignore
		formRef.current.submitForm()
	}

	async function handleSubmit(data: HandleSubmitProps) {
		try {
			// @ts-ignore
			formRef.current.setErrors({})

			const schema = Yup.object().shape({
				invoiceNumber: Yup.string().required(
					'Número da Nota é obrigatório'
				),
				issueDate: Yup.date().typeError('Uma data válida deve ser preenchida').required('Data de Emissão é obrigatório'),
				dueDate: Yup.date().typeError('Uma data válida deve ser preenchida').required('Data de Vencimento é obrigatório'),
				amount: Yup.number()
               .typeError('Valor é obrigatório e deve ser um número')
					.required('Valor é obrigatório')
					.min(0, 'Valor deve ser maior que 0'),
				ISSQN: Yup.number()
					.typeError('ISSQN é obrigatório e deve ser um número')
					.required('ISSQN é obrigatório')
					.min(0, 'ISSQN deve ser maior que 0')
					.max(99.99, 'Deve ser menor que 100'),
				IRRF: Yup.number()
					.typeError('IRRF é obrigatório e deve ser um número')
					.required('IRRF é obrigatório')
					.min(0, 'IRRF deve ser maior que 0')
					.max(99.99, 'Deve ser menor que 100'),
				CSLL: Yup.number()
					.typeError('CSLL é obrigatório e deve ser um número')
					.required('CSLL é obrigatório')
					.min(0, 'CSLL deve ser maior que 0')
					.max(99.99, 'Deve ser menor que 100'),
				COFINS: Yup.number()
					.typeError('COFINS é obrigatório e deve ser um número')
					.required('COFINS é obrigatório')
					.min(0, 'COFINS deve ser maior que 0')
					.max(99.99, 'Deve ser menor que 100'),
				INSS: Yup.number()
					.typeError('INSS é obrigatório e deve ser um número')
					.required('INSS é obrigatório')
					.min(0, 'INSS deve ser maior que 0')
					.max(99.99, 'Deve ser menor que 100'),
				PIS: Yup.number()
					.typeError('PIS é obrigatório e deve ser um número')
					.required('PIS é obrigatório')
					.min(0, 'PIS deve ser maior que 0')
					.max(99.99, 'Deve ser menor que 100'),
			})

			await schema.validate(data, {
				abortEarly: false,
			})

			data.amount = data.amount * 100
			data.amountTecnhical = data.amountTecnhical * 100
			data.technicalRetention = data.technicalRetention.replace('%', '')

			data.files = [...filesName]

			console.log('i')

			sendData(data)
		} catch (err) {
			const validationErrors = {}

			if (err instanceof Yup.ValidationError) {
				err.inner.forEach((error) => {
					// @ts-ignore
					validationErrors[error.path] = error.message
				})
				// @ts-ignore
				formRef.current.setErrors(validationErrors)
			}
		}
	}

	function sendData(data: any) {
		console.log(data)
		console.log('Solicitação 999999 foi enviada com sucesso')
		navigate('/')
	}

	return (
		<main className="w-full h-full flex justify-center">
			<section className="bg-white mx-10 mt-10 mb-10 rounded border-4 px-6 max-w-[1440px] w-full">
				<Header
					title="Dados da Nota Fiscal"
					company={userInfo?.company}
					isSuitcase={false}
				/>

				<section className="border-2 border-no_black/25 rounded-2xl xs:p-8 p-4">
					<div className="grid md:grid-cols-2 grid-cols-1 md:gap-y-0 gap-y-4 lg:text-2xl md:text-xl xs:text-lg md:mb-12 mb-8">
						<h3>Código do contrato: {contractInfo.code}</h3>
						<h3>{contractInfo.title}</h3>
					</div>

					<Form
						ref={formRef}
						onSubmit={handleSubmit}
						className="flex flex-col"
					>
						<div className="lg:flex lg:items-center grid sm:grid-cols-2 grid-cols-1 gap-y-4 justify-between md:mb-16 mb-10">
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
							<label className="md:text-xl xs:text-lg flex items-center md:mb-16 mb-8">
								<input
									type="checkbox"
									name="taxesRetention"
									id="taxesRetention"
									className="mr-4 md:w-6 w-4 md:h-6 h-4"
									onChange={() => setIsClickedTaxes(!isClickedTaxes)}
								/>
								Retenção de Impostos
							</label>

							<div
								className="border-[1px] border-no_black rounded-lg mt-12 mb-16 relative sm:p-10 p-6"
								hidden={!isClickedTaxes}
							>
								<h4 className="absolute md:text-xl sm:text-lg -top-4 bg-white md:w-40 w-32 text-center">
									Dados
								</h4>
								<div className="xl:flex grid lg:grid-cols-3 lg:gap-y-10 xs:grid-cols-2 gap-4">
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
								<label className="md:text-xl xs:text-lg flex items-center md:mb-16 mb-8">
									<input
										type="checkbox"
										name="technicalRetention"
										id="technicalRetention"
										className="mr-4 md:w-6 w-4 md:h-6 h-4"
										onChange={() =>
											setIsClickedTecnhical(!isClickedTecnhical)
										}
									/>
									Retenção de Técnica
								</label>

								<div
									className="border-[1px] border-no_black rounded-lg mt-12 mb-16 relative sm:p-10 p-6"
									hidden={!isClickedTecnhical}
								>
									<h4 className="absolute md:text-xl sm:text-lg -top-4 bg-white md:w-40 w-32 text-center">
										Dados
									</h4>
									<div className="flex xs:flex-row flex-col gap-4">
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

						<AttachFile
							filesName={filesName}
							setFilesName={setFilesName}
						/>
					</Form>
				</section>

				<Pagination
					backTitle="Visualizar contratos"
					backFunction={backToContract}
					nextTitle="Salvar mudanças"
					nextFunction={sendForm}
				/>

				<Footer />
			</section>
		</main>
	)
}
