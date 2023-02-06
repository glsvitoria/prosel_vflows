import FormUser from './Form/FormUser'

export default function Home() {
	return (
		<main className="flex items-center justify-center w-screen h-screen">
			<section className="bg-white w-[600px] flex items-center flex-col rounded-[32px] border-4">
				<img
					src="/logo.png"
					alt="Logo da VFlows"
					className="w-80 mb-12 mt-12"
				/>
				<h2 className="uppercase font-bold text-2xl">
					Pagamento de Fornecedor
				</h2>

				<FormUser />
			</section>
		</main>
	)
}