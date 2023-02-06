import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createServer, Model } from 'miragejs'
import ContractPage from './components/Contract/Contract'

// MIRAGE JS
createServer({
	models: {
		companies: Model,
		contracts: Model,
      invoices: Model
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
         invoices: []
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
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
