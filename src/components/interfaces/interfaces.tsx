export interface Company {
   id: string, 
   name: string,
   socialReason: string,
   fantasyName: string,
   cnpj: string,
}

export interface Contract {
   id: string
	companyId: string
	contractName: string
	contractCode: string
	technicalRetention: string
}