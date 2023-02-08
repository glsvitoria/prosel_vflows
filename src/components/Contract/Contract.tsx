import { useContext, useEffect } from 'react'
import {
	UserInfoContext,
} from '../../providers/userInfoContext'

import Header from '../Header/Header'
import Table from './Table'
import Footer from '../Footer/Footer'
import { api } from '../../services/api'
import { UserInfo, UserInfoContextType } from '../../@types/interfaces'

export default function ContractPage() {
	const { userInfo, setUserInfo } = useContext(
		UserInfoContext
	) as UserInfoContextType

   function searchInvoices(user: UserInfo) {
      if (!user || !user.company) return

      api.get(`/invoices/company/${user.company.id}`).then(response => {
         const invoices = response.data.invoices

         const userInfoFind = {
            company: user.company,
            contracts: user.contracts,
            invoices
         }
         
         localStorage.setItem('userInfo', JSON.stringify(userInfoFind))
         setUserInfo(userInfoFind)
      })
   }

	useEffect(() => {
		if (userInfo == null) {
			const userInfoStorage = localStorage.getItem('userInfo')
         // @ts-ignore
			const userInfoParse: UserInfo = JSON.parse(userInfoStorage)

         searchInvoices(userInfoParse)
		}      
	}, [])


	return (
		<main className="w-full h-full flex justify-center">
			<section className="bg-white mx-10 mt-10 mb-10 rounded border-4 px-6 max-w-[1440px] w-full">
				<Header
					title="Contratos Vinculados"
					company={userInfo?.company}
					isSuitcase={true}
				/>

				<Table contracts={userInfo?.contracts} />

				<Footer />
			</section>
		</main>
	)
}
