import { NextResponse } from "next/server";
import { POSTS_DATA } from '@/data';

export async function GET(){
  return NextResponse.json({ data: POSTS_DATA });
}
