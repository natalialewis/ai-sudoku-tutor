
  create table "public"."boards" (
    "id" uuid not null default gen_random_uuid(),
    "board_type" text not null,
    "difficulty" text,
    "strategy_focus" text,
    "initial_state" jsonb not null,
    "solution" jsonb not null
      );


CREATE UNIQUE INDEX boards_pkey ON public.boards USING btree (id);

CREATE INDEX idx_boards_difficulty ON public.boards USING btree (difficulty);

CREATE INDEX idx_boards_strategy ON public.boards USING btree (strategy_focus);

CREATE INDEX idx_boards_type ON public.boards USING btree (board_type);

alter table "public"."boards" add constraint "boards_pkey" PRIMARY KEY using index "boards_pkey";

alter table "public"."boards" add constraint "boards_board_type_check" CHECK ((board_type = ANY (ARRAY['full'::text, 'mini'::text]))) not valid;

alter table "public"."boards" validate constraint "boards_board_type_check";

alter table "public"."boards" add constraint "boards_difficulty_check" CHECK ((difficulty = ANY (ARRAY['easy'::text, 'medium'::text, 'hard'::text]))) not valid;

alter table "public"."boards" validate constraint "boards_difficulty_check";

alter table "public"."boards" add constraint "boards_strategy_focus_check" CHECK ((strategy_focus = ANY (ARRAY['naked_single'::text, 'hidden_single'::text, 'naked_pair'::text, 'hidden_pair'::text, NULL::text]))) not valid;

alter table "public"."boards" validate constraint "boards_strategy_focus_check";

grant delete on table "public"."boards" to "anon";

grant insert on table "public"."boards" to "anon";

grant references on table "public"."boards" to "anon";

grant select on table "public"."boards" to "anon";

grant trigger on table "public"."boards" to "anon";

grant truncate on table "public"."boards" to "anon";

grant update on table "public"."boards" to "anon";

grant delete on table "public"."boards" to "authenticated";

grant insert on table "public"."boards" to "authenticated";

grant references on table "public"."boards" to "authenticated";

grant select on table "public"."boards" to "authenticated";

grant trigger on table "public"."boards" to "authenticated";

grant truncate on table "public"."boards" to "authenticated";

grant update on table "public"."boards" to "authenticated";

grant delete on table "public"."boards" to "service_role";

grant insert on table "public"."boards" to "service_role";

grant references on table "public"."boards" to "service_role";

grant select on table "public"."boards" to "service_role";

grant trigger on table "public"."boards" to "service_role";

grant truncate on table "public"."boards" to "service_role";

grant update on table "public"."boards" to "service_role";


