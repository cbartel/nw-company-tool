-- CreateTable
CREATE TABLE "CharacterAttribute" (
    "userId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("userId", "key"),
    CONSTRAINT "CharacterAttribute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" TEXT NOT NULL,
    "discordUsername" TEXT NOT NULL,
    "characterName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserPermission" (
    "userId" INTEGER NOT NULL,
    "permission" TEXT NOT NULL,

    PRIMARY KEY ("userId", "permission"),
    CONSTRAINT "UserPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_uindex" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_uindex" ON "User"("discordId");
