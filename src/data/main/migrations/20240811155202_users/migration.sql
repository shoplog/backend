-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "ref_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_ref_id_key" ON "users"("ref_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
