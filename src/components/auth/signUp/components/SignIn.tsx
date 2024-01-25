import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImSpinner8 } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <div className="bg-[#09090B] h-screen  w-full p-5 ">
        <div className="text-right">
          <Button variant="ghost" className="hover:bg-[#27272A]">
            Login
          </Button>
        </div>

        <div className="flex items-center justify-center flex-col h-full">
          <div className="h-full flex flex-col items-center justify-center ">
            <div className="flex flex-col justify-center gap-3  w-[400px]">
              <h1 className="text-[2rem] text-white font-bold text-center">
                Create an account
              </h1>
              <p className=" text-[#909098] text-center font-medium text-[14px] mb-5">
                Enter your email below to create your account
              </p>
              <Input
                type="email"
                placeholder="name@example.com"
                className="placeholder:text-[#909098]"
              />
              <Button disabled={isLoading} onClick={() => setIsLoading(true)}>
                {isLoading && (
                  <span className="mx-2">
                    <ImSpinner8 className="animate-spin" />
                  </span>
                )}{" "}
                Sign In with Email
              </Button>
              <div className="flex items-center justify-center">
                {" "}
                <Separator className="w-[100px]" />
                <span className="mx-3">OR CONTINUE WITH</span>{" "}
                <Separator className="w-[100px]" />
              </div>
              <Button
                disabled={isLoading}
                variant="outline"
                className="bg-[#09090B] hover:bg-[#27272A]"
              >
                {isLoading ? (
                  <span className="mx-2">
                    <ImSpinner8 className="animate-spin" />
                  </span>
                ) : (
                  <FaGithub className="mx-3" />
                )}
                Github
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
