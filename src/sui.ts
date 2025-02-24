import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { SuiGraphQLClient } from '@mysten/sui/graphql';
import { graphql } from '@mysten/sui/graphql/schemas/latest';
import { Transaction } from '@mysten/sui/dist/cjs/transactions/Transaction';

const rpcUrl = getFullnodeUrl('testnet');
 
export const client = new SuiClient({ url: rpcUrl });
 
const gqlClient = new SuiGraphQLClient({
	url: 'https://sui-testnet.mystenlabs.com/graphql',
});

const chainIdentifierQuery = graphql(`
  query DryRunTransactionBlock($tx: String!) {
    dryRunTransactionBlock(txBytes: $tx) {
      results {
        returnValues {
          type {
            repr
          }
          bcs
        }
      }
      error
    }
  }
`);
 
export async function dryRunTransaction(tx: Transaction) {

  const txBytes = await tx.build({
    client
  });

	const result = await gqlClient.query({
		query: chainIdentifierQuery,
		variables: {
			tx: Buffer.from(txBytes).toString('base64')
		}
	});
  

  return result;
}