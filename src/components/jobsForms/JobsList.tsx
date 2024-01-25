import { supabase } from "@/api/supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import { Suspense, useEffect, useState } from "react";
import { Await } from "react-router-dom";
import JobCard from "./components/ui/JobCard";
import { SkeletonAmount } from "../layouts/Skeleton/Skeleton";
import CardSkeleton from "./components/ui/CardSkeleton";

export default function JobsList() {
    const [jobsList, setJobsList] = useState<PromiseLike<JobType[]> | null>();

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
                    async (payload) => {
                        console.log(payload);
                        await fetchJobs();
                    }
                )
                .subscribe();

            return () => taskSubscription.unsubscribe();
        };

        handleSubscription();
    }, []);

    const fetchJobs = async () => {
        const jobsPromise = supabase
            .from("Jobs")
            .select()
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
            setJobsList(null)
        }
    }, []);
    return (
        <>
            <Suspense
                fallback={
                    <SkeletonAmount column={false} amount={2}>
                        <CardSkeleton />
                    </SkeletonAmount>
                }
            >
                <Await resolve={jobsList}>
                    {(jobs) =>
                        jobs &&
                        jobs.map((job: JobType) => (
                            <JobCard
                                key={job.id}
                                isPreviewMode={false}
                                {...job}
                            />
                        ))
                    }
                </Await>
            </Suspense>
        </>
    );
}
