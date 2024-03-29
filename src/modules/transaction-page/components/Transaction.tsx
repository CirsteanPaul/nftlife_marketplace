import React from 'react'
import ITransactionHistory from '../../../types/ITransactionHistory'
import { OtherInfo, TransactionAddress, TransactionContainer, TransactionMoreInfo } from './styles'
type Props = {
    transaction: ITransactionHistory
}
const Transaction = (props : Props) => {
    const { address, name, amount, howMuch, discordName} = props.transaction;
  return (
   <TransactionContainer>
        
        <TransactionAddress>{address}</TransactionAddress>
        {discordName !== '' &&<TransactionAddress>{discordName}</TransactionAddress>}

        <OtherInfo>
        <TransactionMoreInfo>{name}</TransactionMoreInfo>
        <TransactionMoreInfo>{amount}</TransactionMoreInfo>
        <TransactionMoreInfo>{howMuch | 0}</TransactionMoreInfo>
        </OtherInfo>
   </TransactionContainer>
  )
}

export default Transaction