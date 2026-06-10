export default function SectionDivider({ title, color = "black" }: { title: string, color?: "red" | "black" }) {
  const colorClasses = color === "red"
    ? "border-primary-600 text-primary-700 dark:text-primary-500"
    : "border-neutral-900 dark:border-white text-neutral-900 dark:text-white";

  return (
    <div className="relative flex items-center mb-6 mt-12 md:mt-16">
      <h2 className={`font-display font-bold text-2xl uppercase tracking-tighter pr-4 border-l-4 pl-3 ${colorClasses}`}>
        {title}
      </h2>
      <div className="flex-grow h-px bg-neutral-200 dark:bg-neutral-800"></div>
    </div>
  );
}
