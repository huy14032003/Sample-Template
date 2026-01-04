import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

export function PasswordInput(
  props: React.ComponentProps<"input">
) {
  const [show, setShow] = React.useState(false)

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        className="pr-10"
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="hover:bg-transparent absolute right-0 top-1/2 -translate-y-1/2"
        onClick={() => setShow(!show)}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  )
}
