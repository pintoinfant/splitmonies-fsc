import Head from 'next/head';
import {
  BanknotesIcon,
  Battery100Icon,
  CreditCardIcon,
  CursorArrowRippleIcon,
} from '@heroicons/react/24/outline';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import {CONTRACT_ABIS} from "../utilities/contractDetails"
import { useState } from 'react';


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Home() {
  const { address } = useAccount();
  const [walletAddress, setWalletAddress] = useState(address);
  const [amount, setAmount] = useState(10);
  const [loading , setLoading] = useState(false);
  const { data, isLoading, isSuccess, writeAsync } = useContractWrite({
    address: CONTRACT_ABIS.SMTokenContract.address,
    abi: CONTRACT_ABIS.SMTokenContract.abi,
    functionName: 'faucet',
    args: [walletAddress, 10],
  });

  return (
    <>
      <Head>
        <title>
          Faucet - Splitmonies
        </title>
      </Head>

        {/* Earnings Stats Start */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-x-5 rounded-md bg-white px-5 py-6 shadow sm:px-6 my-4">
          <div>
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-4">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Fuel Your Wallet with DAI!
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Top up your wallet with DAI and split monies with your friends.
                </p>
              </div>
            </div>

            <div className="mt-4 flex-shrink-0 w-full">
              <div className="mt-2 flex">
                <div className="min-w-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    placeholder="0x00000000000000000000000000000000"
                    defaultValue={address}
                    readOnly={true}
                    // onChange={e => setWalletAddress(e.target.value)}
                    aria-describedby="address"
                  />
                </div>
              </div>
              {
                loading ? (
                  <button className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-300 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 my-4">
                  Loading, wait for the transaction to complete.
                </button>
                ) : (
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  writeAsync().then(() => {
                    setLoading(false);
                  })
                }}
                className="relative mt-2 inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Mint 10 DAI
              </button>
                )
              }
              
              
            </div>
          </div>
          {/* Recent Proposals Start */}

          {/* Recent Proposals End */}
        </div>
        {/* Earnings Stats End */}
    </>
  );
}