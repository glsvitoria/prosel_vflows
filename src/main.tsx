import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Contract from './components/Contract/Contract'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createServer, Model } from 'miragejs'

// MIRAGE JS
createServer({
	models: {
		companies: Model,
		contracts: Model,
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
					cnpj: '09.087.065/0432.01',
				},
			],
			contracts: [
				{
					companyId: '1',
					contractName: 'Título do primeiro contrato de exemplo',
					contractCode: '11001100-01',
					technicalRetention: '10',
				},
				{
					companyId: '1',
					contractName: 'Título do segundo contrato de exemplo',
					contractCode: '22002200-02',
					technicalRetention: '5',
				},
				{
					companyId: '1',
					contractName: 'Título do terceiro contrato de exemplo',
					contractCode: '33003300-03',
					technicalRetention: '15',
				},
				{
					companyId: '1',
					contractName: 'Título do quarto contrato de exemplo',
					contractCode: '44004400-04',
					technicalRetention: '8',
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
		element: <Contract />,
	},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
