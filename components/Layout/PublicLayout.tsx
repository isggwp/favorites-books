
import Footer from "@/components/common/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div
        className={`font-sans bg-white max-w-[1400px] w-full px-4 md:px-14 ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}

        <Footer />
      </div>
  );
}
