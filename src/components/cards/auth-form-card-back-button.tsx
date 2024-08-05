import Link from "next/link";

type AuthFormCardBackButtonProps = {
  backButtonHref: string;
  backButtonLabel: string;
};

export default function AuthFormCardBackButton({
  backButtonHref,
  backButtonLabel,
}: AuthFormCardBackButtonProps) {
  return (
    <Link
      className="w-full flex items-center justify-center hover:underline hover:underline-offset-4 font-medium text-muted-foreground hover:text-foreground text-sm transition-all"
      href={`/auth/${backButtonHref}`}
    >
      {backButtonLabel}
    </Link>
  );
}
