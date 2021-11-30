-- CreateTable
CREATE TABLE "Expedition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "beginDateTime" DATETIME NOT NULL,
    CONSTRAINT "Expedition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExpeditionParticipant" (
    "expeditionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "hasTuningOrb" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL,

    PRIMARY KEY ("expeditionId", "userId"),
    CONSTRAINT "ExpeditionParticipant_expeditionId_fkey" FOREIGN KEY ("expeditionId") REFERENCES "Expedition" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ExpeditionParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Expedition_id_uindex" ON "Expedition"("id");
