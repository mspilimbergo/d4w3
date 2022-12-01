import { Avatar, Badge, Box, Button, Flex, Text } from '@chakra-ui/react';

export default function PostCard(props) {
    const sectorString = props.sector[0].replaceAll("'","");
    // console.log(props.tech.length)
    const techString1 = props.tech[0].replaceAll("'","");
    // const techString2 = props.tech[1].replaceAll("'","");
    // test = test.replaceAll("'","");
    // console.log(sectorString)

    // console.log(props);
    // let minSalary = props.minSalary.toString().slice(0,3)
    // let maxSalary = props.maxSalary.toString().slice(0,3)
    
    // props.maxSalary.toString()
    // const salaryRange = `\$${minSalary}K-\$${maxSalary}K`
    return (
        <Box bgColor={'blue.200'} p={'3'} display={'flex'} justifyContent="space-between" borderTop={'1px'} borderBottom={'1px'} mb={'2'}>             
                    <Flex bgColor={'green.200'} >
                        <Avatar src={props.logoUrl} />
                        <Box ml='3'>
                            <Flex gap={'1'}>
                                <Text fontWeight='bold' textTransform={'uppercase'}>
                                {props.jobTitle}
                                </Text>
                                {/* <Divider orientation="vertical"/> */}
                                <Text>|</Text>
                                <Text fontWeight='bold' textTransform={'uppercase'}>
                                {props.organizationName}
                                </Text>
                            </Flex>                            
                            <Box>
                                <Badge mr='1' colorScheme='red'>
                                    {props.positionType}
                                </Badge>
                                <Badge mr='1' colorScheme='red'>
                                    {props.salaryRange}
                                </Badge>
                                <Badge mr='1' colorScheme='red'>
                                    {props.location}
                                </Badge>
                            </Box>                            
                        </Box>
                    </Flex>   
                    <Flex direction={'row'} alignItems={'center'}>
                        <Box>
                            <Badge mr='1' colorScheme='red' textTransform={'uppercase'}>
                                {props.chain}
                            </Badge>
                            <Badge mr='1' colorScheme='red'>
                                {sectorString}
                            </Badge>
                            <Badge mr='1' colorScheme='red'>
                                {techString1}
                            </Badge>
                            <Badge mr='1' colorScheme='red'>
                                {techString1}
                            </Badge>
                            <Button>APPLY</Button>
                        </Box>                            
                    </Flex>        
                </Box>
    )

}

export const getStaticProps = async (ctx) => {


    return {
        props:{
            data:null
        }
    }
}
