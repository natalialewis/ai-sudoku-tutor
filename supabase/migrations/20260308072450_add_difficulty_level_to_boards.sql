alter table "public"."boards" add column "difficulty_level" integer;

alter table "public"."boards" add constraint "boards_difficulty_level_check" CHECK (((difficulty_level >= 1) AND (difficulty_level <= 10))) not valid;

alter table "public"."boards" validate constraint "boards_difficulty_level_check";


