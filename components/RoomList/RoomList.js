import { Button, Heading, Text, Avatar, Flex, Box } from "@chakra-ui/react";

export default function RoomList() {
    return (
        <Box>
            <Box display="flex" gap="10px">
                <Avatar />
                <Heading fontSize="md" as="h5">Yuuka Room</Heading>
                <Flex mt="30px" gap="130px" justifyContent="space-between">
                    <Text ml="-100px" fontSize="small">
                        hi
                    </Text>
                    <Text fontSize="small">
                        01/03 00:10
                    </Text>
                </Flex>
            </Box>
        </Box >
    )
}