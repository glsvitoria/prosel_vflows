import { createContext, Dispatch, useState } from "react";
import { ICompany, IContract, IInvoice } from "../@types/interfaces";

export type UserInfoContextType = {
   userInfo: UserInfo | null
   setUserInfo: Dispatch<React.SetStateAction<UserInfo | null>>
}

export type UserInfo = {
   company: ICompany | undefined
   contracts: IContract | IContract[] | null
   invoices: IInvoice[] | null
}

export const UserInfoContext = createContext<UserInfoContextType | {}>({})

export const CompanyLoggedProvider = (props: any) => {
   const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
   return (
      <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
         {props.children}
      </UserInfoContext.Provider>
   )
}