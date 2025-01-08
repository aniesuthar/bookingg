import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { CreateVendorInput, createVendorSchema } from '@/schemas/vendor.schema';
import { ApiError } from '@/utils/ApiError';
import { ApiResponse } from '@/utils/ApiResponse';
import { asyncHandler } from '@/utils/asyncHandler';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const GET = asyncHandler(async (req: Request, res: Response) => {
  const session = await getServerSession(authOptions);

  if (!session) {

    return Response
      .json(new ApiResponse(201, { error: "Unauthorized", session }, "success"), { status: 200 });
  }

  // Return authenticated user's data

  const user = session.user;
  const vendorAdmin = await prisma.user.findFirst({
    where: {
      email: user?.email || ""
    }
  })
  if (!vendorAdmin) {
    return Response
      .json(new ApiResponse(201, { error: "No Vendor present", session }, "success"), { status: 200 });
  }

  const vendor = await prisma.vendor.findFirst({
    where: { vendorAdminId: vendorAdmin.id }
  })



  return Response
    .json(new ApiResponse(201, { vendor , user : session.user}, "success"), { status: 200 });
})


export const POST = asyncHandler(async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.email == null) {
    throw new ApiError(403, "unauthorised", true)
  }

  console.log("authorised" , session.user.email)

  const vendorAdminEmail = session.user.email;
  const vendorAdmin = await prisma.user.findUnique({
    where: {
      email: vendorAdminEmail
    }
  })
  console.log(vendorAdmin);

  if(!vendorAdmin){
    throw new ApiError(403, "unauthorised for vendor admin not present", true)
  }

  const vendorAdminId = vendorAdmin.id;

  console.log("vendor input id " , vendorAdminId)
  const preinput = await req.json();
  console.log(" pre input " , preinput );

  const input: CreateVendorInput = createVendorSchema.parse(preinput);

  console.log("input " , input);

  // Check if a vendor with the given admin ID already exists
  const existingVendor = await prisma.vendor.findUnique({
    where: { vendorAdminId },
  });

  if (existingVendor) {
    throw new ApiError(403, "Vendor with this admin already exists")
  }

  // Create the vendor
  const newVendor = await prisma.vendor.create({
    data: {
      name: input.name,
      bio: input.bio,
      email: input.email,
      phone: input.phone,
      phoneAlt: input.phoneAlt,
      addressCity: input.addressCity,
      addressPinCode: input.addressPinCode,
      addressState: input.addressState,
      addressStreet: input.addressStreet,
      coverPhoto: input.coverPhoto,
      logo: input.logo,
      maxBookingWindow: input.maxBookingWindow,
      minBookingWindow: input.minBookingWindow,
      googleMapUrl: input.googleMapUrl,
      slug: input.slug,
      startYear: input.startYear,
      showBusinessDetails: input.showBusinessDetails,
      vendorAdminId: vendorAdminId,
    },
  });



  return Response
    .json(new ApiResponse(201, { success: true, vendor: newVendor }, "success"), { status: 200 });
})