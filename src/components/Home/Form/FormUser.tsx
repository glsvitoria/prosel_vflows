import { Form } from '@unform/web'
import { SignIn } from 'phosphor-react'
import { useRef } from 'react'
import Input from './Input'
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";
import { api } from '../../../services/api'
import { Company, Contract } from '../../interfaces/interfaces'

interface HandleSubmitProps {
   cnpj: string
}

export default function FormUser() {
	const formRef = useRef(null)
   const navigate = useNavigate()

   function login(cnpjWrited: string) {
      api.get('/companies').then((response) => {
         const companies: Company[] = response.data.companies

         const companyFind = companies.filter((company) => company.cnpj === cnpjWrited)

         if(companyFind) {
            api.get('/contracts').then((response) => {
               const contracts: Contract[] = response.data.contracts

               const contractsFind = contracts.filter(
                  (contract) => contract.companyId === companyFind[0].id
               )

               if(contractsFind){
                  navigate(`/company/${companyFind[0].id}`)
               } else {
                  formRef.current.setErrors({
                     cnpj: 'CNPJ sem contratos ativos'
                  })
               }
            })
         } else {
            formRef.current.setErrors({
               cnpj: 'CNPJ não encontrado'
            })
         }
      })
   }

	async function handleSubmit(data: HandleSubmitProps) {
		try {
         formRef.current.setErrors({})

         const cnpjWrited = data.cnpj

			const schema = Yup.object().shape({
				cnpj: Yup.string()
               .trim()
               .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, 'O CNPJ é inválido')
               .required('O CNPJ é obrigatório'),
			})

			await schema.validate(data, {
            abortEarly: false,
         })

         login(cnpjWrited)
		} catch (err) {
         const validationErrors = {}

         if (err instanceof Yup.ValidationError) {
            err.inner.forEach(error => {
               validationErrors[error.path] = error.message
            })
            formRef.current.setErrors(validationErrors)
         }
		}
	}

	return (
		<Form
			ref={formRef}
			onSubmit={handleSubmit}
			className="flex flex-col items-center w-3/5 m-10 border-2 rounded-2xl mb-20"
		>
			<label htmlFor="cnpj" className="self-start ml-10 mt-6 mb-2">
				CNPJ
			</label>
			<Input name="cnpj" placeholder="00.000.000/0000-00" />
			<button
				type="submit"
				className="bg-vflows_green text-white w-3/5 h-10 mt-8 mb-6 rounded-lg text-xl hover:brightness-90 duration-300 flex items-center justify-center"
			>
				<SignIn size={24} color="#FFF" weight="fill" className="mr-4" />
				Acessar
			</button>
		</Form>
	)
}
