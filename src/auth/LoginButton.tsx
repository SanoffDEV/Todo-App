import { Button } from "@/src/components/ui/button";
import { LogIn } from "lucide-react";

export const LoginButton = () => {
  return (
    <div>
      <a href="/login">
        <Button
          variant="default"
          className="h-14 w-48 text-lg font-normal bg-blue-500 text-white 
                  hover:bg-blue-600 hover:scale-105 active:scale-95 
                  rounded-lg shadow-lg hover:shadow-xl 
                  transition-all duration-300 flex items-center gap-2 justify-center"
        >
          <LogIn className="w-5 h-5" />
          Login
        </Button>
      </a>
    </div>
  );
};
