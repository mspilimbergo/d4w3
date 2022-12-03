import { Box, Container, VStack } from "@chakra-ui/react";
import Header from "./Header";

const Layout = ({children}) => {
    return (
        <div>
        <Container maxW={'100vw'} bgColor={'blackAlpha.900'} h={'100%'}
        // {/* <Container maxW={'100vw'} bgColor={'black'} */}
        // <Container 
        //   maxW={'100vw'}
        //   bgColor={'blackAlpha.900'}
          
        //   h='calc(100vh)'
          
        >
            <Box>
            <VStack>
            {/* Navbar (With logo top middle & post a job button top right) */}
            <Header />  
            {/* Header content (Title / substitle / search bar) */}
            <Container maxWidth={'container.xl'}>
                {children}        
            </Container>
            </VStack>
            </Box>
        </Container>
        </div>
      )
}

export const getStaticProps = async (ctx) => {


    return {
        props:{
            data:null
        }
    }
}

export default Layout