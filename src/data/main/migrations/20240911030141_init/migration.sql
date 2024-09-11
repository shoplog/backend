-- CreateEnum
CREATE TYPE "distance_unit" AS ENUM ('MI', 'KM');

-- CreateEnum
CREATE TYPE "time_unit" AS ENUM ('DAY', 'WEEK', 'MONTH', 'YEAR');

-- CreateEnum
CREATE TYPE "vehicle_service_repeat_type" AS ENUM ('MILEAGE', 'TIME');

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
    "mileage" INTEGER NOT NULL,
    "mileage_distance_unit" "distance_unit" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_attributes" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "serviced_by_shop_id" TEXT,
    "service_date" TIMESTAMP(3) NOT NULL,
    "mileage" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maintenance_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_logs_services" (
    "id" TEXT NOT NULL,
    "maintenance_log_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "maintenance_logs_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_logs_services_parts" (
    "id" TEXT NOT NULL,
    "maintenance_log_service_id" TEXT NOT NULL,
    "part_id" TEXT NOT NULL,

    CONSTRAINT "maintenance_logs_services_parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_shops" (
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

    CONSTRAINT "service_shops_pkey" PRIMARY KEY ("id")
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
    "lifespan_distance_unit" "distance_unit",
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
    "user_id" TEXT,
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
    "repeat_type" "vehicle_service_repeat_type",
    "repeat_interval_lower_bound" INTEGER,
    "repeat_interval_upper_bound" INTEGER,
    "repeat_interval_distance_unit" "distance_unit",
    "repeat_interval_time_unit" "time_unit",

    CONSTRAINT "vehicles_services_pkey" PRIMARY KEY ("vehicle_id","service_id")
);

-- CreateIndex
CREATE INDEX "vehicles_user_id_idx" ON "vehicles"("user_id");

-- CreateIndex
CREATE INDEX "maintenance_logs_user_id_vehicle_id_idx" ON "maintenance_logs"("user_id", "vehicle_id");

-- CreateIndex
CREATE INDEX "services_user_id_idx" ON "services"("user_id");

-- AddForeignKey
ALTER TABLE "vehicle_attributes" ADD CONSTRAINT "vehicle_attributes_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_logs" ADD CONSTRAINT "maintenance_logs_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_logs" ADD CONSTRAINT "maintenance_logs_serviced_by_shop_id_fkey" FOREIGN KEY ("serviced_by_shop_id") REFERENCES "service_shops"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_logs_services" ADD CONSTRAINT "maintenance_logs_services_maintenance_log_id_fkey" FOREIGN KEY ("maintenance_log_id") REFERENCES "maintenance_logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_logs_services" ADD CONSTRAINT "maintenance_logs_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_logs_services_parts" ADD CONSTRAINT "maintenance_logs_services_parts_maintenance_log_service_id_fkey" FOREIGN KEY ("maintenance_log_service_id") REFERENCES "maintenance_logs_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_logs_services_parts" ADD CONSTRAINT "maintenance_logs_services_parts_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_parts" ADD CONSTRAINT "vehicles_parts_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_parts" ADD CONSTRAINT "vehicles_parts_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_services" ADD CONSTRAINT "vehicles_services_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles_services" ADD CONSTRAINT "vehicles_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
