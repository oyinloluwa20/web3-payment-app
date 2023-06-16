import React, {useState,useEffect,createContext} from'react';
import {ethers} from 'ethers';

import {contractABI,contractAddress} from ''

export const TransactionContext = createContext();
const {ethereum} = window;

const getEthereumContract =() =>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI,signer)

    return transactionContract;

}

export const TransactionProvider = ({children})=>{
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({addressTo:'',amount:'',keyword:'',message:''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const handleChange =(e,name)=>{
        setFormData((preState)=>({...preState,[name]:e.target.value}))
    }

    const getAllTransaction =async()=>{
    try {
         if(!ethereum) return alert("please install metamask");
         const transactionContract= getEthereumContract();
         const availableTransactions =await transactionContract.getAllTransaction()
         const structuredTransactions =availableTransactions.map((transaction)=>({
             addressTo:transaction.receiver,
             addressFrom:transaction.sender,
             timestamp:new Date(transaction.timestamp.toNumber()*1000).toLocaleString(),
             message:transaction.message,
             keyword:transaction.keyword,
             amount:parseInt(transaction.amount._hex)/(10**18)
         }))
         setTransaction(structuredTransactions)
                }        
    catch(error){
        console.log(error);
        throw new Error("No Ethereum Object.");
    }
}

    const checkIfWalletIsConnected =async()=>{
    try {
        if(!ethereum) return alert("please install metamask");
        const accounts =await ethereum.request({method:'eth_accounts'});
        if(accounts.length){
        setCurrentAccount(accounts[0]);
        getAllTransaction();
        }else{
        console.log('No accounts found')
        }
        } catch (error) {
            console.error();
            throw new Error("No Ethereum Object.")
        }
}

    const checkIfTransactionsExist = async ()=>{
        try {
        const transactionContract= getEthereumContract();
        const transactionCount = await transactionContract.getTransactionCount();
        window.localStorage.setItem("transactionCount",transactionCount )    
        } catch(error){
            console.log(error);
            throw new Error("No Ethereum Object.");
        }
    }

    const connectWallet = () =>{
        try{
            if (!ethereum) return alert ("please install metamask");

            const accounts = await ethereum.request({method:'eth_requestAccounts'})
            setCurrentAccount(accounts[0]);
        
        } catch(error){
            console.log(error);

            throw new Error("No Ethereum Object.");
        }
    }


    const sendTransaction =async()=>{
        try {
              if(!ethereum) return alert("please install metamask");
        const {addressTo,amount,keyword,message} =formData;
        const transactionContract= getEthereumContract();
        const parsedAmount =ether.utils.parseEther(amount);

        await ethereum.request({
            method:'eth_sendTransaction',
            params:[{
                from:currentAccount,
                to:addressTo,
                gas:'0x5208',
                value:parsedAmount._hex,
            }]
        });

           const transactionHash = await transactionContract.addToBlockchain(addressTo,parsedAmount,keyword,message);
               setIsLoading(true);
               await transactionHash.wait()
               setIsLoading(false)
           const transactionCount = await transactionContract.getTransactionCount();
           setTransactionCount(transactionCount.toNumber())
            window.reload()
        } catch(error){
                    console.log(error);
        
                    throw new Error("No Ethereum Object.");
                }
            }

    useEffect(()=>{
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    },[])

return(
<TransactionContext.Provider value={{connectWallet,currentAccount,formData,sendTransaction,handleChange,transactions,isLoading}}>
{children}
</TransactionContext.Provider>
    )

}