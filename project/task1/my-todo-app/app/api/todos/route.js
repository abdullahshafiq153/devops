import dbConnect from '../../../lib/db';
import Todo from '../../../models/Task';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const todos = await Todo.find({});
  return NextResponse.json(todos);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const todo = await Todo.create(body);
  return NextResponse.json(todo, { status: 201 });
}