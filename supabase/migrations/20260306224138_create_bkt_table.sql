
  create table "public"."bkt_probabilities" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "knowledge_component" text not null,
    "p_learned" numeric(5,4) not null default 0.1,
    "p_transit" numeric(5,4) not null default 0.3,
    "p_guess" numeric(5,4) not null default 0.1,
    "p_slip" numeric(5,4) not null default 0.05,
    "mastery_probability" numeric(5,4) not null default 0.1,
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."bkt_probabilities" enable row level security;

alter table "public"."boards" enable row level security;

CREATE UNIQUE INDEX bkt_probabilities_pkey ON public.bkt_probabilities USING btree (id);

CREATE UNIQUE INDEX bkt_probabilities_user_id_knowledge_component_key ON public.bkt_probabilities USING btree (user_id, knowledge_component);

CREATE INDEX idx_bkt_kc ON public.bkt_probabilities USING btree (knowledge_component);

CREATE INDEX idx_bkt_user ON public.bkt_probabilities USING btree (user_id);

alter table "public"."bkt_probabilities" add constraint "bkt_probabilities_pkey" PRIMARY KEY using index "bkt_probabilities_pkey";

alter table "public"."bkt_probabilities" add constraint "bkt_probabilities_knowledge_component_check" CHECK ((knowledge_component = ANY (ARRAY['naked_single'::text, 'hidden_single'::text, 'naked_pair'::text, 'hidden_pair'::text]))) not valid;

alter table "public"."bkt_probabilities" validate constraint "bkt_probabilities_knowledge_component_check";

alter table "public"."bkt_probabilities" add constraint "bkt_probabilities_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."bkt_probabilities" validate constraint "bkt_probabilities_user_id_fkey";

alter table "public"."bkt_probabilities" add constraint "bkt_probabilities_user_id_knowledge_component_key" UNIQUE using index "bkt_probabilities_user_id_knowledge_component_key";

grant delete on table "public"."bkt_probabilities" to "anon";

grant insert on table "public"."bkt_probabilities" to "anon";

grant references on table "public"."bkt_probabilities" to "anon";

grant select on table "public"."bkt_probabilities" to "anon";

grant trigger on table "public"."bkt_probabilities" to "anon";

grant truncate on table "public"."bkt_probabilities" to "anon";

grant update on table "public"."bkt_probabilities" to "anon";

grant delete on table "public"."bkt_probabilities" to "authenticated";

grant insert on table "public"."bkt_probabilities" to "authenticated";

grant references on table "public"."bkt_probabilities" to "authenticated";

grant select on table "public"."bkt_probabilities" to "authenticated";

grant trigger on table "public"."bkt_probabilities" to "authenticated";

grant truncate on table "public"."bkt_probabilities" to "authenticated";

grant update on table "public"."bkt_probabilities" to "authenticated";

grant delete on table "public"."bkt_probabilities" to "service_role";

grant insert on table "public"."bkt_probabilities" to "service_role";

grant references on table "public"."bkt_probabilities" to "service_role";

grant select on table "public"."bkt_probabilities" to "service_role";

grant trigger on table "public"."bkt_probabilities" to "service_role";

grant truncate on table "public"."bkt_probabilities" to "service_role";

grant update on table "public"."bkt_probabilities" to "service_role";


  create policy "BKT probabilities are viewable by the owner"
  on "public"."bkt_probabilities"
  as permissive
  for select
  to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Boards are viewable by everyone"
  on "public"."boards"
  as permissive
  for select
  to public
using (true);


CREATE TRIGGER set_updated_at_bkt BEFORE UPDATE ON public.bkt_probabilities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


