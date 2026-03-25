import { NextRequest, NextResponse } from 'next/server';
import { getAllTags } from '@/lib/posts';

export async function GET(request: NextRequest) {
  const tags = getAllTags();
  return NextResponse.json({ tags });
}
