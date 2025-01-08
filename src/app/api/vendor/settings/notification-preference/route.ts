import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createVendorSchema, updateVendorBankInput, updateVendorBankSchema, updateVendorNotificationPreferencesSchema } from "@/schemas/vendor.schema";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession } from "next-auth";

export const GET = asyncHandler(async (req: Request) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.email == null) {
        throw new ApiError(403, "unauthorised", true)
    }

    console.log("authorised", session.user.email)

    const vendorAdminEmail = session.user.email;
    const vendorAdmin = await prisma.user.findUnique({
        where: {
            email: vendorAdminEmail
        }
    })

    if (!vendorAdmin) {
        throw new ApiError(403, "unauthorised for vendor admin not present", true)
    }

    const vendorAdminId = vendorAdmin.id;


    // Fetch the vendor using the vendorAdminId
    const vendor = await prisma.vendor.findUnique({
        where: { vendorAdminId },
    });

    if (!vendor) {
        throw new ApiError(403, "vendor setup incomplete", true)
    }

    // Fetch current preferences from the database
    const currentPreferences = await prisma.vendorNotificationPreference.findMany({
        where: { vendorId: vendor.id },
    });







    return Response
        .json(new ApiResponse(201, { success: true, currentPreferences }, "success"), { status: 200 });
})

export const POST = asyncHandler(async (req: Request) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.email == null) {
        throw new ApiError(403, "unauthorised", true)
    }

    console.log("authorised", session.user.email)

    const vendorAdminEmail = session.user.email;
    const vendorAdmin = await prisma.user.findUnique({
        where: {
            email: vendorAdminEmail
        }
    })

    if (!vendorAdmin) {
        throw new ApiError(403, "unauthorised for vendor admin not present", true)
    }

    const vendorAdminId = vendorAdmin.id;

    const preinput = await req.json();

    const preferences = updateVendorNotificationPreferencesSchema.parse(preinput);


    // Fetch the vendor using the vendorAdminId
    const vendor = await prisma.vendor.findUnique({
        where: { vendorAdminId },
    });

    if (!vendor) {
        throw new ApiError(403, "vendor setup incomplete", true)
    }

    // Fetch current preferences from the database
    const currentPreferences = await prisma.vendorNotificationPreference.findMany({
        where: { vendorId: vendor.id },
    });

    // Create maps of current preferences by ID for easier diffing
    const currentPreferencesMap = new Map(currentPreferences.map(pref => [pref.id, pref]));

    // Determine which preferences need to be created, updated, or deleted
    const preferencesToCreate: any = [];
    const preferencesToUpdate: any = [];
    const preferencesToDelete: any = [];



    preferences.forEach(pref => {
        if (pref?.id) {
            const currentPref = currentPreferencesMap.get(pref.id || 0);
            if (currentPref) {
                // If the preference exists, check if it's different
                if (currentPref.isActive !== pref.isActive || currentPref.dest !== pref.dest) {
                    preferencesToUpdate.push({
                        id: pref.id,
                        isActive: pref.isActive,
                        dest: pref.dest,
                    });
                }
                // Remove it from the map as it's already handled
                currentPreferencesMap.delete(pref.id);
            }

        } else {
            // If the preference doesn't exist, we need to create it
            preferencesToCreate.push({
                channel: pref.channel,
                isActive: pref.isActive,
                dest: pref.dest,
            });
        }
    });

    // The remaining preferences in the map are to be deleted
    preferencesToDelete.push(...Array.from(currentPreferencesMap.values()));

    // Start with creating new preferences
    const createdPreferences = preferencesToCreate.length > 0 ? await prisma.vendorNotificationPreference.createMany({
        data: preferencesToCreate.map((pref: { channel: any; isActive: any; dest: any; }) => ({
            vendorId: vendor.id,
            channel: pref.channel,
            isActive: pref.isActive,
            dest: pref.dest,
        })),
    }) : [];

    // Next, update the existing preferences that have changed
    const updatedPreferences = preferencesToUpdate.length > 0 ? await Promise.all(preferencesToUpdate.map((pref: { id: any; isActive: any; dest: any; }) =>
        prisma.vendorNotificationPreference.update({
            where: { id: pref.id },
            data: {
                isActive: pref.isActive,
                dest: pref.dest,
            },
        })
    )) : [];

    // Finally, delete the preferences that were not in the request
    const deletedPreferences = preferencesToDelete.length > 0 ? await prisma.vendorNotificationPreference.deleteMany({
        where: {
            id: { in: preferencesToDelete.map((pref: { id: any; }) => pref.id) },
        },
    }) : [];


    return Response
        .json(new ApiResponse(201, { success: true, message: "Vendor notification preferences updated successfully." }, "success"), { status: 200 });
})