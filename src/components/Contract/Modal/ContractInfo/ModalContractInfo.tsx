interface ModalContractInfoProps {
   invoice: {
      invoiceNumber: number
      amount: number
      issueDate: string
      dueDate: string
   }
}

export default function ModalContractInfo({invoice}: ModalContractInfoProps) {
	return (
		<div className="grid xl:grid-cols-2 grid-cols-1 text-center md:mt-10 mt-6 gap-y-4">
			<p className="lg:text-lg md:text-base text-sm">
				Número da Nota:{' '}
				<span className="md:text-sm text-xs font-bold">
					{invoice.invoiceNumber}
				</span>
			</p>
			<p className="lg:text-lg md:text-base text-sm">
				Valor:{' '}
				<span className="md:text-sm text-xs font-bold">
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					}).format(invoice.amount / 100)}
				</span>
			</p>
			<p className="lg:text-lg md:text-base text-sm">
				Data de Emissão:{' '}
				<span className="md:text-sm text-xs font-bold">
					{new Intl.DateTimeFormat('pt-BR').format(
						new Date(invoice.issueDate)
					)}
				</span>
			</p>
			<p className="lg:text-lg md:text-base text-sm">
				Data de Vencimento:{' '}
				<span className="md:text-sm text-xs font-bold">
					{new Intl.DateTimeFormat('pt-BR').format(
						new Date(invoice.dueDate)
					)}
				</span>
			</p>
		</div>
	)
}
