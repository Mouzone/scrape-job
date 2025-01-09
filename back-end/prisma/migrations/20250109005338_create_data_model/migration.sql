-- CreateTable
CREATE TABLE "Job" (
    "id" INTEGER NOT NULL,
    "jobsite" TEXT NOT NULL,
    "applied" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
