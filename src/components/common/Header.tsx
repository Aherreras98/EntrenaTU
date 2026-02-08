import Button from "../ui/Button";


export default function Header() {
  return (
    <header className="w-full py-4 px-8 bg-surface border-b border-zinc-800 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src={""} alt="Logo" className="h-10" />
        <span className="text-xl font-black text-text-main tracking-tighter uppercase">
          ENTRENA<span className="text-primary">TÚ</span>
        </span>
      </div>
      <div className="flex gap-4">
        <Button variant="secondary" className="px-6 py-2 text-sm">Log In</Button>
        <Button className="px-6 py-2 text-sm">Sign Up</Button>
      </div>
    </header>
  );
}