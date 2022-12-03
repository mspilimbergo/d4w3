import { Box, Button, Container, Flex, Heading, Link } from "@chakra-ui/react";
// import supabase from '../utils/SupabaseCLient';

export default function Header() {

    // async function postJob() {        
    //     console.log("Posting Job");
    //     const {data, error} = await supabase
    //     .from('posts')
    //     .insert({
    //             photoUrl: "https://bit.ly/sage-adebayo",
    //             title: "Full Stack Engineer",
    //             organization_name: "Chancey CO",
    //             chain: "Polygon",
    //             sector: "ZK-PROOFS",
    //             tech: "React",
    //             positionType: "Part-time",
    //             location: "Remote",      
    //             token_compensation: true,
    //             min_salary: 100000,
    //             max_salary: 200000,          
    //             job_description: "Markdown for job posting",
    //             application_url: "https://applicationurl.coom",
    //             invoice_email: "invoice email",
    //             invoice_address: "2333 brickell",
    //             organization_twitter: "@twittertest",
    //             paid_for_logo: true,
    //             logo_url: "url-to-asset",                
    //             paid_bear_market_special: false,
    //             paid_sticky: false,
    //             sticky: "sticky-text",
    //             edit_link: "some-edit-url",
    //             job_post_total: 120                
    //     })
    //     console.log(data);
    // }
    
    return (              
        <Container
            // h={'100%'}
            w={'100%'}
            // bgColor={'blue.100'}
            maxWidth={'container.xl'}
            >
                <Flex
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                // bgColor={'red.100'}
                as={'nav'}
                mt={'4'}                
                >
                    <Box>
                        {/* <Heading fontSize={{base: 'xl', md: '3xl', lg: '4xl'}}>
                            D4W3
                        </Heading> */}
                        <Heading  fontSize={{base: 'xl', md: '3xl', lg: '4xl'}} textTransform={'uppercase'} color={'#F16DF4'} size={'xl'} textAlign={'start'} textShadow='-1px 2px #24FF00'>
                            D4W3
                        </Heading>
                    </Box>
                    <Flex gap={'2'}>
                        <Box>
                            <Button variant={'ghost'} color={'#B7DFB8'} size={['sm','md','md']}>Web3 Whispers</Button>
                        </Box>
                        <Link href={`/create-post`} passHref>
                                <Button as={'a'} ml='1' variant={'outline'} color={'#B7DFB8'} border={'2px'} borderColor={"#E968F4"} size={['sm','md','md']} >APPLY</Button>
                        </Link>                            
                        {/* <Box>
                            <Button variant={'outline'} color={'#B7DFB8'} border={'2px'} borderColor={"#E968F4"} size={['sm','md','md']} >Post Job</Button>
                        </Box> */}
                    </Flex>
                </Flex>
            </Container>            
    );
}

export const getStaticProps = async (ctx) => {


    return {
        props:{
            data:null
        }
    }
}