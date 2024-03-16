import { supabase } from "@/api/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPreview from "../../ui/CardPreview";

export default function CreateJob() {
      const [title, setTitle] = useState<string>("");
      const [company, setCompany] = useState<string>("");
      const [location, setLocation] = useState<string>("");
      const [applicationUrl, setApplicationUrl] = useState<string>("");
      const [salary, setSalary] = useState<string>("0");
      const [shortDesc, setShortDesc] = useState<string>("");
      const [fullDesc, setFullDesc] = useState<string>("");
      const [jobType, setJobType] = useState<string>("");
      const [experience, setExperience] = useState<string>("");
      const [showPreview, setShowPreview] = useState<boolean>(false);
      const navigate = useNavigate();

      const URL_VALIDATION = /^(ftp|http|https):\/\/[^ "]+$/;

      const addJobInfo = async () => {
            const newTitleValue = title.trim();
            const newCompanyValue = company.trim();
            const { user } = (await supabase.auth.getUser()).data;

            if (newTitleValue === "" || newCompanyValue === "" || !URL_VALIDATION.test(applicationUrl)) {
                  return;
            }

            const formData: JobFormData = {
                  title: title,
                  companyName: company,
                  location: location,
                  applicationUrl: applicationUrl,
                  shortDesc: shortDesc,
                  fullDesc: fullDesc,
                  minSalary: salary,
                  type: jobType === "" ? "Any" : jobType,
                  experienceLevel: experience === "" ? "Any" : experience,
                  userId: user?.id || "",
            };

            const { error } = await supabase.from("Jobs").insert([formData]);

            if (error) {
                  throw new Error("Something went wrong with the insert in the CreateJob component");
            }

            navigate("/jobs");
      };
      return (
            <>
                  <div className="mb-10 flex items-center justify-between px-7">
                        <h1 className="text-[2rem] font-bold text-black dark:text-white">New Listing</h1>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                        <span>
                              <label className="text-[1.2rem] text-black dark:text-white " htmlFor="title">
                                    Title
                              </label>
                              <Input onChange={(e) => setTitle(e.target.value)} value={title} className="my-4 w-[26rem]" id="title" type="text" placeholder="Title" />
                        </span>
                        <span>
                              <label className="text-[1.2rem] text-black dark:text-white " htmlFor="title">
                                    Company Name
                              </label>
                              <Input onChange={(e) => setCompany(e.target.value)} value={company} className="my-4 w-[26rem]" id="title" type="text" placeholder="Company Name" />
                        </span>
                        <span>
                              <label className="text-[1.2rem] text-black dark:text-white " htmlFor="location">
                                    Location
                              </label>
                              <Input onChange={(e) => setLocation(e.target.value)} value={location} className="my-4 w-[26rem]" id="location" type="text" placeholder="Location" />
                        </span>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                        <span>
                              <label className="text-[1.2rem] text-black dark:text-white " htmlFor="Application">
                                    Application Url
                              </label>
                              <Input onChange={(e) => setApplicationUrl(e.target.value)} value={applicationUrl} className="my-4 w-[26rem]" id="Application" type="text" placeholder="Application" />
                        </span>

                        <span>
                              <label className="text-[1.2rem] text-black dark:text-white " htmlFor="Type">
                                    Type
                              </label>

                              <Select defaultValue="Any" value={jobType} onValueChange={(value) => setJobType(value.trim())}>
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
                              <label className="text-[1.2rem] text-black dark:text-white " htmlFor="Level">
                                    Experience Level
                              </label>

                              <Select defaultValue="Any" value={experience} onValueChange={(value) => setExperience(value)}>
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
                              <label className="text-[1.2rem] text-black dark:text-white " htmlFor="Salary">
                                    Salary
                              </label>
                              <Input onChange={(e) => setSalary(e.target.value)} value={salary} className="my-4 w-[26rem]" id="Salary" type="number" placeholder="Salary" />
                        </span>
                        <span>
                              <label className="text-[1.2rem] text-black dark:text-white " htmlFor="Short">
                                    Short Description
                              </label>
                              <Input onChange={(e) => setShortDesc(e.target.value)} value={shortDesc} className="my-4 w-[53rem]" id="Short" placeholder="Short Description" />
                        </span>
                  </div>
                  <div className="flex items-center justify-center w-full">
                        <span>
                              <label className="text-[1.2rem] text-black dark:text-white " htmlFor="Short">
                                    Full Description
                              </label>
                              <Textarea onChange={(e) => setFullDesc(e.target.value)} value={fullDesc} className="my-4 w-[53rem]" id="fullDesc" placeholder="Full Description" />
                        </span>
                  </div>
                  <div className="flex items-center justify-center w-full gap-5">
                        <Button variant="outline" onClick={() => setShowPreview((prev) => !prev)}>
                              Show Preview
                        </Button>
                        <Button onClick={addJobInfo}>Save</Button>
                  </div>

                  <div className="w-[460px]">
                        {showPreview && (
                              <CardPreview
                                    title={title}
                                    companyName={company}
                                    location={location}
                                    minSalary={salary}
                                    shortDesc={shortDesc}
                                    type={jobType}
                                    experienceLevel={experience}
                                    fullDesc={fullDesc}
                                    applicationUrl={applicationUrl}
                              />
                        )}
                  </div>
            </>
      );
}
