import FormUser from './Form/FormUser'

export default function Home() {
	return (
		<main className="flex items-center justify-center w-screen h-screen">
			<section className="bg-white md:w-[600px] sm:w-2/3 w-full sm:mx-0 xl:mx-10 mx-4 flex items-center flex-col rounded-[32px] border-4 max-w-xl">
				<img
					src="/logo.png"
					alt="Logo da VFlows"
					className="md:w-80 sm:w-48 w-36 sm:mb-12 mb-6 sm:mt-12 mt-6"
				/>
				<h2 className="uppercase font-bold md:text-2xl sm:text-lg text-sm text-center">
					Pagamento de Fornecedor
				</h2>

				<FormUser />
			</section>
		</main>
	)
}
