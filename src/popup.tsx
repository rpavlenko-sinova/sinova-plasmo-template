import { Button } from "~/components/ui/button"
import { CountButton } from "~features/count-button"

import "~style.css"

function IndexPopup() {
  return (
    <div className="flex h-16 w-40 items-center justify-center">
      <CountButton />
      <Button>Click me</Button>
    </div>
  )
}

export default IndexPopup
