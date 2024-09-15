import { RectangleEllipsis } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <RectangleEllipsis size={30} className="text-[#7f7f7f] animate-out" />
    </div>
  );
};

export default Loading;
