'use client'
import Toolbar from "@/components/onboarding/toolbar";
import dynamic from "next/dynamic";

const ClientSidebarWrapper = dynamic(
  () =>
    import("./components/sidebar-wrapper").then((mod) => mod.SidebarWrapper),
  { ssr: false },
);

export default  function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <ClientSidebarWrapper >
        {children}
      <Toolbar show={['onboarding']} />
    </ClientSidebarWrapper>
  )
}
