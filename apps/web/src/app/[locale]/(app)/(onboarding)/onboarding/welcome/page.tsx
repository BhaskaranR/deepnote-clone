import { Logo } from "@/components/logo";
import { getTeamBySlug } from "@deepnote-clone/supabase/cached-queries";
// import { Wordmark } from "@deepnote-clone/ui/wordmark";
import { NextButton } from "../next-button";

export default async function Welcome({
  searchParams,
}: {
  searchParams: { slug: string };
}) {
  const slug = searchParams.slug;

  const { data: team } = await getTeamBySlug(slug);

  const nextStep = team ? "workspace" : "teams";

  return (
    <>
      <div className="relative mx-auto mt-24 flex max-w-sm flex-col items-center px-3 text-center md:mt-32 md:px-8 lg:mt-48">
        <div className="animate-slide-up-fade relative flex w-auto items-center justify-center px-6 py-2 [--offset:20px] [animation-duration:1.3s] [animation-fill-mode:both]">
          <div className="absolute inset-0 opacity-10">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse-scale absolute inset-0 rounded-full mix-blend-color-burn"
                style={{
                  animationDelay: `${i * -2}s`,
                  backgroundImage: `linear-gradient(90deg, #000, transparent, #000)`,
                }}
              />
            ))}
          </div>
          <Logo className="relative font-semibold h-8 w-auto" />
        </div>
        <h1 className="animate-slide-up-fade mt-10 text-2xl font-medium [--offset:10px] [animation-delay:250ms] [animation-duration:1s] [animation-fill-mode:both]">
          Welcome to Deepnote Clone
        </h1>
        <p className="animate-slide-up-fade mt-2 text-gray-500 [--offset:10px] [animation-delay:500ms] [animation-duration:1s] [animation-fill-mode:both]">
          Deepnote Clone gives you a way to give your customers a way to earn rewards.
        </p>
        <div className="animate-slide-up-fade mt-10 w-full [--offset:10px] [animation-delay:750ms] [animation-duration:1s] [animation-fill-mode:both]">
          <NextButton text="Get started" step={nextStep} />
        </div>
      </div>
    </>
  );
}
