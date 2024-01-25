import { Switch } from "@/components/ui/switch";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import JobsList from "./JobsList";

export default function FilterListingsForm() {
  const navigate = useNavigate();
  return (
    <div className="p-5 w-full">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-[2rem] font-bold text-black dark:text-white">
          Job Listings
        </h1>
        <Button onClick={() => navigate("new")}>Create Listings</Button>
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
            className="my-4 w-[26rem]"
            id="title"
            type="text"
            placeholder="Title"
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
            className="my-4 w-[26rem]"
            id="location"
            type="text"
            placeholder="Location"
          />
        </span>

        <span>
          <label
            className="text-[1.2rem] text-black dark:text-white "
            htmlFor="salary"
          >
            Minimum Salary
          </label>
          <Input
            className="my-4 w-[26rem]"
            id="salary"
            type="number"
            placeholder="Minimum Salary"
            min={5}
            max={1000000}
          />
        </span>
      </div>
      <div className="flex items-center justify-center gap-5">
        <span>
          <label
            className="text-[1.2rem] text-black dark:text-white "
            htmlFor="jobType"
          >
            Job Type
          </label>

          <Select defaultValue="Any">
            <SelectTrigger className="w-[25rem] mt-3" id="jobType">
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

          <Select defaultValue="Any">
            <SelectTrigger className="w-[25rem] mt-3" id="Level">
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
        <span className="mt-7">
          <span className="flex items-center gap-2">
            <Switch id="ShowHidden" />
            <label htmlFor="ShowHidden">Show Hidden</label>
          </span>
          <span className="flex items-center gap-2">
            <Switch id="Favorites" />
            <label htmlFor="Favorites">Show Favorites Only</label>
          </span>
        </span>
        <span className="mt-7 mx-10">
          <Button>reset</Button>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-8">
        <JobsList />
      </div>
    </div>
  );
}
