-- CreateTable
CREATE TABLE "Coment" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    "postId" INTEGER,

    CONSTRAINT "Coment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Coment" ADD CONSTRAINT "Coment_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Coment" ADD CONSTRAINT "Coment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
