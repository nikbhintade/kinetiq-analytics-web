import { NextResponse } from "next/server";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://indexer.dev.hyperindex.xyz/837b74b/v1/graphql",
  cache: new InMemoryCache(),
});

const TOTAL_SUPPLY_QUERY = gql`
  query TotalSupply {
    TotalSupplySnapshot(limit: 1, order_by: { blockNumber: desc }) {
      id
      totalSupply
      blockNumber
    }
  }
`;

export async function GET() {
  try {
    const { data } = await client.query({ query: TOTAL_SUPPLY_QUERY });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch total supply" },
      { status: 500 }
    );
  }
}
