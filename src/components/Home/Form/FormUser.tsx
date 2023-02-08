import { useContext, useRef } from 'react'
import { Form } from '@unform/web'
import { useNavigate } from 'react-router-dom'
import { ICompany, IContract, UserInfoContextType } from '../../../@types/interfaces'
import { api } from '../../../services/api'
import * as Yup from 'yup'
import { SignIn } from 'phosphor-react'

import Input from './Input'
import { UserInfoContext } from '../../../providers/userInfoContext'

interface HandleSubmitProps {
	cnpj: string
}

export default function FormUser() {
	const formRef = useRef(null)
	const navigate = useNavigate()
	const { setUserInfo } = useContext(UserInfoContext) as UserInfoContextType

	function login(cnpjWrited: string) {
		api.get('/companies').then((response) => {
			const companies: ICompany[] = response.data.companies

			const companyFind = companies.find(
				(company) => company.cnpj === cnpjWrited
			)
			if (companyFind) {
				api.get(`/contracts/company/${companyFind.id}`).then((response) => {
					const contractsFind: IContract[] = response.data.contracts

					if (contractsFind.length > 0) {
						const userInfoFind = {
							company: companyFind,
							contracts: contractsFind,
                     invoices: null
						}
						setUserInfo(userInfoFind)
						localStorage.setItem('userInfo', JSON.stringify(userInfoFind))
						navigate(`/company/${companyFind.id}`)
					} else {
						// @ts-ignore
						formRef.current.setErrors({
							cnpj: 'CNPJ sem contratos ativos',
						})
					}
				})
			} else {
				// @ts-ignore
				formRef.current.setErrors({
					cnpj: 'CNPJ não encontrado',
				})
			}
		})
	}

	async function handleSubmit(data: HandleSubmitProps) {
		try {
			// @ts-ignore
			formRef.current.setErrors({})

			const cnpjWrited = data.cnpj

			const schema = Yup.object().shape({
				cnpj: Yup.string()
					.trim()
					.matches(
						/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
						'O CNPJ é inválido'
					)
					.required('O CNPJ é obrigatório'),
			})

			await schema.validate(data, {
				abortEarly: false,
			})

			login(cnpjWrited)
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

	return (
		<Form
			ref={formRef}
			onSubmit={handleSubmit}
			className="flex flex-col items-center md:w-3/5 w-4/5 sm:mt-10 mt-6 border-2 rounded-2xl sm:mb-16 mb-6 sm:px-6 px-4"
		>
			<label htmlFor="cnpj" className="self-start mt-6 mb-2 sm:text-base text-sm">
				CNPJ
			</label>
			<Input name="cnpj" placeholder="00.000.000/0000-00" />
			<button
				type="submit"
				className="bg-vflows_green text-white md:w-3/5 w-4/5 h-10 mt-8 mb-6 rounded-lg md:text-xl xm:text-base text-sm hover:brightness-90 duration-300 flex items-center justify-center xl:gap-4 gap-2"
			>
				<SignIn size={24} color="#FFF" weight="fill" />
				Acessar
			</button>
		</Form>
	)
}
