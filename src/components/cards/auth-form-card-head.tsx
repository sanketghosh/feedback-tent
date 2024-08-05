import { cn } from "@/lib/utils";
import { TentIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function AuthFormCardHead() {
  return (
    <Link
      href={"/"}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "flex items-center gap-1 w-fit mb-2",
      )}
    >
      <TentIcon size={20} />
      <p className="text-lg font-semibold">Feedback Tent</p>
    </Link>
  );
}
