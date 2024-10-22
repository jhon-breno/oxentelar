import { Button } from "./_components/ui/button";

export default function Home() {
  return (
    <>
      <div className="w-full sm:hidden mx-4 my-6">
        <Button
          className="w-full border-black rounded-sm text-xl h-14"
          variant="outline"
        >
          RESERVE JÁ
        </Button>
      </div>
    </>
  );
}
