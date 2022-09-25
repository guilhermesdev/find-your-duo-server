ALTER TABLE "Ad" RENAME TO "ads";
ALTER TABLE "ads" RENAME COLUMN "gameId" TO "game_id";
ALTER TABLE "ads" RENAME COLUMN "yearsPlaying" TO "years_playing";
ALTER TABLE "ads" RENAME COLUMN "weekDays" TO "week_days";
ALTER TABLE "ads" RENAME COLUMN "hourStart" TO "hour_start";
ALTER TABLE "ads" RENAME COLUMN "hourEnd" TO "hour_end";
ALTER TABLE "ads" RENAME COLUMN "useVoiceChannel" TO "use_voice_channel";
ALTER TABLE "ads" RENAME COLUMN "createdAt" TO "created_at";

ALTER TABLE "Game" RENAME TO "games";
ALTER TABLE "games" RENAME COLUMN "bannerUrl" TO "banner_url";


