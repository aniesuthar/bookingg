import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth"; // Adjust the path to your next-auth configuration
import { asyncHandler } from "@/utils/asyncHandler";
import { ApiResponse } from "@/utils/ApiResponse";



export const GET = asyncHandler(async (req: Request , res : Response) => {
    const session = await getServerSession(authOptions);

    if (!session) {

        return Response
            .json(new ApiResponse(201, { error: "Unauthorized" , session}, "success"), { status: 200 });
    }

    // Return authenticated user's data

    return Response
        .json(new ApiResponse(201, { user: session.user }, "success"), { status: 200 });
})
