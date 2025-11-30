// import { Spin } from "antd";
// import { useGetMmfbalances } from "../hooks/useTransfer";

// export default function AccountOverview() {
//   const { mmfBalances, isLoading } = useGetMmfbalances();

//   if (isLoading) {
//     return <Spin />;
//   }

//   // Extract accounts from the response data
//   const accounts = mmfBalances?.data || [];
//   console.log(mmfBalances);

//   return (
//     <div className="w-full mx-auto">
//       <h2 className="text-lg font-bold text-gray-800 mb-4">Account Summary</h2>

//       {accounts.length === 0 ? (
//         <div className="text-center py-8 text-gray-500">No accounts found</div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {accounts.map((account) => (
//             <div
//               key={account._id}
//               className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition duration-300"
//             >
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="text-md font-semibold text-gray-700">
//                   {account.accountName}
//                 </h3>
//                 <span className="text-xs bg-[#00ff7f]/20 text-[#00ff7f] px-2 py-1 rounded-full">
//                   {account.currency}
//                 </span>
//               </div>

//               <div className="text-sm text-gray-600 space-y-1">
//                 <div className="flex justify-between">
//                   <span>Balance:</span>
//                   <span className="font-semibold text-gray-800">
//                     {account.balance}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Available:</span>
//                   <span className="font-semibold text-gray-800">
//                     {account.available}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Uncleared:</span>
//                   <span>{account.uncleared}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Minimum:</span>
//                   <span>{account.minimum}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { Spin } from "antd";
import { useGetMmfbalances } from "../hooks/useTransfer";

export default function AccountOverview() {
  const { mmfBalances, isLoading } = useGetMmfbalances();

  if (isLoading) {
    return <Spin />;
  }

  // The correct path to the accounts array
  const accounts = mmfBalances?.data?.[0]?.accounts || [];

  console.log("Accounts:", accounts);

  return (
    <div className="w-full mx-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Account Summary</h2>

      {accounts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No accounts found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {accounts.map((account) => (
            <div
              key={account._id}
              className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-semibold text-gray-700">
                  {account.accountName}
                </h3>
                <span className="text-xs bg-[#00ff7f]/20 text-[#00ff7f] px-2 py-1 rounded-full">
                  {account.currency}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Balance:</span>
                  <span className="font-semibold text-gray-800">
                    {account.balance}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Available:</span>
                  <span className="font-semibold text-gray-800">
                    {account.available}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Uncleared:</span>
                  <span>{account.uncleared}</span>
                </div>

                <div className="flex justify-between">
                  <span>Minimum:</span>
                  <span>{account.minimum}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
