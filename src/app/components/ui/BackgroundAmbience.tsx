"use client";

export const BackgroundAmbience = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px] transition-colors duration-500 bg-emerald-100/40 dark:bg-emerald-900/20" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full blur-[120px] transition-colors duration-500 bg-emerald-50/50 dark:bg-emerald-950/30" />
    </div>
  );
};