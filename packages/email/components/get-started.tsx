import { Button, Link, Section } from "@react-email/components";

export function GetStarted() {
  return (
    <Section className="text-center mt-[50px] mb-[50px]">
      <Link
        href="https://business.deepnote-clone.com"
        className="bg-transparent rounded-md text-primary text-[14px] text-[#121212] font-medium no-underline text-center px-6 py-3 border border-solid border-[#121212]"
      >
        List your business
      </Link>

      <Button
        className="bg-transparent rounded-md text-primary text-[14px] text-[#121212] font-medium no-underline text-center px-6 py-3 border border-solid border-[#121212]"
        href="https://go.deepnote-clone.com/VmJhYxE"
      >
        Get started
      </Button>
    </Section>
  );
}
