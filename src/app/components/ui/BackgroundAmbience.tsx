"use client";

export const BackgroundAmbience = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px] transition-colors duration-500 bg-[#d6e4f0]/60 dark:bg-[#124170]/15" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full blur-[120px] transition-colors duration-500 bg-[#eef3f8]/70 dark:bg-[#0f2a44]/10" />
      <div className="absolute top-[40%] right-[20%] w-[25vw] h-[25vw] rounded-full blur-[100px] transition-colors duration-500 bg-[#eef3f8]/50 dark:bg-[#1a5a8a]/8" />
    </div>
  );
};