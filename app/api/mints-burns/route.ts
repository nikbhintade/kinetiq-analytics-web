import { NextResponse } from "next/server";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT as string,
  cache: new InMemoryCache(),
});

export async function POST(req: Request) {
  try {
    const { query, variables } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const { data } = await client.query({
      query: gql`
        ${query}
      `, // Dynamically compile the query string
      variables: variables || {},
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("GraphQL API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GraphQL data" },
      { status: 500 }
    );
  }
}
