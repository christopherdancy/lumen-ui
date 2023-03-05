import { ethers } from 'ethers';
import { useContractRead, useProvider } from 'wagmi'
import poa from "../apis/ProofofAccess.json"


const attestations = [
  { date: '3/03', balance: '$4579' },
  { date: '1/22', balance: '$88' },
  { date: '11/22', balance: '$23' },
  { date: '10/22', balance: '$100' },
]

export default function HistoricalAttestations({ userAddress }: { userAddress: string }) {
  const poaContract = "0xD25e37DF87250411A8a5eebEa2085b890316F2e7";

  const tokenId = useContractRead({
    addressOrName: poaContract,
    contractInterface: poa,
    functionName: 'requests',
    args: [userAddress, userAddress],
  })

  return (
    <div className="pb-4">
       <text className="text-md font-medium text-gray-900">
         Attestations
        </text>
      <div className="mt-2 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {attestations.map((attestation) => (
                    <tr key={attestation.date}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {attestation.date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{attestation.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
