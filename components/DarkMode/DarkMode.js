import React from "react";
import { Button, useColorMode, Icon } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons"

function DarkMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <div>
            <Button
                fontSize="1em"
                variant="ghost"
                size="md"
                onClick={() => toggleColorMode()}>
                {colorMode === "light" ?
                    <Icon as={MoonIcon} />
                    :
                    <Icon as={SunIcon} />
                }
            </Button>
        </div>
    );
}

export default DarkMode;

//🌤️
//🌙