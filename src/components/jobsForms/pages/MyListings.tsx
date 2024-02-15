import { supabase } from "@/api/supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import { Suspense, useEffect, useState } from "react";
import { Await, Link } from "react-router-dom";
import CardSkeleton from "../components/ui/CardSkeleton";
import { SkeletonAmount } from "@/components/layouts/Skeleton/Skeleton";
import { Button } from "@/components/ui/button";
import MyJobCard from "../components/ui/MyJobCard";

export default function MyListings() {
      const [jobsList, setJobsList] = useState<PromiseLike<JobType[]> | null>();

      console.log(jobsList);

      useEffect(() => {
            const handleSubscription = async () => {
                  const taskSubscription = supabase
                        .channel("jobBaord")
                        .on(
                              "postgres_changes",
                              {
                                    event: "*",
                                    schema: "public",
                                    table: "Jobs",
                              },
                              async () => {
                                    await fetchJobs();
                              }
                        )
                        .subscribe();

                  return () => taskSubscription.unsubscribe();
            };

            handleSubscription();
      }, []);

      const fetchJobs = async () => {
            const { user } = (await supabase.auth.getUser()).data;
            const jobsPromise = supabase
                  .from("Jobs")
                  .select()
                  .eq("userId", user?.id)
                  .order("id")
                  .then(({ data, error }: PostgrestResponse<JobType[]>) => {
                        if (error) throw new Error("error while fetching");

                        return data || [];
                  }) as PromiseLike<JobType[]>;

            setJobsList(jobsPromise);
      };

      useEffect(() => {
            fetchJobs();

            return () => {
                  setJobsList(null);
            };
      }, []);

      return (
            <>
                  <div className="flex items-center justify-between px-8 mb-8">
                        <h1 className="text-[2rem] font-bold">My Job Listings</h1>
                        <Link to="/jobs/new">
                              {" "}
                              <Button>Create A Listing</Button>
                        </Link>
                  </div>
                  <div className="gridSys">
                        <Suspense
                              fallback={
                                    <SkeletonAmount column={false} amount={2}>
                                          <CardSkeleton />
                                    </SkeletonAmount>
                              }
                        >
                              <Await resolve={jobsList}>{(jobs) => jobs && jobs.map((job: JobType) => <MyJobCard key={job.id} {...job} />)}</Await>
                        </Suspense>
                  </div>
            </>
      );
}
