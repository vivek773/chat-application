export default function MainLayout({ children }) {
  return (
    <div className="w-full h-screen flex bg-gray-100 dark:bg-[#0b141a]">
      {children}
    </div>
  );
}
