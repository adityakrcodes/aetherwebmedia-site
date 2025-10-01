import { cn } from "@/lib/utils";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  url,
  calLink,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  url?: string | null;
  calLink?: string | null;
}) => {
  const Container: any = url ? Link : 'div';
  const containerProps = url ? { href: url } : {};
  
  // Add Cal.com data attributes if calLink is provided
  const calProps = calLink ? {
    'data-cal-namespace': 'schedule-a-call',
    'data-cal-link': calLink,
    'data-cal-config': '{"layout":"month_view"}',
    style: { cursor: 'pointer' }
  } : {};
  
  return (
    <Container
      {...containerProps}
      {...calProps}
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border  p-4 transition duration-200  border-white/[0.2] bg-black",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <div className="mt-2 mb-2 font-sans text-xl font-bold text-neutral-300">
          {title}
        </div>
        <div className="font-sans text-sm font-normal text-neutral-300">
          {description}
        </div>
      </div>
    </Container>
  );
};
