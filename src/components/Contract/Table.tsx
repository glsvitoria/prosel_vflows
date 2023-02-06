import { MagnifyingGlass, CaretRight, CaretLeft } from 'phosphor-react'
import { Contract } from './Contract'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface TableProps {
	contracts:  Contract[] | null
}

export default function Table({ contracts }: TableProps) {
   const [checkboxChecked, setCheckboxCheked] = useState<number[]>([])
   const [viewContractError, setViewContractError] = useState('')
	const navigate = useNavigate()
	function backToHome() {
		navigate('/')
	}

   function viewAContract() {
      if(checkboxChecked.length === 0){
         setViewContractError('Ao menos um Contrato deverá ser selecionado')
         return false
      }

      if(checkboxChecked.length >= 2){
         setViewContractError('Somente um Contrato deverá ser selecionado')
         return false
      }

      console.log('ver contrato')
   }
	return (
		<>
			<table className="w-full text-center mb-4">
				<thead className="text-xl bg-table_header text-white h-12">
					<tr>
                  <th className="text-left pl-8">Nome do Contrato</th>
                  <th>Código do Contrato</th>
                  <th>Retenção Técnica</th>
                  <th>Detalhes</th>
               </tr>
				</thead>
				<tbody>
					{contracts && (
						contracts.map((contract: Contract, index: number) => (
							<tr
								className={
									index % 2 == 0 ? 'bg-line_1 h-10' : 'bg-line_2 h-10'
								}
                        key={contract.contractName}
							>
								<td className="text-left pl-4">
									<input
										type="checkbox"
										name={`contract_${index}`}
										id={`contract_${index}`}
										className="mr-4"
                              onChange={(e) => {
                                 if(e.target.checked) {
                                    setCheckboxCheked([...checkboxChecked, index])
                                 } else {
                                    setCheckboxCheked(checkboxChecked.filter(x => x !== index))
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
									<div className="bg-button_blue w-8 h-8 rounded flex items-center justify-center mx-auto hover:brightness-90 hover:cursor-pointer duration-300">
										<MagnifyingGlass
											size={24}
											color="#FFF"
											weight="bold"
										/>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>

         {viewContractError.length != 0 && <span className='text-error'>{viewContractError}</span>}

			<div className="flex justify-end">
				<div
					className="bg-previous flex items-center justify-center rounded-md hover:cursor-pointer hover:brightness-90 duration-300 h-8 w-24 mr-4 text-white"
					onClick={backToHome}
				>
					<CaretLeft size={28} color="#FFF" weight="bold" />
					Home
				</div>
				<div className="bg-next flex items-center justify-center rounded-md hover:cursor-pointer hover:brightness-90 duration-300 h-8 w-48 text-white" onClick={viewAContract}>
					Visualizar contrato
					<CaretRight size={28} color="#FFF" weight="bold" />
				</div>
			</div>
		</>
	)
}
