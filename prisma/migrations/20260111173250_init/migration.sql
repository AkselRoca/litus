-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "data" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "treated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDesc" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Config" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
    "dispo" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "EstimatorData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "metier" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "searchesPerMonth" INTEGER NOT NULL,
    "avgBasket" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "LeadMagnetDownload" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "email" TEXT,
    "source" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Lead_type_idx" ON "Lead"("type");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX "Lead_treated_idx" ON "Lead"("treated");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_slug_idx" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_published_idx" ON "BlogPost"("published");

-- CreateIndex
CREATE INDEX "BlogPost_publishedAt_idx" ON "BlogPost"("publishedAt");

-- CreateIndex
CREATE INDEX "EstimatorData_metier_idx" ON "EstimatorData"("metier");

-- CreateIndex
CREATE INDEX "EstimatorData_ville_idx" ON "EstimatorData"("ville");

-- CreateIndex
CREATE UNIQUE INDEX "EstimatorData_metier_ville_key" ON "EstimatorData"("metier", "ville");

-- CreateIndex
CREATE INDEX "LeadMagnetDownload_type_idx" ON "LeadMagnetDownload"("type");

-- CreateIndex
CREATE INDEX "LeadMagnetDownload_createdAt_idx" ON "LeadMagnetDownload"("createdAt");
