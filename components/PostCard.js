// import { Avatar, Badge, Box, Button, Container, Flex, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Avatar, Badge, Box, Button, Flex, Link, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';

export default function PostCard(props) {
    const maxTitleLen = 25;
    const maxOrgLen = 5;
    const jobTitleLen = props.jobTitle.length;
    // console.log("Job title", props.jobTitle)
    // console.log(jobTitleLen)
    let formattedTitle = props.jobTitle;
    if (jobTitleLen > maxTitleLen) {
        formattedTitle = props.jobTitle.substring(0, maxTitleLen)
    }
    formattedTitle = formattedTitle.replaceAll(",", "").replaceAll("(", "")
    let formattedOrganizatioon = props.organizationName;
    if (jobTitleLen > maxOrgLen) {
        formattedOrganizatioon = props.organizationName.substring(0, maxOrgLen)
    }
    const sectorString = props.sector[0].replaceAll("'","").replaceAll("\"", "");
    // console.log(props.tech.length)
    const techString1 = props.tech[0].replaceAll("'","").replaceAll("\"", "");
    // const techString2 = props.tech[1].replaceAll("'","");
    // test = test.replaceAll("'","");
    // console.log(sectorString)

    // console.log(props);
    // let minSalary = props.minSalary.toString().slice(0,3)
    // let maxSalary = props.maxSalary.toString().slice(0,3)
    
    // props.maxSalary.toString()
    // const salaryRange = `\$${minSalary}K-\$${maxSalary}K`
    return (
        <LinkBox as='article' w={'5xl'} p='3' borderTop='1px' borderColor={'white'} display={'flex'} justifyContent={'space-between'} gap={'4'}>
                           
                <Flex >
                        <Avatar src={props.logoUrl} />
                        <Box ml='3'>
                            <Flex gap={'1'}>
                                <Text color={'#B7DFB8'} fontWeight='bold' textTransform={'uppercase'}>
                                {formattedTitle}
                                <LinkOverlay href={`localhost:3000/posts/${props.id}`}>
                                </LinkOverlay>
                                </Text>
                                {/* <Divider orientation="vertical"/> */}
                                <Text color={'#B7DFB8'}>|</Text>
                                <Text color={'#B7DFB8'} fontWeight='bold' textTransform={'uppercase'}>
                                {props.organizationName}
                                </Text>
                            </Flex>                            
                            <Box>
                                <Badge mr='1' variant={'outline'} colorScheme={'whiteAlpha'}>
                                    {props.positionType}
                                </Badge>
                                <Badge mr='1'variant={'outline'} colorScheme={'whiteAlpha'}>
                                    {props.salaryRange}
                                </Badge>
                                <Badge mr='1' variant={'outline'} colorScheme={'whiteAlpha'}>
                                    {props.location}
                                </Badge>
                            </Box>                            
                        </Box>
                    </Flex>   
                    <Flex direction={'row'} alignItems={'center'}>
                        <Box>
                            <Badge mr='1' variant={'outline'} colorScheme={'whiteAlpha'} textTransform={'uppercase'}>
                                {props.chain}
                            </Badge>
                            <Badge mr='1' variant={'outline'} colorScheme={'whiteAlpha'}>
                                {sectorString}
                            </Badge>
                            <Badge mr='1' variant={'outline'} colorScheme={'whiteAlpha'}>
                                {techString1}
                            </Badge>
                            <Badge mr='1' variant={'outline'} colorScheme={'whiteAlpha'}>
                                {techString1}
                            </Badge>
                            <Link href={`/posts/${props.id}`}>
                                <Button as={'a'} ml='1' variant={'outline'} color={'#B7DFB8'} border={'2px'} borderColor={"#E968F4"} size={['sm','md','md']} >APPLY</Button>
                            </Link>                            
                        </Box>                            
                    </Flex>   
        </LinkBox>
      )
    // return (
    //     <Container maxWidth={'container.xl'} borderTop={'1px'} borderColor={'white'}>
    //     <Box p={'3'} display={'flex'} justifyContent="space-between">             
                    // <Flex >
                    //     <Avatar src={props.logoUrl} />
                    //     <Box ml='3'>
                    //         <Flex gap={'1'}>
                    //             <Text color={'#B7DFB8'} fontWeight='bold' textTransform={'uppercase'}>
                    //             {props.jobTitle}
                    //             </Text>
                    //             {/* <Divider orientation="vertical"/> */}
                    //             <Text color={'#B7DFB8'}>|</Text>
                    //             <Text color={'#B7DFB8'} fontWeight='bold' textTransform={'uppercase'}>
                    //             {props.organizationName}
                    //             </Text>
                    //         </Flex>                            
                    //         <Box>
                    //             <Badge mr='1' variant={'outline'} colorScheme={'whiteAlpha'}>
                    //                 {props.positionType}
                    //             </Badge>
                    //             <Badge mr='1'variant={'outline'} colorScheme={'whiteAlpha'}>
                    //                 {props.salaryRange}
                    //             </Badge>
                    //             <Badge mr='1' variant={'outline'} colorScheme={'whiteAlpha'}>
                    //                 {props.location}
                    //             </Badge>
                    //         </Box>                            
                    //     </Box>
                    // </Flex>   
                    // <Flex direction={'row'} alignItems={'center'}>
                    //     <Box>
                    //         <Badge mr='1' variant={'outline'} colorScheme={'whiteAlpha'} textTransform={'uppercase'}>
                    //             {props.chain}
                    //         </Badge>
                    //         <Badge mr='1' variant={'outline'} colorScheme={'whiteAlpha'}>
                    //             {sectorString}
                    //         </Badge>
                    //         <Badge mr='1' variant={'outline'} colorScheme={'whiteAlpha'}>
                    //             {techString1}
                    //         </Badge>
                    //         <Badge mr='1' variant={'outline'} colorScheme={'whiteAlpha'}>
                    //             {techString1}
                    //         </Badge>
                    //         <Button  ml='1' variant={'outline'} color={'#B7DFB8'} border={'2px'} borderColor={"#E968F4"} size={['sm','md','md']} >APPLY</Button>
                    //     </Box>                            
                    // </Flex>        
    //             </Box>
    //             </Container>
    // )

}

export const getStaticProps = async (ctx) => {


    return {
        props:{
            data:null
        }
    }
}
