import { Fragment } from "react";

type SkeletonType = {
  amount: number;
  column: boolean;
  children?: React.ReactNode;
};

export function SkeletonAmount({
  amount,
  column = true,
  children,
}: SkeletonType) {
  return (
    <div
      className={`my-3 w-full ${
        column
          ? ""
          : "flex flex-col md:flex-row md:w-1/4 flex-grow gap-4"
      }`}
    >
      {Array.from({ length: amount })
        .fill("")
        .map(() => (
          <Fragment key={crypto.randomUUID()}>{children}</Fragment>
        ))}
    </div>
  );
}
