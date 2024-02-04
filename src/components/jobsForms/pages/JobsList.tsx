import { supabase } from "@/api/supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import { Suspense, useEffect, useState } from "react";
import { Await } from "react-router-dom";
import JobCard from "../components/ui/JobCard";
import CardSkeleton from "../components/ui/CardSkeleton";
import useFilterData from "../context/useFilterDataContext";
import { SkeletonAmount } from "@/components/layouts/Skeleton/Skeleton";
export default function JobsList() {
    const [jobsList, setJobsList] = useState<PromiseLike<JobType[]> | null>();
    const data = useFilterData()

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
                        jobs
                            .filter((filteredData: FilterFormDataType) =>

                                (!data?.formData.location || filteredData?.location?.toLowerCase().includes(data?.formData.location.trim().toLowerCase())) &&
                                (!data?.formData.title || filteredData.title.toLowerCase().includes(data?.formData.title.trim().toLowerCase())) &&
                                (data?.formData.experienceLevel === "Any" || filteredData.experienceLevel.toLowerCase().includes(data?.formData.experienceLevel.trim().toLowerCase() as string)) &&
                                (data?.formData.type === "Any" || filteredData.type?.toLowerCase().includes(data?.formData.type.trim().toLowerCase() as string))

                                && (!data?.formData.minSalary || filteredData.minSalary?.toLowerCase().includes(data?.formData.minSalary.trim().toLowerCase()))


                            )

                            .map((job: JobType) => <JobCard key={job.id} isFavoriteC={data?.formData.isFavorite} isSplashC={data?.formData.isSplash} isPreviewMode={false} {...job} />)}

                </Await>
            </Suspense>
        </>
    );
}



