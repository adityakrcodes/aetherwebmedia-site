import { cn } from "@/lib/utils";
import Link from "next/link";

export const SaasBentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[8rem] md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const SaasBentoGridItem = ({
  className,
  title,
  description,
  header,
  url,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  url?: string | null;
}) => {
  const Container: any = url ? Link : 'div';
  const containerProps = url ? { href: url } : {};
  return (
    <Container
      {...containerProps}
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border p-4 transition duration-200 border-white/[0.2] bg-black hover:bg-black/80 h-full",
        className,
      )}
    >
      {/* {header} */}
      <div className="transition duration-200 group-hover/bento:translate-x-2 flex-1 flex flex-col justify-between">
        <div className="mt-2 mb-2 font-sans text-xl font-bold text-neutral-300">
          {title}
        </div>
        <div className="font-sans text-sm font-normal text-neutral-300 flex-1">
          {description}
        </div>
      </div>
    </Container>
  );
};
