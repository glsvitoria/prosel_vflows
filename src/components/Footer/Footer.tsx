import { Copyright } from 'phosphor-react'

export default function Footer() {
	return (
		<footer className="flex items-center justify-between mb-8 mt-8">
			<img src="/logo.png" alt="Logo da VFlows" className="w-40" />
			<p className="flex self-end text-no_black/25 font-bold">
				<Copyright size={24} color="rgba(3, 3, 3, 0.25)" weight="bold" />{' '}
				2022 - Guilherme Vitória
			</p>
		</footer>
	)
}
