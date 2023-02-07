import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createServer, Model } from 'miragejs'
import ContractPage from './components/Contract/Contract'
import Invoices from './components/Invoices/Invoices'
import { CompanyLoggedProvider } from './providers/userInfoContext'

// MIRAGE JS
createServer({
	models: {
		companies: Model,
		contracts: Model,
		invoices: Model,
	},

	seeds(server) {
		server.db.loadData({
			companies: [
				{
					id: '1',
					name: 'VFlows',
					socialReason: 'Razão Social da VFlows',
					fantasyName: 'Nome Fantasia da VFlows',
					cnpj: '01.023.045/0678-09',
				},
				{
					id: '2',
					name: 'GlsVitoria',
					socialReason: 'Razão Social da GlsVitoria',
					fantasyName: 'Nome Fantasia da GlsVitoria',
					cnpj: '09.087.065/0432-01',
				},
			],
			contracts: [
				{
					id: '1',
					companyId: '1',
					contractName: 'Título do primeiro contrato de exemplo',
					contractCode: '11001100-01',
					technicalRetention: '10',
				},
				{
					id: '2',
					companyId: '1',
					contractName: 'Título do segundo contrato de exemplo',
					contractCode: '22002200-02',
					technicalRetention: '5',
				},
				{
					id: '3',
					companyId: '1',
					contractName: 'Título do terceiro contrato de exemplo',
					contractCode: '33003300-03',
					technicalRetention: '15',
				},
				{
					id: '4',
					companyId: '1',
					contractName: 'Título do quarto contrato de exemplo',
					contractCode: '44004400-04',
					technicalRetention: '8',
				},
			],
			invoices: [
				{
					id: '1',
					contractId: '2',
					invoiceNumber: '523391',
					issueDate: '2023-01-31T22:00:00.000Z',
					dueDate: '2023-02-10T22:00:00.000Z',
					value: '15990',
					taxesRetention: {
						ISSQN: '0',
						IRRF: '0',
						CSLL: '0',
						COFINS: '0',
						INSS: '0',
						PIS: '0',
					},
					technicalRetention: {
						value: '2385',
						percentage: '15',
					},
					attachedNotes: [],
				},
				{
					id: '2',
					contractId: '4',
					invoiceNumber: '413781',
					issueDate: '2023-01-20T15:00:00.000Z',
					dueDate: '2023-01-28T15:00:00.000Z',
					value: '20910',
					taxesRetention: {
						ISSQN: '0',
						IRRF: '0',
						CSLL: '0',
						COFINS: '0',
						INSS: '0',
						PIS: '0',
					},
					technicalRetention: {
						value: '1045',
						percentage: '5',
					},
					attachedNotes: [],
				},
				{
					id: '3',
					contractId: '3',
					invoiceNumber: '589396',
					issueDate: '2023-01-15T18:00:00.000Z',
					dueDate: '2023-01-31T18:00:00.000Z',
					value: '20910',
					taxesRetention: {
						ISSQN: '0',
						IRRF: '0',
						CSLL: '0',
						COFINS: '0',
						INSS: '0',
						PIS: '0',
					},
					technicalRetention: {
						value: '1045',
						percentage: '5',
					},
					attachedNotes: [],
				},
				{
					id: '4',
					contractId: '2',
					invoiceNumber: '695321',
					issueDate: '2023-01-15T12:00:00.000Z',
					dueDate: '2023-01-31T12:00:00.000Z',
					value: '20910',
					taxesRetention: {
						ISSQN: '0',
						IRRF: '0',
						CSLL: '0',
						COFINS: '0',
						INSS: '0',
						PIS: '0',
					},
					technicalRetention: {
						value: '1045',
						percentage: '5',
					},
					attachedNotes: [],
				},
			],
		})
	},

	routes() {
		this.namespace = 'api'

		this.get('/companies', () => {
			return this.schema.all('companies')
		})

		this.get('/contracts', () => {
			return this.schema.all('contracts')
		})
	},
})

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/company/:id',
		element: <ContractPage />,
	},
	{
		path: '/company/:companyId/contract/:id',
		element: <Invoices />,
	},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<CompanyLoggedProvider>
			<RouterProvider router={router} />
		</CompanyLoggedProvider>
	</React.StrictMode>
)
