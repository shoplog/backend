-- CreateEnum
CREATE TYPE "distanceUnit" AS ENUM ('MI', 'KM');

-- CreateEnum
CREATE TYPE "timeUnit" AS ENUM ('DAY', 'WEEK', 'MONTH', 'YEAR');

-- CreateEnum
CREATE TYPE "vehicleServiceRepeatType" AS ENUM ('ODOMETER', 'TIME');

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "vin" TEXT,
    "plate" TEXT,
    "color" TEXT,
    "odometer" INTEGER NOT NULL,
    "odometer_unit" "distanceUnit" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicleAttributes" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicleAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenanceLogs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "serviced_by_shop_id" TEXT,
    "service_date" TIMESTAMP(3) NOT NULL,
    "odometer" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maintenanceLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenanceLogs_services" (
    "id" TEXT NOT NULL,
    "maintenance_log_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "maintenanceLogs_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenanceLogs_services_parts" (
    "id" TEXT NOT NULL,
    "maintenance_log_service_id" TEXT NOT NULL,
    "part_id" TEXT NOT NULL,

    CONSTRAINT "maintenanceLogs_services_parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serviceShops" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "contact_name" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postal_code" TEXT,
    "phone_number" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "serviceShops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "part_number" TEXT,
    "oem_part_number" TEXT,
    "lifespan_lower_bound" INTEGER,
    "lifespan_upper_bound" INTEGER,
    "lifespan_unit" "distanceUnit",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles_parts" (
    "vehicle_id" TEXT NOT NULL,
    "part_id" TEXT NOT NULL,

    CONSTRAINT "vehicles_parts_pkey" PRIMARY KEY ("vehicle_id","part_id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles_services" (
    "vehicle_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "repeat_type" "vehicleServiceRepeatType",
    "repeat_interval_lower_bound" INTEGER,
    "repeat_interval_upper_bound" INTEGER,
    "repeat_interval_distance_unit" "distanceUnit",
    "repeat_interval_time_unit" "timeUnit",

    CONSTRAINT "vehicles_services_pkey" PRIMARY KEY ("vehicle_id","service_id")
);

-- CreateIndex
CREATE INDEX "vehicles_user_id_idx" ON "vehicles"("user_id");

-- CreateIndex
CREATE INDEX "maintenanceLogs_user_id_vehicle_id_idx" ON "maintenanceLogs"("user_id", "vehicle_id");

-- AddForeignKey
ALTER TABLE "vehicleAttributes" ADD CONSTRAINT "vehicleAttributes_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenanceLogs" ADD CONSTRAINT "maintenanceLogs_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenanceLogs" ADD CONSTRAINT "maintenanceLogs_serviced_by_shop_id_fkey" FOREIGN KEY ("serviced_by_shop_id") REFERENCES "serviceShops"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenanceLogs_services" ADD CONSTRAINT "maintenanceLogs_services_maintenance_log_id_fkey" FOREIGN KEY ("maintenance_log_id") REFERENCES "maintenanceLogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenanceLogs_services" ADD CONSTRAINT "maintenanceLogs_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenanceLogs_services_parts" ADD CONSTRAINT "maintenanceLogs_services_parts_maintenance_log_service_id_fkey" FOREIGN KEY ("maintenance_log_service_id") REFERENCES "maintenanceLogs_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenanceLogs_services_parts" ADD CONSTRAINT "maintenanceLogs_services_parts_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_parts" ADD CONSTRAINT "vehicles_parts_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_parts" ADD CONSTRAINT "vehicles_parts_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_services" ADD CONSTRAINT "vehicles_services_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_services" ADD CONSTRAINT "vehicles_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
