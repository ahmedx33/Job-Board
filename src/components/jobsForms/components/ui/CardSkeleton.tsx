import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export default function CardSkeleton() {
  return (
    <div>
      <Card className="w-[500px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              <Skeleton className="w-[300px] h-7" />
            </CardTitle>

            <span>
              <Skeleton className="w-[70px] h-7" />
            </span>
          </div>
          <CardDescription></CardDescription>
          <CardDescription></CardDescription>
          <div className="flex items-center gap-2">
            <Skeleton className="w-[150px] h-7" />
          </div>
        </CardHeader>
        <CardContent className="mb-7">
          <p>
            <Skeleton className="w-[250px] h-7" />
          </p>
          <br />
          <p>
            <Skeleton className="w-[270px] h-7" />
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Skeleton className="w-[70px] h-9" />
          <Skeleton className="w-[70px] h-9" />
          <Skeleton className="w-[70px] h-9" />
        </CardFooter>
      </Card>
    </div>
  );
}
