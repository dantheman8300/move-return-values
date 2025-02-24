import { Transaction } from '@mysten/sui/transactions';
import { client, dryRunTransaction } from './sui';
import { base64ToNumber } from './helpers';

const main = async () => {
  await dryRunWithJSONRPC();
  await dryRunWithGraphQL();
}

const dryRunWithJSONRPC = async () => {
  const tx = new Transaction();

  tx.setSender('0x8e8cae7791a93778800b88b6a274de5c32a86484593568d38619c7ea71999654')

  tx.moveCall({
    target: `0xdddc2fa25cc540c720b94ee6291f7bbaede2dbc52aa5ecfcaae014435de26855::example_return::return_8`,
  });

  const result = await client.dryRunTransactionBlock({
    transactionBlock: await tx.build({ client }),
  });

  console.log(JSON.stringify(result, null, 2));
}

const dryRunWithGraphQL = async () => {
  const tx = new Transaction();

  tx.setSender('0x8e8cae7791a93778800b88b6a274de5c32a86484593568d38619c7ea71999654')

  tx.moveCall({
    target: `0xdddc2fa25cc540c720b94ee6291f7bbaede2dbc52aa5ecfcaae014435de26855::example_return::return_8`,
  });

  const result = await dryRunTransaction(tx);

  console.log(JSON.stringify(result, null, 2));

  const decoded_value = base64ToNumber((result as any).data?.dryRunTransactionBlock?.results[0].returnValues[0].bcs);

  console.log(`Decoded value: ${decoded_value}`);
}

main().catch(console.error);