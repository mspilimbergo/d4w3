import { Container, Text } from "@chakra-ui/react";

export default function TagBox({name}) {
    return (
        <>
            <Container border={'2px solid white'} p={'1'}>
                <Text textAlign={'center'} fontSize={'l'} casing={'uppercase'} color={'white'} >
                    {name}
                </Text>
            </Container>        
        </>
    )
}