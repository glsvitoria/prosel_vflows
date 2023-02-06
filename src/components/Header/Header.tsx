import { BagSimple } from 'phosphor-react'

interface HeaderProps {
   title: string
   company: {
      id: string, 
      name: string,
      socialReason: string,
      fantasyName: string,
      cnpj: string
   } | null
}

export default function Header({title, company}: HeaderProps) {
	return (
		<header>
			<div className="flex items-center pt-6">
				<img
					src="/logo.png"
					alt="Logo da VFlow"
					className="w-52 mt-8 ml-8"
				/>
				<h1 className="uppercase text-5xl w-full text-center">
					Pagamento de Fornecedor
				</h1>
			</div>
         
			<ul className="grid grid-cols-2 border-2 border-no_black/50 rounded-2xl p-6 text-xl mt-8 mb-6">
				<div className="flex">
					<p className="mr-4">Razão Social:</p>
					<p>{company?.socialReason}</p>
				</div>
				<div className="flex justify-center">
					<p className="mr-4">CNPJ:</p>
					<p>{company?.cnpj}</p>
				</div>
				<div className="flex">
					<p className="mr-4">Nome Fantasia:</p>
					<p>{company?.fantasyName}</p>
				</div>
			</ul>

			<div className="w-full border-2 border-no_black/25 h-16 flex items-center justify-center rounded-2xl mb-4">
				<BagSimple
					size={32}
					color="#030303"
					weight="fill"
					className="mr-4"
				/>
				<h2 className="text-2xl">{title}</h2>
			</div>
		</header>
	)
}
