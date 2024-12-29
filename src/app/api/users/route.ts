import { prisma } from '@/lib/prisma';
import { CreateUserInput, createUserSchema } from '@/schemas/user.schema';
import { ApiError } from '@/utils/ApiError';
import { ApiResponse } from '@/utils/ApiResponse';
import { asyncHandler } from '@/utils/asyncHandler';
import { NextResponse } from 'next/server';

export const GET = asyncHandler(async (req: Request) => {
  const users = await prisma.user.findMany();
  return Response.json(users);
})


export const POST = asyncHandler(async (req: Request) => {
  const input = await req.json();
  // console.log("body : ", req.json)

  const parsedInput:CreateUserInput = createUserSchema.parse(input);
  console.log("parsedInput : ",parsedInput);
  
  const newUser = await prisma.user.create({
    data: { name:parsedInput.name, email:parsedInput.email },
  });
  console.log("newUser :" , newUser , typeof newUser);

  if(!newUser){
    throw new ApiError(400 , "User creation unsuccessful")
  }
  // console.log("newUser :" , newUser , typeof newUser);

  return Response
    .json(new ApiResponse(201, { exists: true ,newUser }, "success") , {status:200});
})