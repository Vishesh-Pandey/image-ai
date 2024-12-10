export const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-slate-50 flex items-center justify-between px-4 py-2">
      <div className="flex items-center">
        <span className="ml-2 font-bold text-lg">Image AI</span>
      </div>
      <a
        href="https://github.com/Vishesh-Pandey/image-ai"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        <i className="bi bi-github"></i>
      </a>
    </nav>
  );
};
