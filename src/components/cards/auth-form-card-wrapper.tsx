import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthFormCardBackButton from "./auth-form-card-back-button";
import AuthFormCardHead from "./auth-form-card-head";

type AuthFormCardWrapperProps = {
  children: React.ReactNode;
  cardTitle: string;
  cardDescription: string;
  backButtonHref: string;
  backButtonLabel: string;
};

export default function AuthFormCardWrapper({
  children,
  backButtonHref,
  backButtonLabel,
  cardDescription,
  cardTitle,
}: AuthFormCardWrapperProps) {
  return (
    <Card className="w-[360px] rounded-xl shadow-lg sm:w-[420px] md:w-[440px] lg:w-[460px] xl:w-[490px]">
      <CardHeader className="select-none">
        <AuthFormCardHead />
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <AuthFormCardBackButton
          backButtonHref={backButtonHref}
          backButtonLabel={backButtonLabel}
        />
      </CardFooter>
    </Card>
  );
}
