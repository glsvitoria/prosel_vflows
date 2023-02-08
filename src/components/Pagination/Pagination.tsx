import { CaretLeft, CaretRight } from 'phosphor-react'

interface PaginationProps {
	backTitle: string
	nextTitle: string
	backFunction: () => void
	nextFunction: () => void
}

export default function Pagination({
	backTitle,
	nextTitle,
	backFunction,
	nextFunction,
}: PaginationProps) {
	return (
		<div className="flex justify-end mt-4">
			<div
				className="bg-previous flex items-center justify-center rounded-md hover:cursor-pointer hover:brightness-90 duration-300 h-10 w-auto mr-4 text-white md:text-base sm:text-sm text-xs pl-2 pr-4"
				onClick={backFunction}
			>
				<CaretLeft size={20} color="#FFF" weight="bold" />
				{backTitle}
			</div>
			<div
				className="bg-next flex items-center justify-center rounded-md hover:cursor-pointer hover:brightness-90 duration-300 h-10 w-auto text-white md:text-base sm:text-sm text-xs pl-4 pr-2"
				onClick={nextFunction}
			>
				{nextTitle}
				<CaretRight size={20} color="#FFF" weight="bold" />
			</div>
		</div>
	)
}
