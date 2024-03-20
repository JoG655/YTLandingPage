import YT from "../assets/YT.png";

import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

import { twMerge } from "tailwind-merge";

import { useEffect, useRef, useState } from "react";

import { useSidebarContext } from "../contexts/SidebarContext.js";

import { Input } from "../components/Input.js";
import { Button } from "../components/Button.js";

const mdBreakpoint = parseInt(resolveConfig(tailwindConfig).theme.screens.md);

export function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > mdBreakpoint) setShowFullWidthSearch(false);
    };

    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const target = e.target as Node;

      if (!target) return;

      if (!containerRef.current.contains(target)) setShowFullWidthSearch(false);
    };

    window.addEventListener("resize", handleResize);

    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", handleResize);

      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mx-4 mb-6 flex justify-between gap-10 pt-2 lg:gap-20"
    >
      <PageHeaderFirstSection isHidden={showFullWidthSearch} />
      <form
        className={twMerge(
          "hidden flex-grow justify-center gap-4 md:flex",
          showFullWidthSearch && "flex",
        )}
      >
        <Button
          variant="ghost"
          content="icon"
          className={twMerge(
            "hidden flex-shrink-0",
            showFullWidthSearch && "flex",
          )}
          type="button"
          onClick={() => setShowFullWidthSearch(false)}
        >
          <ArrowLeft />
        </Button>
        <div className="flex max-w-[600px] flex-grow">
          <Input
            className="w-full rounded-l-full border border-secondary-border px-4 py-1 text-lg shadow-inner shadow-secondary outline-none focus:border-blue-500"
            type="search"
            placeholder="Search"
          />
          <Button
            variant="default"
            content="default"
            className="flex-shrink-0 rounded-r-full border border-l-0 border-secondary-border px-4 py-2"
          >
            <Search />
          </Button>
        </div>
        <Button
          variant="default"
          content="icon"
          className="flex-shrink-0"
          type="button"
        >
          <Mic />
        </Button>
      </form>
      <div
        className={twMerge(
          "flex flex-shrink-0 items-center md:gap-2",
          showFullWidthSearch && "hidden",
        )}
      >
        <Button
          variant="ghost"
          content="icon"
          className="md:hidden"
          onClick={() => setShowFullWidthSearch(true)}
        >
          <Search />
        </Button>
        <Button variant="ghost" content="icon" className="md:hidden">
          <Mic />
        </Button>
        <Button variant="ghost" content="icon">
          <Upload />
        </Button>
        <Button variant="ghost" content="icon">
          <Bell />
        </Button>
        <Button variant="ghost" content="icon">
          <User />
        </Button>
      </div>
    </div>
  );
}

type PageHeaderFirstSectionProps = {
  isHidden?: boolean;
};

export function PageHeaderFirstSection({
  isHidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={twMerge(
        "flex flex-shrink-0 items-center gap-4",
        isHidden && "hidden",
      )}
    >
      <Button onClick={toggle} variant="ghost" content="icon">
        <Menu />
      </Button>
      <a href="/">
        <img src={YT} className="h-6" alt="logo" />
      </a>
    </div>
  );
}
