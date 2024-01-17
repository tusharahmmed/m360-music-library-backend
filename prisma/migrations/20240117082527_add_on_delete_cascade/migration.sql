-- DropForeignKey
ALTER TABLE "album_artists" DROP CONSTRAINT "album_artists_albumId_fkey";

-- DropForeignKey
ALTER TABLE "album_artists" DROP CONSTRAINT "album_artists_artistId_fkey";

-- DropForeignKey
ALTER TABLE "album_genres" DROP CONSTRAINT "album_genres_albumId_fkey";

-- DropForeignKey
ALTER TABLE "album_genres" DROP CONSTRAINT "album_genres_genreId_fkey";

-- DropForeignKey
ALTER TABLE "libraries" DROP CONSTRAINT "libraries_userId_fkey";

-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_albumId_fkey";

-- AddForeignKey
ALTER TABLE "album_artists" ADD CONSTRAINT "album_artists_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "album_artists" ADD CONSTRAINT "album_artists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "album_genres" ADD CONSTRAINT "album_genres_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "album_genres" ADD CONSTRAINT "album_genres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "gernes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "libraries" ADD CONSTRAINT "libraries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
