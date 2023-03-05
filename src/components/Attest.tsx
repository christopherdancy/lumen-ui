import USDC from '../assets/images/Logo_USDC.png'
import {useState, useEffect} from "react";
import { useAccount, useContractWrite, usePrepareContractWrite, useContractRead } from 'wagmi'
import poa from "../apis/ProofofAccess.json"
import { format } from 'date-fns';
import { DEFAULT_DATE_FORMAT } from '../numberFormats';
import { ethers } from 'ethers';
import { useProvider } from 'wagmi'




export interface DonationStatsProps  {
  projectAddress: string
  contractAddress: string
}

export default function Attest({ userAddress, balance }: { userAddress: string, balance: number }) {
  const provider = useProvider()
  const poaContract = "0x1413B73E2b97f1aEDf047Ef2667F1cE0D874B3b1";
  const { config } = usePrepareContractWrite({
    addressOrName: poaContract,
    contractInterface: poa,
    functionName: 'attest',
    args: [
      userAddress,
    ],
  })

  const { write } = useContractWrite(config)
  

  const tokenId = useContractRead({
    addressOrName: poaContract,
    contractInterface: poa,
    functionName: 'requests',
    args: [userAddress, userAddress],
  })

  const { data }  = useContractRead({
    addressOrName: poaContract,
    contractInterface: poa,
    functionName: 'tokenPortfolios',
    args: [tokenId.data],
    watch: true,
  })
return(
  <div className="py-6 grid grid-cols-3 gap-4">
    <div className='col-start-1 col-end-1 flex w-full text-sm font-medium text-black'>
      <span className="flex flex-grow flex-col">
        <text className="text-lg font-medium text-gray-900">
        Total Assets: ${balance}
        </text>
        <text  className="text-sm text-gray-500">
          {`${userAddress.substring(0, 6)}...${userAddress.slice(-4)}`}
        </text>
      </span>
    </div>
    <div className='col-start-3 col-end-3 flex w-full'>
    <div className='flex flex-grow flex-row gap-6 justify-end items-center'>
      <div className=''>
        {data && <text className=''>{format(data.toNumber() * 1000, DEFAULT_DATE_FORMAT)}</text>}
      </div>
       <div className=''>
          <button
            type="submit"
            onClick={()=>{ write && write()}}
            className="rounded-md border border-transparent bg-emerald-600 py-2 px-12 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
            Attest
          </button>
        </div>
      </div>
    </div>
  </div>
)

}