import { prisma } from '@/lib/prisma';
import { asyncHandler } from '@/utils/asyncHandler';

export const GET = asyncHandler(async (req: Request) => {
  const users = await prisma.user.findMany();
  return Response.json(users);
})


export const POST = asyncHandler(async (req: Request) => {
  const { name, email } = await req.json();
  // console.log("body : ", req.json)
  console.log(name, email);
  const newUser = await prisma.user.create({
    data: { name, email },
  });
  return Response.json({ name, email })
})