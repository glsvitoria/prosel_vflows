import { Copyright } from 'phosphor-react'

export default function Footer() {
	return (
		<footer className="flex items-center sm:justify-between justify-center mb-8 mt-8">
			<img
				src="/logo.png"
				alt="Logo da VFlows"
				className="lg:w-40 sm:w-32 w-24 sm:block hidden"
			/>
			<p className="flex items-center gap-2 self-end text-no_black/25 font-bold lg:text-base sm:text-sm text-xs">
				<Copyright size={20} color="rgba(3, 3, 3, 0.25)" weight="bold" />{' '}
				2022 - Guilherme Vitória
			</p>
		</footer>
	)
}
