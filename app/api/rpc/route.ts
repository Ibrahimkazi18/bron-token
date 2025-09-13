import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const alchemyUrl = `https://solana-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

  const response = await fetch(alchemyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'RPC request failed' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}