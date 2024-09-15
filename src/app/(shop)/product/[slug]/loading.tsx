import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <Skeleton className="flex h-[380px] w-full items-center justify-center rounded-none bg-accent"></Skeleton>
        <div className="mt-8 grid grid-cols-4 gap-4 px-5">
          {Array(4)
            .fill("")
            .map((imageUrl) => (
              <Skeleton
                key={imageUrl}
                className="flex h-[100px] items-center justify-center rounded-lg bg-accent"
              ></Skeleton>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 px-5">
        <Skeleton className="h-10 w-48 rounded-lg bg-accent"></Skeleton>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-32 rounded-lg bg-accent"></Skeleton>
          <Skeleton className="h-3 w-24 rounded-lg bg-accent"></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default Loading;
