import { useProvider } from 'wagmi'
import poa from "../apis/ProofofAccess.json"
import { BigNumber, ethers } from 'ethers'

export const getProposalVotes = async (
) => {
  const provider = useProvider()
  const contract = new ethers.Contract(
    '0x1413B73E2b97f1aEDf047Ef2667F1cE0D874B3b1',
    poa,
    provider
  )
  const voteEventFilter = contract.filters.Attested();
  const votes = await contract.queryFilter(voteEventFilter);
  console.log(voteEventFilter)
  console.log(votes)
  console.log('hi')
  // const proposalVotesEvent = votes.filter(voteEvent =>
  //   voteEvent.args.proposalId.eq(proposalNumber)
  // );

  // return proposalVotesEvent.map(({ args }) => ({
  //   voter: args.voter,
  //   choice: VOTE_CHOICES[args.support],
  //   weight: args.weight,
  // }));
};


export default function HistoricalAttestations() {
  getProposalVotes()
  return (
    <div className="py-4">
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
                  {/* {attestations.map((attestation) => (
                    <tr key={attestation.date}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {attestation.date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{attestation.balance}</td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
