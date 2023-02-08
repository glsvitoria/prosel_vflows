interface ModalTaxesItemProps {
	title: string
	taxesValue: number
	color: string
}

export default function ModalTaxesItem({
	title,
	taxesValue,
	color,
}: ModalTaxesItemProps) {
	return (
		<li
			className={`xl:text-xl lg:text-lg text-sm rounded-2xl py-2 mt-5 ${
				color === 'green' ? 'bg-button_green/75' : 'bg-button_blue/75'
			}`}
		>
			{title}: <span className="lg:text-sm text-xs font-bold">{taxesValue}</span>
		</li>
	)
}
