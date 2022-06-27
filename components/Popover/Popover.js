import { Popover, PopoverTrigger, PopoverBody, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, Button } from "@chakra-ui/react"

export default function PopoverComponent() {
    return (
        <Popover>
            <PopoverTrigger>
                <Button>Trigger</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
