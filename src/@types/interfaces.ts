import { Dispatch } from "react"

export interface ICompany {
	id: string
	name: string
	socialReason: string
	fantasyName: string
	cnpj: string
}

export interface IContract {
	id: string
	companyId: string
	contractName: string
	contractCode: string
	technicalRetention: number
}

export interface IInvoice {
	id: string
	contractId: string
	companyId: string
	invoiceNumber: number
	issueDate: string
	dueDate: string
	amount: number
	taxesRetention: {
		ISSQN: number
		IRRF: number
		CSLL: number
		COFINS: number
		INSS: number
		PIS: number
	}
	technicalRetention: {
		value: string
		percentage: string
	}
	attachedNotes: []
}

export type UserInfoContextType = {
   userInfo: UserInfo | null
   setUserInfo: Dispatch<React.SetStateAction<UserInfo | null>>
}

export type UserInfo = {
   company: ICompany | null
   contracts: IContract | IContract[] | null
   invoices: IInvoice[] | null
}