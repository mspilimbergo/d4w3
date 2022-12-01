import { Container } from "@chakra-ui/react";
import Header from "./Header";

const Layout = () => {
    return (
        <div>
            <Container maxW={'container.lg'} bgColor={'red.400'}>
                    <Header />
                    <main></main>
            </Container>
        </div>
    );
}

export const getStaticProps = async (ctx) => {


    return {
        props:{
            data:null
        }
    }
}

export default Layout