import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createServer, Model } from 'miragejs'

import App from './App'
import ContractPage from './components/Contract/Contract'
import Invoices from './components/Invoices/Invoices'
import { UserInfoProvider } from './providers/userInfoContext'

// REACT ROUTER DOM
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

// MIRAGE JS - DATABASE
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
					technicalRetention: 10,
				},
				{
					id: '2',
					companyId: '1',
					contractName: 'Título do segundo contrato de exemplo',
					contractCode: '22002200-02',
					technicalRetention: 5,
				},
				{
					id: '3',
					companyId: '1',
					contractName: 'Título do terceiro contrato de exemplo',
					contractCode: '33003300-03',
					technicalRetention: 15,
				},
				{
					id: '4',
					companyId: '1',
					contractName: 'Título do quarto contrato de exemplo',
					contractCode: '44004400-04',
					technicalRetention: 8,
				},
			],
			invoices: [
				{
					id: '1',
					contractId: '1',
               companyId: '1',
					invoiceNumber: 523391,
					issueDate: '2023-01-31T22:00:00.000Z',
					dueDate: '2023-02-10T22:00:00.000Z',
					amount: 15990,
					taxesRetention: {
						ISSQN: 8,
						IRRF: 0,
						CSLL: 2,
						COFINS: 5,
						INSS: 0,
						PIS: 9,
					},
					attachedNotes: [],
				},
				{
					id: '2',
					contractId: '4',
               companyId: '1',
					invoiceNumber: 413781,
					issueDate: '2023-01-20T15:00:00.000Z',
					dueDate: '2023-01-28T15:00:00.000Z',
					amount: 20910,
					taxesRetention: {
						ISSQN: 10,
						IRRF: 4,
						CSLL: 0,
						COFINS: 2,
						INSS: 0,
						PIS: 1,
					},
					attachedNotes: [],
				},
				{
					id: '3',
					contractId: '3',
               companyId: '1',
					invoiceNumber: 589396,
					issueDate: '2023-01-15T18:00:00.000Z',
					dueDate: '2023-01-31T18:00:00.000Z',
					amount: 20910,
					taxesRetention: {
						ISSQN: 2,
						IRRF: 0,
						CSLL: 7,
						COFINS: 4,
						INSS: 5,
						PIS: 0,
					},
					attachedNotes: [],
				},
				{
					id: '4',
					contractId: '2',
               companyId: '1',
					invoiceNumber: 695321,
					issueDate: '2023-01-15T12:00:00.000Z',
					dueDate: '2023-01-31T12:00:00.000Z',
					amount: 20910,
					taxesRetention: {
						ISSQN: 1,
						IRRF: 8,
						CSLL: 3,
						COFINS: 5,
						INSS: 12,
						PIS: 0,
					},
					attachedNotes: [],
				},
			],
		})
	},

   // GET REQUEST
	routes() {
		this.namespace = 'api'

      // CATCH ALL COMPANIES
		this.get('/companies', () => {
			return this.schema.all('companies')
		})

      // CATCH CONTRACT BY ID
      this.get('/contracts/:id', (_, req) => {
         let id: string = req.params.id

			return this.schema.all('contracts').filter((contract) => contract.id == id)
		})

      // CATCH CONTRACTS BY COMPANY ID
		this.get('/contracts/company/:id', (_, req) => {
         let id: string = req.params.id
         
         // @ts-ignore
			return this.schema.all('contracts').filter((contract) => contract.companyId == id)
		})

      // CATCH INVOICES BY COMPANY ID
      this.get('/invoices/company/:id', (_, req) => {
         let id: string = req.params.id

         // @ts-ignore
			return this.schema.all('invoices').filter((invoices) => invoices.companyId == id)
		})

      // CATCH INVOICES BY CONTRACT ID
      this.get('/invoices/contract/:id', (_, req) => {
         let id: string = req.params.id

         // @ts-ignore
			return this.schema.all('invoices').filter((invoices) => invoices.contractId == id)
		})

      // CATCH INVOICES BY ID
      this.get('/invoices/:id', (_, req) => {
         let id: string = req.params.id

			return this.schema.all('invoices').filter((invoices) => invoices.id == id)
		})
	},
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<UserInfoProvider>
			<RouterProvider router={router} />
		</UserInfoProvider>
	</React.StrictMode>
)
