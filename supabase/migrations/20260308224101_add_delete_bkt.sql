
  create policy "BKT probabilities are deletable by the owner"
  on "public"."bkt_probabilities"
  as permissive
  for delete
  to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



