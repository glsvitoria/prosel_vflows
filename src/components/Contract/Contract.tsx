import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { useLocation } from 'react-router-dom'
import Header from '../Header/Header'
import Table from './Table'
import { Copyright } from 'phosphor-react'
import { Company, Contract } from '../interfaces/interfaces'

export default function ContractPage() {
	const location = useLocation()
	const [companyLogged, setCompanyLogged] = useState<Company | null>(null)
	const [contractsForCompanyLogged, setContractsForCompanyLogged] = useState<
		Contract[] | null
	>(null)

	useEffect(() => {
		api.get('/companies').then((response) => {
			const companies: Company[] = response.data.companies

			const companyId = location.pathname.split('/')[2]

			const companyFind = companies.filter(
				(company) => company.id === companyId
			)
			setCompanyLogged(companyFind[0])
		})

		api.get('/contracts').then((response) => {
			const contracts: Contract[] = response.data.contracts

			const companyId = location.pathname.split('/')[2]

			const contractsFind = contracts.filter(
				(contract) => contract.companyId === companyId
			)
			setContractsForCompanyLogged(contractsFind)
		})
	}, [])

	return (
		<main className="w-full h-full">
			<section className="bg-white mx-10 mt-10 rounded border-4 px-6">
				<Header title="Contratos Vinculados" company={companyLogged} />

				<Table contracts={contractsForCompanyLogged} />

				<footer className="flex items-center justify-between mb-8">
					<img src="/logo.png" alt="Logo da VFlows" className="w-40" />
					<p className="flex self-end text-no_black/25 font-bold">
						<Copyright
							size={24}
							color="rgba(3, 3, 3, 0.25)"
							weight="bold"
						/>{' '}
						2022 - Guilherme Vitória
					</p>
				</footer>
			</section>
		</main>
	)
}
