import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <span className="flex flex-col items-center gap-3">
         <ClipLoader size="70px" color="#bbb4b4" />
         <span className="text-gray-500">Loading</span> 
      </span>
    </div>
  );
}
