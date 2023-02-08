import { BagSimple, Note } from 'phosphor-react'

interface HeaderProps {
	title: string
	company:
		| {
				id: string
				name: string
				socialReason: string
				fantasyName: string
				cnpj: string
		  }
		| null
		| undefined
	isSuitcase: boolean
}

export default function Header({ title, company, isSuitcase }: HeaderProps) {
	return (
		<header>
			<div className="flex items-center pt-6">
				<img
					src="/logo.png"
					alt="Logo da VFlow"
					className="xl:w-52 lg:w-40 sm:w-32 w-24 lg:mt-4 md:ml-8 ml-2"
				/>
				<h1 className="uppercase 2xl:text-5xl lg:text-4xl md:text-2xl sm:text-lg xm:text-base text-sm w-full text-center">
					Pagamento de Fornecedor
				</h1>
			</div>

			<ul className="grid sm:grid-cols-2 sm:gap-0 gap-2 border-2 border-no_black/50 rounded-2xl sm:p-6 p-4 xl:text-xl md:text-base sm:text-sm xm:text-base text-sm mt-8 mb-6">
				<div className="flex sm:justify-start justify-center">
					<p className="mr-4 lg:block hidden">Razão Social:</p>
					<p>{company?.socialReason}</p>
				</div>
				<div className="flex md:justify-center sm:justify-end justify-center">
					<p className="mr-4 md:block sm:hidden">CNPJ:</p>
					<p>{company?.cnpj}</p>
				</div>
				<div className="flex sm:justify-start justify-center">
					<p className="mr-4  lg:block hidden">Nome Fantasia:</p>
					<p>{company?.fantasyName}</p>
				</div>
			</ul>

			<div className="w-full border-2 border-no_black/25 h-16 flex items-center justify-center rounded-2xl mb-4">
				{isSuitcase ? (
					<BagSimple
						size={32}
						color="#030303"
						weight="fill"
						className="mr-4"
					/>
				) : (
					<Note
						size={32}
						color="#030303"
						weight="regular"
						className="mr-4"
					/>
				)}
				<h2 className="text-2xl">{title}</h2>
			</div>
		</header>
	)
}
