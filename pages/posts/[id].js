import { Box, Button, Container, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react';
import Header from '../../components/Header';
const Layout = dynamic(() => import('../../components/Layout'), {ssr: false})
const TagBox = dynamic(() => import('../../components/TagBox'), {ssr: false})
// import Layout from '../../components/Layout';
// import TagBox from '../../components/TagBox';
import dynamic from 'next/dynamic';
import { Markup } from 'react-render-markup';
import { getAllPostIds, getPostData } from '../../utils/posts';


export default function Post({postData}) {
  // const sector = JSON.parse(postData.sector)
  // console.log(typeof(postData.job_description))
  let techArray = postData.tech.replaceAll("'","");
  techArray = JSON.parse(techArray)
  const tech1 = techArray[0]
  const tech2 = techArray[1]
  let sectorArray = postData.sector.replaceAll("'","");
  sectorArray = JSON.parse(sectorArray)
  const sector1 = sectorArray[0]
  const sector2 = sectorArray[1]
  const sector3 = sectorArray[2]
  const salaryRange = "$100-$120k"
  const location = "remote"
  const allowed = ['p', 'em', 'li'];
  
  return (
    <Container maxW={'100vw'} bgColor={'blackAlpha.900'} h={'100%'}>
    <Container 
      maxW={'100%'}
    //   bgColor={'blackAlpha.900'}
    //   h='calc(100vh)'
    >
        <Box 
        // bgColor={'red.300'}  
        // h='calc(100vh)'
        >
            <VStack>
            {/* Navbar (With logo top middle & post a job button top right) */}
            <Header />  
            {/* Header content (Title / substitle / search bar) */}
          <Container 
          // bgColor={'green'}
          border={'2px solid white'}
          h='100%'
          maxW={'container.lg'}
          p={'6'}
          >
            <Flex direction='column' gap={'4'}>
              <Box>
              <Heading  textTransform={'uppercase'} color={'#F16DF4'} size={'xl'} textAlign={'start'} textShadow='-1px 2px #24FF00'>
                {postData.job_title}
                </Heading>
              </Box>
              <Box>
                <Text casing={'uppercase'} fontSize={'lg'} color={'white'}>
                  {postData.organization_name} | {postData.chain} | {sector1} | {postData.position_type} | {salaryRange} | {location}
                </Text>
              </Box>
              <Box>
                <Flex direction={'row'} gap={'4'}>
                  <TagBox name={postData.chain} /> 
                  <TagBox name={sector1} /> 
                  <TagBox name={sector2} /> 
                  <TagBox name={sector3} /> 
                  <TagBox name={tech1} /> 
                </Flex>
              </Box>
              <Box color={'white'}>
                <Text color={'white'} fontSize={"xl"}>
                  Humble Brag
                </Text>
                {/* <Text color={'white'}> */}
                  {/* <Text>
                    {postData.company_description}
                  </Text> */}
                  {/* <Text color="white"> */}
                  <Markup markup={postData.company_description} allowed={allowed}/>  
                  {/* </Text> */}
                {/* <ReactMarkdown components={ChakraUIRenderer()} children={markdown} skipHtml />; */}
                  {/* <Markup markup={postData.company_description} allowed={allowed}/> */}
                {/* </Text> */}
              </Box>
              <Box color={"white"}>
                <Text color={'white'} fontSize={"xl"}>
                  Job Description
                </Text>
                {/* <Text color={'white'}> */}
                  {/* {postData.job_description} */}
                  <Markup markup={postData.job_description}/>
                {/* </Text> */}
              </Box>
              <Box>
              <Link href={postData.application_url}>
                    <Button  w={'100%'}  colorScheme={"blackAlpha"} border={"2px solid pink"} bgColor={"black"} color={'green.200'} > APPLY</Button>
              </Link>
              </Box>
            </Flex>
          </Container>
          </VStack>
          </Box>
          </Container>
          </Container>
    )
}


export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
      props: {
        postData,
      },
    };
  }