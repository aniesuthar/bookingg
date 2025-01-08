-- CreateEnum
CREATE TYPE "ScheduleType" AS ENUM ('WEEKLY', 'FLEXIBLE');

-- CreateEnum
CREATE TYPE "Channel" AS ENUM ('WH', 'PH', 'EM');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "Day" AS ENUM ('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');

-- CreateEnum
CREATE TYPE "SocialPlatforms" AS ENUM ('FB', 'INSTA');

-- CreateTable
CREATE TABLE "Vendor" (
    "id" UUID NOT NULL,
    "pId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "phoneAlt" TEXT,
    "addressCity" TEXT,
    "addressPinCode" INTEGER,
    "addressState" TEXT,
    "addressStreet" TEXT,
    "aggregatedAppointments" INTEGER NOT NULL DEFAULT 0,
    "aggregatedRating" DOUBLE PRECISION NOT NULL DEFAULT 4,
    "canUsePlatform" BOOLEAN NOT NULL DEFAULT true,
    "blockingReason" TEXT,
    "coverPhoto" TEXT,
    "logo" TEXT,
    "maxBookingWindow" INTEGER,
    "minBookingWindow" INTEGER,
    "googleMapUrl" TEXT,
    "slug" TEXT NOT NULL,
    "startYear" INTEGER,
    "showBusinessDetails" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vendorAdminId" UUID NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "type" "ScheduleType" NOT NULL,
    "vendorId" UUID NOT NULL,
    "providerId" UUID,
    "day" "Day",
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "isHoliday" BOOLEAN NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" SERIAL NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorNotificationPreference" (
    "id" SERIAL NOT NULL,
    "vendorId" UUID NOT NULL,
    "channel" "Channel" NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "dest" TEXT NOT NULL,

    CONSTRAINT "VendorNotificationPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "bankRef" TEXT NOT NULL,
    "cancellationReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "easebuzzId" TEXT NOT NULL,
    "formFields" JSONB NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_age" INTEGER NOT NULL,
    "user_gender" "Gender" NOT NULL,
    "user_phone" TEXT NOT NULL,
    "user_comment" TEXT NOT NULL,
    "guestCount" INTEGER NOT NULL,
    "isRescheduled" BOOLEAN NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "pId" SERIAL NOT NULL,
    "providerId" UUID NOT NULL,
    "refundStatus" TEXT NOT NULL,
    "serviceId" UUID NOT NULL,
    "status" TEXT NOT NULL,
    "txnId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "vendorId" UUID NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentRefund" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "refundDate" TIMESTAMP(3) NOT NULL,
    "appointmentId" UUID NOT NULL,

    CONSTRAINT "AppointmentRefund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "vendorId" UUID NOT NULL,
    "appointmentPrice" INTEGER NOT NULL,
    "bookingPrice" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "pId" SERIAL NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "placeHolder" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "serviceId" UUID NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "appointmentId" UUID NOT NULL,
    "bankRefNum" TEXT NOT NULL,
    "cardType" TEXT NOT NULL,
    "easepayid" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "issuingBank" TEXT NOT NULL,
    "netAmountDebit" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "txnId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FrontUser" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "FrontUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorPayment" (
    "id" UUID NOT NULL,
    "vendorId" UUID NOT NULL,

    CONSTRAINT "VendorPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" UUID NOT NULL,
    "vendorId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "pId" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "aggregatedAppointments" INTEGER NOT NULL DEFAULT 0,
    "aggregatedRating" DOUBLE PRECISION NOT NULL DEFAULT 4,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scheduleDefaultHoursEnd" INTEGER NOT NULL,
    "scheduleDefaultHoursStart" INTEGER NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderSpeciality" (
    "id" SERIAL NOT NULL,
    "providerId" UUID NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "ProviderSpeciality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorSocialLink" (
    "id" UUID NOT NULL,
    "vendorId" UUID NOT NULL,
    "platform" "SocialPlatforms" NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "VendorSocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorBank" (
    "id" UUID NOT NULL,
    "vendorId" UUID NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "holderName" TEXT NOT NULL,
    "ifsc" TEXT NOT NULL,

    CONSTRAINT "VendorBank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorDesign" (
    "id" UUID NOT NULL,
    "vendorId" UUID NOT NULL,
    "accentColor" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "font" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,

    CONSTRAINT "VendorDesign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "blockingReason" TEXT DEFAULT '',
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "_ProviderToService" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ProviderToService_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_pId_key" ON "Vendor"("pId");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_email_key" ON "Vendor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_phone_key" ON "Vendor"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_vendorAdminId_key" ON "Vendor"("vendorAdminId");

-- CreateIndex
CREATE INDEX "Schedule_vendorId_type_day_idx" ON "Schedule"("vendorId", "type", "day");

-- CreateIndex
CREATE INDEX "Schedule_providerId_type_day_idx" ON "Schedule"("providerId", "type", "day");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_pId_key" ON "Appointment"("pId");

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentRefund_appointmentId_key" ON "AppointmentRefund"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_pId_key" ON "Service"("pId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_appointmentId_key" ON "Transaction"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "FrontUser_email_key" ON "FrontUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FrontUser_phone_key" ON "FrontUser"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_pId_key" ON "Provider"("pId");

-- CreateIndex
CREATE UNIQUE INDEX "VendorSocialLink_platform_url_key" ON "VendorSocialLink"("platform", "url");

-- CreateIndex
CREATE UNIQUE INDEX "VendorBank_vendorId_key" ON "VendorBank"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "VendorDesign_vendorId_key" ON "VendorDesign"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE INDEX "_ProviderToService_B_index" ON "_ProviderToService"("B");

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_vendorAdminId_fkey" FOREIGN KEY ("vendorAdminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorNotificationPreference" ADD CONSTRAINT "VendorNotificationPreference_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "FrontUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentRefund" ADD CONSTRAINT "AppointmentRefund_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "FrontUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorPayment" ADD CONSTRAINT "VendorPayment_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderSpeciality" ADD CONSTRAINT "ProviderSpeciality_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorSocialLink" ADD CONSTRAINT "VendorSocialLink_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorBank" ADD CONSTRAINT "VendorBank_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorDesign" ADD CONSTRAINT "VendorDesign_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProviderToService" ADD CONSTRAINT "_ProviderToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProviderToService" ADD CONSTRAINT "_ProviderToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
