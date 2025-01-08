import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createVendorSchema, updateVendorBankInput, updateVendorBankSchema } from "@/schemas/vendor.schema";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession } from "next-auth";

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
  
    if(!vendorAdmin){
      throw new ApiError(403, "unauthorised for vendor admin not present", true)
    }
  
    const vendorAdminId = vendorAdmin.id;
  
    const preinput = await req.json();
  
    const input: updateVendorBankInput = updateVendorBankSchema.parse(preinput);
  
  
    // Fetch the vendor using the vendorAdminId
    const vendor = await prisma.vendor.findUnique({
        where: { vendorAdminId },
      });
  
      if (!vendor) {
        throw new ApiError(403, "vendor setup incomplete", true)
    }
  
      // Check if a bank record exists for the vendor
      const existingBank = await prisma.vendorBank.findUnique({
        where: { vendorId: vendor.id },
      });
  
      let updatedBank;
      if (existingBank) {
        // Update the existing bank record
        updatedBank = await prisma.vendorBank.update({
          where: { vendorId: vendor.id },
          data: {
            accountNumber: input.accountNumber,
            bankName: input.bankName,
            holderName: input.holderName,
            ifsc: input.ifsc,
          },
        });
      } else {
        // Create a new bank record if none exists
        updatedBank = await prisma.vendorBank.create({
          data: {
            vendorId: vendor.id,
            accountNumber: input.accountNumber,
            bankName: input.bankName,
            holderName: input.holderName,
            ifsc: input.ifsc,
          },
        });
      }  
  
    return Response
      .json(new ApiResponse(201, { success: true, bank: updatedBank }, "success"), { status: 200 });
  })