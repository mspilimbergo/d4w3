import { Box, Container, FormControl, FormHelperText, FormLabel, Grid, GridItem, Heading, HStack, Input, Radio, RadioGroup, Select, VStack } from '@chakra-ui/react';

export default function CreatePost() {
    return (
        <div>
            <Container maxW={'100vw'} maxH={'100vh'} bgColor={'black'}>
                <Container maxW={'container.lg'} p={'6'}>
                    <Grid
                    // h={'100vh'}
                    templateColumns='repeat(6, 1fr)'
                    gap={4}
                    >
                        <GridItem colSpan={4} bg='black' border={'2px solid #E968F4'} backdropBlur="6px">
                            <VStack p={'4'} gap={'2'}>
                                <Box w={'100%'}>
                                    <Heading  textTransform={'uppercase'} color={'#D900EC'} size={'xl'} textAlign={'start'} textShadow='-1px 2px #24FF00'>
                                        Post Job
                                    </Heading>
                                </Box>
                                <Box w={'100%'}>
                                    <FormControl>       
                                        <FormLabel textTransform={'uppercase'} color={'white'} fontSize={'l'}>Job Title</FormLabel>
                                        <Input borderRadius={'0'} color={'white'}/>
                                        <FormLabel textTransform={'uppercase'} color={'white'} fontSize={'l'} mt={'4'}>organization</FormLabel>
                                        <Input borderRadius={'0'} color={'white'}/>
                                        <FormLabel onFocus={'pink'} textTransform={'uppercase'} color={'white'} fontSize={'l'} mt={'4'}>chain</FormLabel>
                                        <Input fontSize={'sm'} borderRadius={'0'} color={'white'} placeholder={"Ethereum, Solana, Optimism, Polygon, Polkadot, etc."} _placeholder={{ color: 'white' }}/>
                                        <FormHelperText fontSize={'xs'} mt={'4'} color={'gray.400'}>Search your L1 or L2.</FormHelperText>
                                        <FormLabel textTransform={'uppercase'} color={'white'} fontSize={'l'} mt={'4'}>tech skills (Minimum 3)</FormLabel>
                                        <Input fontSize={'sm'} borderRadius={'0'} color={'white'} placeholder={"Rust, Solidity, Javascript, Node.js, Circuit, etc."} _placeholder={{ color: 'white' }}/>
                                        <FormHelperText fontSize={'xs'} mt={'4'} color={'gray.400'}>Choose all technical expertise that apply to this job.</FormHelperText>
                                        <FormLabel textTransform={'uppercase'} color={'white'} fontSize={'l'} mt={'4'}>job type</FormLabel>
                                        <Input fontSize={'sm'} borderRadius={'0'} color={'white'} placeholder={"Full time, part time, internship"} _placeholder={{ color: 'white' }}/>
                                        <FormLabel textTransform={'uppercase'} color={'white'} fontSize={'l'} mt={'4'}>Location</FormLabel>
                                        <Input fontSize={'sm'} borderRadius={'0'} color={'white'} placeholder={"Remote or city"} _placeholder={{ color: 'white' }}/>
                                        <FormLabel textTransform={'uppercase'} color={'white'} fontSize={'l'} mt={'4'}>token compensation?</FormLabel>
                                        <RadioGroup defaultValue='No'>
                                            <HStack spacing='24px'>
                                                <Radio colorScheme={'whiteAlpha'} value='Yes'>Yes</Radio>
                                                <Radio inputProps={{
                                                    'color': 'white'
                                                }} colorScheme={'whiteAlpha'} value='Ho'>No</Radio>
                                            </HStack>
                                        </RadioGroup>
                                        <FormLabel textTransform={'uppercase'} color={'white'} fontSize={'l'} mt={'4'}>ANNUALIZED COMPENSATIOn/FULL-TIME EQUIVALENT SALARY</FormLabel>
                                        <HStack>
                                            <Select placeholder='Minimum Pay in USD' color={'white'} fontSize={'sm'}>
                                                <option value='option1'>Option 1</option>
                                                <option value='option2'>Option 2</option>
                                                <option value='option3'>Option 3</option>
                                            </Select>
                                            <Select placeholder='Maximum Pay in USD' color={'white'} fontSize={'sm'}>
                                                <option value='option1'>Option 1</option>
                                                <option value='option2'>Option 2</option>
                                                <option value='option3'>Option 3</option>
                                            </Select>
                                        </HStack>
                                        <FormHelperText fontSize={'xs'} mt={'4'} color={'gray.400'}>Note: Full-time equivalent means that if you hire a half-time developer for $5,000 per month, that would be an annnualized rate of $120,000. We do not require pay range disclosure but jobs with clear compensation get more attention and Google does not pick up job postings without this information.</FormHelperText>                                    
                                        <FormLabel textTransform={'uppercase'} color={'white'} fontSize={'l'} mt={'4'}>Job Description</FormLabel>
                                    </FormControl>                                    
                                </Box>                                                        
                            </VStack>
                        </GridItem>
                        <GridItem colSpan={2} bg='black' border={'2px solid #B7DFB8'} boxShadow='dark-lg'>
                            <VStack p={'4'}>
                                <Box w={'100%'}>
                                    <Heading textAlign={'center'} textTransform={'uppercase'} color={'#D900EC'} size={'xl'} textShadow='-1px 2px #24FF00'>
                                        WHY US?
                                    </Heading>
                                </Box>                  
                            </VStack>    
                        </GridItem>
                    </Grid>
                </Container>
            </Container>
        </div>
    );
}
