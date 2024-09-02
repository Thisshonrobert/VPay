import { Avatar, AvatarFallback, AvatarImage, BackgroundBeamsWithCollision, Button } from "ui";

export default function() {
    return <div>
        Dashboard 
        <Button>hi</Button>
        <div >                    hello   from dashboard 4  </div>
        <div className="test-style">Test Style</div>
        <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

    </div>
}