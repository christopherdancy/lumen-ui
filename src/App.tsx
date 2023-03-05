import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { Blockchain, Nft } from '@ankr.com/ankr.js/dist/types';
import { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { Disclosure, } from '@headlessui/react'
import pmpLogo from './assets/logo.svg'


import {
  chainsToNativeSymbols,
  getAllNativeCurrencyBalances,
  getTotalMultichainBalance,
} from './api';
import Attest from "./components/Attest";
import HistoricalAttestations from "./components/HistoricalAttestations";
 
function App() {
  const [totalBalance, setTotalBalance] = useState<number>();
  const [allNativeBalances, setAllNativeBalances] = useState<{
    [key in Blockchain]?: number;
  }>({});
 
  const nativeBalancesSorted = useMemo(() => {
    // sort allNativeBalances by value, descending and convert it back to an object
    const res = Object.entries(allNativeBalances).sort(([, a], [, b]) => b - a);
    return res;
  }, [allNativeBalances]);
 
  const { address } = useAccount();
 
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!address) {
        return;
      }
      const totalBal = await getTotalMultichainBalance(address);
      const nativeBalances = await getAllNativeCurrencyBalances(address);
      setAllNativeBalances(nativeBalances);
      setTotalBalance(Math.round(totalBal));
      setLoading(false);
    })();
  }, [address]);
 
  return (
    <div className="">
      
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                    <h1 className="font-bold">
                        <img src={pmpLogo} className="h-8 w-auto inline mr-3" />
                        Lumen
                      </h1>
                    </div>
                    <div className="sm:-my-px sm:ml-6 sm:flex sm:space-x-8">

                    </div>
                  </div>
                  <div className="sm:ml-6 sm:flex sm:items-center">

<div className="flex justify-center">
          <ConnectButton showBalance={false}/>
        </div>

                  </div>
                </div>
              </div>

            </>
          )}
        </Disclosure>
</div>
        <div className="px-8 max-w-7xl mb-24">
        <div className='flex flex-col'>
          {address && totalBalance && <Attest userAddress={address} balance= {totalBalance}></Attest>}
          {address && <HistoricalAttestations userAddress={address}/>}
          {!address && <text className="text-center p-16 text-lg">Connect Wallet</text>}
 
          {/* Native currency balances */}
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
         <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
         {address && <text className="text-md font-medium text-gray-900">
         Assets
        </text>}
          <div className="mt-2 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        
          {nativeBalancesSorted.length > 0 && (
                        <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Symbol
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Balance
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {nativeBalancesSorted.map(([chain, bal], idx) => (
                  <tr key={chain + idx}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {chain}
                    </td>
                    {/* @ts-expect-error */}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{bal.toFixed(2)} {chainsToNativeSymbols[chain]}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${(bal * 100).toString().substring(0, 6)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          </div>
          </div>
          </div>
        </div> 
      </div>
    </div>
  );
}
 
export default App;
 
