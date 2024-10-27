// types/jwt.d.ts
export interface CustomJwtPayload extends jwt.JwtPayload {
  user: {
    id: string;
    userType: string;
    name?: string;
    email: string;
    administratorLastName?: string;
    administratorFirstName?: string;
    province?: string;
    city?: string;
    address?: string;
    charitableRegistrationNumber?: string;
    operatingLicenseNumber?: string;
    documentUploads?: {
      legalDocument: {
        url: string;
        fileType: string;
        fileSize: number;
        uploadedAt: Date;
      };
    };
    fname?: string;
    lname?: string;
    phone?: string;
    adoptionHistory?: [string];
    householdSize?: string;
    hasotherpets?: string;
    otherPetsDetails?: string;
    adoptionStatus?: string;
  };
}
