import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MagnifyingGlass } from 'phosphor-react'
import { IContract } from '../../@types/interfaces'

import Pagination from '../Pagination/Pagination'
import ModalDetails from './Modal/ModalDetails'

interface TableProps {
	contracts: IContract[] | null | undefined
}

export default function Table({ contracts }: TableProps) {
	const [checkboxChecked, setCheckboxCheked] = useState<string[]>([])
	const [viewContractError, setViewContractError] = useState('')
	const navigate = useNavigate()
	const location = useLocation()
	const [modalIsOpen, setIsOpen] = useState(false)
	const [contractID, setContractID] = useState('')

	function backToHome() {
		navigate('/')
	}

	function viewAContract() {
		if (checkboxChecked.length === 0) {
			setViewContractError('Ao menos um Contrato deverá ser selecionado')
			return false
		}

		if (checkboxChecked.length >= 2) {
			setViewContractError('Somente um Contrato deverá ser selecionado')
			return false
		}

		navigate(`${location.pathname}/contract/${checkboxChecked[0]}`)
	}

	function handleClick(id: string) {
		setContractID(id)
		setIsOpen(true)
	}

	return (
		<>
			<div className="xl:w-full w-[1024px] max-w-full overflow-x-scroll">
				<table
					className=" w-full text-center whitespace-nowrap"
					cellPadding={12}
				>
					<thead className="lg:text-xl text-lg bg-table_header text-white h-12">
						<tr>
							<th className="text-left pl-8">Nome do Contrato</th>
							<th>Código do Contrato</th>
							<th>Retenção Técnica</th>
							<th>Detalhes</th>
						</tr>
					</thead>
					<tbody>
						{contracts &&
							// @ts-ignore
							contracts.map((contract: IContract, index: number) => (
								<tr
									className={`lg:text-base text-sm
										${index % 2 == 0 ? 'bg-line_1 h-10' : 'bg-line_2 h-10'}`}
									key={contract.contractName}
								>
									<td className="text-left pl-4">
										<input
											type="checkbox"
											name={`contract_${index}`}
											id={`contract_${index}`}
											className="mr-4 w-4 h-4 align-middle"
											onChange={(e) => {
												if (e.target.checked) {
													setCheckboxCheked([
														...checkboxChecked,
														contract.id,
													])
												} else {
													setCheckboxCheked(
														checkboxChecked.filter(
															(x) => x !== contract.id
														)
													)
												}
											}}
										/>
										{contract.contractName}
									</td>
									<td>{contract.contractCode}</td>
									<td>
										<div className="bg-button_blue w-3/5 text-white mx-auto">
											{contract.technicalRetention}%
										</div>
									</td>
									<td>
										<div
											className="bg-button_blue lg:w-8 lg:h-8 w-6 h-6 rounded flex items-center justify-center mx-auto hover:brightness-90 hover:cursor-pointer duration-300"
											onClick={() => handleClick(contract.id)}
										>
											<MagnifyingGlass
												size={20}
												color="#FFF"
												weight="bold"
											/>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>

			<ModalDetails
				modalIsOpen={modalIsOpen}
				setIsOpen={setIsOpen}
				contractID={contractID}
			/>

			{viewContractError.length != 0 && (
				<span className="text-error">{viewContractError}</span>
			)}

			<Pagination
				backTitle="Home"
				backFunction={backToHome}
				nextTitle="Visualizar contrato"
				nextFunction={viewAContract}
			/>
		</>
	)
}
