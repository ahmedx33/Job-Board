import { supabase } from "@/api/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function CreateJob() {
    const titleRef = useRef<HTMLInputElement>(null);
    const companyRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const applicationRef = useRef<HTMLInputElement>(null);
    const salaryRef = useRef<HTMLInputElement>(null);
    const shortDescRef = useRef<HTMLTextAreaElement>(null);
    const fullDescRef = useRef<HTMLTextAreaElement>(null);

    const [jobType, setJobType] = useState<string>("");
    const [experience, setExperience] = useState<string>("");

    const navigate = useNavigate();

    const URL_VALIDATION = /^(ftp|http|https):\/\/[^ "]+$/;

    const addJobInfo = async () => {
        const newTitleValue = titleRef.current?.value.trim();
        const newCompanyValue = companyRef.current?.value.trim();

        if (
            newTitleValue === "" ||
            newCompanyValue === "" ||
            !URL_VALIDATION.test(applicationRef.current?.value as string)
        ) {
            return;
        }

        const formData: JobFormData = {
            title: titleRef.current?.value || "",
            companyName: companyRef.current?.value || "",
            location: locationRef.current?.value || undefined,
            applicationUrl: applicationRef.current?.value || "",
            shortDesc: shortDescRef.current?.value || undefined,
            fullDesc: fullDescRef.current?.value || undefined,
            salary: salaryRef.current?.value || undefined,
            type: jobType === "" ? "Any" : jobType,
            experienceLevel: experience === "" ? "Any" : experience,
        };

        const { error } = await supabase.from("Jobs").insert([formData]);

        if (error) {
            throw new Error(
                "Something went wrong with the insert in the CreateJob component"
            );
        }

        navigate("/jobs");
    };
    return (
        <>
            <div className="mb-10 flex items-center justify-between px-7">
                <h1 className="text-[2rem] font-bold text-black dark:text-white">
                    New Listing
                </h1>
            </div>
            <div className="flex items-center justify-center gap-5">
                <span>
                    <label
                        className="text-[1.2rem] text-black dark:text-white "
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <Input
                        ref={titleRef}
                        className="my-4 w-[26rem]"
                        id="title"
                        type="text"
                        placeholder="Title"
                    />
                </span>
                <span>
                    <label
                        className="text-[1.2rem] text-black dark:text-white "
                        htmlFor="title"
                    >
                        Company Name
                    </label>
                    <Input
                        ref={companyRef}
                        className="my-4 w-[26rem]"
                        id="title"
                        type="text"
                        placeholder="Company Name"
                    />
                </span>
                <span>
                    <label
                        className="text-[1.2rem] text-black dark:text-white "
                        htmlFor="location"
                    >
                        Location
                    </label>
                    <Input
                        ref={locationRef}
                        className="my-4 w-[26rem]"
                        id="location"
                        type="text"
                        placeholder="Location"
                    />
                </span>
            </div>
            <div className="flex items-center justify-center gap-5">
                <span>
                    <label
                        className="text-[1.2rem] text-black dark:text-white "
                        htmlFor="Application"
                    >
                        Application Url
                    </label>
                    <Input
                        ref={applicationRef}
                        className="my-4 w-[26rem]"
                        id="Application"
                        type="text"
                        placeholder="Application"
                    />
                </span>

                <span>
                    <label
                        className="text-[1.2rem] text-black dark:text-white "
                        htmlFor="Type"
                    >
                        Type
                    </label>

                    <Select
                        defaultValue="Any"
                        value={jobType}
                        onValueChange={(value) => setJobType(value.trim())}
                    >
                        <SelectTrigger className="w-[26rem] my-4" id="Type">
                            <SelectValue placeholder="Any" />
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
                        defaultValue="Any"
                        value={experience}
                        onValueChange={(value) => setExperience(value)}
                    >
                        <SelectTrigger className="w-[26rem] my-4" id="Level">
                            <SelectValue placeholder="Any" />
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
                <span>
                    <label
                        className="text-[1.2rem] text-black dark:text-white "
                        htmlFor="Salary"
                    >
                        Salary
                    </label>
                    <Input
                        ref={salayRef}
                        className="my-4 w-[26rem]"
                        id="Salary"
                        type="number"
                        placeholder="Salary"
                    />
                </span>
                <span>
                    <label
                        className="text-[1.2rem] text-black dark:text-white "
                        htmlFor="Short"
                    >
                        Short Description
                    </label>
                    <Textarea
                        ref={shortDescRef}
                        className="my-4 w-[53rem]"
                        id="Short"
                        placeholder="Short Description"
                    />
                </span>
            </div>
            <div className="flex items-center justify-center w-full">
                <span>
                    <label
                        className="text-[1.2rem] text-black dark:text-white "
                        htmlFor="Short"
                    >
                        Full Description
                    </label>
                    <Textarea
                        ref={fullDescRef}
                        className="my-4 w-[53rem]"
                        id="Short"
                        placeholder="Short Description"
                    />
                </span>
            </div>
            <div className="flex items-center justify-center w-full gap-5">
                <Button variant="outline">Show Preview</Button>
                <Button onClick={addJobInfo}>Save</Button>
            </div>
        </>
    );
}
