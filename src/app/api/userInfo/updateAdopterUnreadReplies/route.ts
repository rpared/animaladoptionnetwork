// /api/userInfo/updateAdopterUnreadReplies/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/config/connectDB";
import Shelters from "@/models/shelters";
import { CustomJwtPayload } from "@/types/jwt";
import Adopters from "@/models/adopters";
import bcrypt from "bcrypt";
import { Url } from "next/dist/shared/lib/router/router";

// Replace with your own secret key
const JWT_SECRET = process.env.JWT_SECRET || "this_is_a_rough_subject";

export async function GET(req: NextRequest) {
  await connectDB(); // Connect to the database

  // Retrieve token from cookies
  const token = req.cookies.get("token")?.value;
  console.log("userInfoFile Token:", token); // Check if the token is actually being sent

  if (!token) {
    return NextResponse.json(
      { message: "Token not found", success: false },
      { status: 401 }
    );
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
    if (decoded.user.userType == "shelter") {
      // Fetch user data based on user ID from the token
      const user = await Shelters.findById(decoded.user.id);
      if (!user) {
        return NextResponse.json(
          { message: "User not found", success: false },
          { status: 404 }
        );
      }

      // Return shelter user details
      return NextResponse.json({
        success: true,
        user: user, // Safely accessing 'user' here
      });
    }
    if (decoded.user.userType == "adopter") {
      // Fetch user data based on user ID from the token
      const user = await Adopters.findById(decoded.user.id);
      if (!user) {
        return NextResponse.json(
          { message: "User not found", success: false },
          { status: 404 }
        );
      }

      // Return shelter user details
      return NextResponse.json({
        success: true,
        user: user, // Safely accessing 'user' here
      });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { message: "Invalid token", success: false },
      { status: 403 }
    );
  }
}

//PUT requests on endpoint to update profile info

// Define interfaces for the shelter and adopter data ...sooo long :(
interface UserUpdateProps {
  name?: string;
  email?: string;
  password?: string;
  administratorLastName?: string;
  administratorFirstName?: string;
  province?: string;
  city?: string;
  address?: string;
  charitableRegistrationNumber?: string;
  operatingLicenseNumber?: string;
  documentUploads?: Url;
  latitude?: number;
  longitude?: number;

  fname?: string;
  lname?: string;
  householdSize?: string;
  hasOtherPets?: boolean;
  otherPetDetails?: string;
  adoptionStatus?: string;
  unreadAdoptionReplies?: number;
  pendingAdoptionRequests?: number;
}

export async function PUT(req: NextRequest) {
  await connectDB();

  // Retrieve token from cookies
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Token not found", success: false },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

    // Extract userType and updated data from request
    const { userType, ...updatedData } = (await req.json()) as {
      userType: string;
    } & UserUpdateProps;

    let updateFields: Partial<UserUpdateProps> = {};

    if (userType === "shelter") {
      // Update shelter fields
      updateFields = {
        name: updatedData.name,
        email: updatedData.email,
        // password: updatedData.password,
        administratorLastName: updatedData.administratorLastName,
        administratorFirstName: updatedData.administratorFirstName,
        province: updatedData.province,
        city: updatedData.city,
        address: updatedData.address,
        charitableRegistrationNumber: updatedData.charitableRegistrationNumber,
        operatingLicenseNumber: updatedData.operatingLicenseNumber,
        documentUploads: updatedData.documentUploads,
        latitude: updatedData.latitude,
        longitude: updatedData.longitude,
      };

      // Hash the password if provided (only if it changes)
      if (updatedData.password) {
        const hashedPassword = await bcrypt.hash(updatedData.password, 10);
        updateFields.password = hashedPassword;
      }
    } else if (userType === "adopter") {
      // Update adopter fields
      updateFields = {
        fname: updatedData.fname,
        lname: updatedData.lname,
        email: updatedData.email,
        // password: updatedData.password,
        province: updatedData.province,
        city: updatedData.city,
        address: updatedData.address,
        householdSize: updatedData.householdSize,
        hasOtherPets: updatedData.hasOtherPets,
        otherPetDetails: updatedData.otherPetDetails,
      };
      // Hash the password if provided
      if (updatedData.password) {
        const hashedPassword = await bcrypt.hash(updatedData.password, 10);
        updateFields.password = hashedPassword;
      }
    }

    // Remove undefined fields
    Object.keys(updateFields).forEach((key) => {
      const fieldKey = key as keyof typeof updateFields;
      if (updateFields[fieldKey] === undefined) {
        delete updateFields[fieldKey];
      }
    });

    // Update the user profile based on userType
    let updatedUser;
    if (userType === "shelter") {
      updatedUser = await Shelters.findByIdAndUpdate(
        decoded.user.id,
        { $set: updateFields },
        { new: true }
      );
    } else if (userType === "adopter") {
      updatedUser = await Adopters.findByIdAndUpdate(
        decoded.user.id,
        { $set: updateFields },
        { new: true }
      );
    }

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Invalid token or update failed", success: false },
      { status: 403 }
    );
  }
}
