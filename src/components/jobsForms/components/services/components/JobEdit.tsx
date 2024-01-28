import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoaderData, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { supabase } from "@/api/supabase";
import { Toaster, toast } from "sonner";

export default function JobEdit() {
    const titleRef = useRef<HTMLInputElement>(null);
    const companyRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const applicationRef = useRef<HTMLInputElement>(null);
    const salayRef = useRef<HTMLInputElement>(null);
    const shortDescRef = useRef<HTMLTextAreaElement>(null);
    const fullDescRef = useRef<HTMLTextAreaElement>(null);

    const [jobType, setJobType] = useState<string>("");
    const [experience, setExperience] = useState<string>("");

    const { data } = useLoaderData() as { data: JobType[] | null };
    const { jobId } = useParams();
    const defaultValues = data?.[0];

    const editJobInfo = async () => {
        const { error } = await supabase.from("Jobs").update({
            title: titleRef.current?.value,
            companyName: companyRef.current?.value,
            location: locationRef.current?.value,
            applicationUrl: applicationRef.current?.value,
            shortDesc: shortDescRef.current?.value,
            fullDesc: fullDescRef.current?.value,
            minSalary: salayRef.current?.value,
            type: jobType || defaultValues?.type,
            experienceLevel: experience || defaultValues?.experienceLevel,
        } as JobType).eq("id", jobId);

        if (error) {
            return toast.error("Something Went Wrong, Please Try Again!!");
        }

        toast.success("Changes Are Saved Successfully");
    };

    const renderInput = (label: string, id: string, defaultValue: string, ref, type = "text") => (
        <span>
            <label className="text-[1.2rem] text-black dark:text-white" htmlFor={id}>
                {label}
            </label>
            <Input
                defaultValue={defaultValue}
                ref={ref}
                className="my-4 w-[26rem]"
                id={id}
                type={type}
                placeholder={label}
            />
        </span>
    );

    return (
        <>
            <div className="mb-10 flex items-center justify-between px-7">
                <h1 className="text-[2rem] font-bold text-black dark:text-white">
                    New Listing
                </h1>
            </div>
            <div className="flex items-center justify-center gap-5">
                {renderInput("Title", "title", defaultValues?.title, titleRef)}
                {renderInput("Company Name", "company", defaultValues?.companyName, companyRef)}
                {renderInput("Location", "location", defaultValues?.location, locationRef)}
            </div>
            <div className="flex items-center justify-center gap-5">
                {renderInput("Application Url", "Application", defaultValues?.applicationUrl, applicationRef)}
                <span>
                    <label
                        className="text-[1.2rem] text-black dark:text-white "
                        htmlFor="Type"
                    >
                        Type
                    </label>
                    <Select value={jobType} onValueChange={(value) => setJobType(value)}>
                        <SelectTrigger className="w-[26rem] my-4" id="Type">
                            <SelectValue placeholder={defaultValues?.type} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Any">Any</SelectItem>
                                <SelectItem value="Full Time">Full Time</SelectItem>
                                <SelectItem value="Part Time">Part Time</SelectItem>
                                <SelectItem value="Internship">Internship</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </span>
                <span>
                    <label
                        className="text-[1.2rem] text-black dark:text-white "
                        htmlFor="Level"
                    >
                        Experience Level
                    </label>
                    <Select
                        value={experience}
                        onValueChange={(value) => setExperience(value)}
                    >
                        <SelectTrigger className="w-[26rem] my-4" id="Level">
                            <SelectValue
                                placeholder={defaultValues?.experienceLevel}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Any">Any</SelectItem>
                                <SelectItem value="Junior">Junior</SelectItem>
                                <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                                <SelectItem value="Senior">Senior</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </span>
            </div>
            <div className="flex items-center justify-center gap-5">
                {renderInput("Salary", "Salary", defaultValues?.salary, salayRef, "number")}
                {renderInput("Short Description", "Short", defaultValues?.shortDesc, shortDescRef)}
            </div>
            <div className="flex items-center justify-center w-full">
                {renderInput("Full Description", "Short", defaultValues?.shortDesc, fullDescRef)}
            </div>
            <div className="flex items-center justify-center w-full gap-5">
                <Button variant="outline">Show Preview</Button>
                <Button onClick={editJobInfo}>Save</Button>
            </div>
            <Toaster richColors />
        </>
    );
}

