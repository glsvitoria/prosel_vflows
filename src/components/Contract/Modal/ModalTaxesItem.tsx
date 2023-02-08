interface ModalTaxesItemProps {
   title: string
   taxesValue: number
   color: string
}

export default function ModalTaxesItem({title, taxesValue, color}: ModalTaxesItemProps) {
	return (
		<li className={`text-xl rounded-2xl py-2 mt-5 bg-button_${color}/75`}>
			{title}:{' '}
			<span className="text-sm font-bold">
				{taxesValue}
			</span>
		</li>
	)
}
