import { Avatar, Box, Button, Checkbox, CheckboxGroup, Container, Divider, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Heading, Highlight, HStack, Image, Input, Radio, RadioGroup, Select as DropDown, Text, Textarea, VStack } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useEffect, useState } from 'react';
import { chains, locations, positionTypes, techs } from '../utils/data';

const bearMarketSpecialEnum = {value: 256, label: "bear-market-special"}
const logoAddOn = {value: 69, label: "logo-add-on"}
const stickyValues = {
    "48-hours": {value: 69, label: "48-hours"},
    "7-days": {value: 269, label: "7-days"},
    "14-days": {value: 469, label: "14-days"}
}

export default function PostJob() {
    const [selectedChains, setselectedChains] = useState([]);
    const [selectedTechs, setselectedTechs] = useState([]);
    const [selectedPosition, setselectedPosition] = useState([]);
    const [selectedLocation, setselectedLocation] = useState([]);
    const [jobTotal, setjobTotal] = useState(169)
    

    function handleSelect(selectedOptions) {
        if (selectedOptions.length > 0) {
            const currentCategory = selectedOptions[0].category;
            if (currentCategory === "chain") {
                setselectedChains([...selectedOptions])
            }
            if (currentCategory === "tech") {
                setselectedTechs([...selectedOptions])
            }
            if (currentCategory === "position_type") {
                setselectedPosition([...selectedOptions])
            }
            if (currentCategory === "location") {
                setselectedLocation([...selectedOptions])
            }
        } 
    }

    function handleAddOn(e) {
        console.log(e)
        const addOn = e.target.value;
        console.log(addOn)
        if (addOn === "bearMarketSpecial") {
            setjobTotal(bearMarketSpecialEnum.value)
        }
        if (addOn === "48-hour-sticky") {
            if (e.target.checked) {
                setjobTotal(jobTotal + stickyValues["48-hours"].value)
            }
            else {
                setjobTotal(jobTotal - stickyValues["48-hours"].value)
            }
            
        }
    }

    useEffect(() => {
        console.log("Selected Chains", selectedChains)
        console.log("Selected Techs", selectedTechs)
        console.log("Job total", jobTotal)
    }, [selectedChains, selectedTechs, jobTotal])

    return (
        <div>
            <Container maxW={'100vw'} maxH={'100vh'} bgColor={'black'}>
                <Container maxW={'container.xl'} p={'6'}>
                    <Grid
                    // h={'100vh'}
                    templateColumns='repeat(6, 1fr)'
                    gap={4}
                    >
                        <GridItem colSpan={4} bg='black' border={'2px solid #E968F4'} backdropBlur="6px">
                            <VStack p={'4'} gap={'2'}>
                                <Box w={'100%'}>
                                    <Heading  textTransform={'uppercase'} color={'#F16DF4'} size={'2xl'} textAlign={'start'} textShadow='-1px 2px #24FF00'>
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
                                        <Select
                                            isMulti
                                            options={chains}
                                            variant={'outline'}
                                            placeholder="Ethereum, Solana, Optimism, Polygon, Polkadot, etc."
                                            closeMenuOnSelect={true}
                                            selectedOptionStyle="check"
                                            hideSelectedOptions={false}
                                            // value={selectedChains}
                                            onChange={handleSelect}
                                            color={'white'}
                                            colorScheme={'whiteAlpha'}
                                            useBasicStyles
                                        />
                                        {/* <Input fontSize={'sm'} borderRadius={'0'} color={'white'} placeholder={"Ethereum, Solana, Optimism, Polygon, Polkadot, etc."} _placeholder={{ color: 'white' }}/> */}
                                        <FormHelperText fontSize={'xs'} mt={'4'} color={'gray.400'}>Search your L1 or L2.</FormHelperText>
                                        <FormLabel textTransform={'uppercase'} color={'white'} fontSize={'l'} mt={'4'}>tech skills (Minimum 3)</FormLabel>
                                        <Select
                                            isMulti
                                            options={techs}
                                            variant={'outline'}
                                            placeholder="Rust, Solidity, Javascript, Node.js, Circuit, etc."
                                            closeMenuOnSelect={true}
                                            selectedOptionStyle="check"
                                            hideSelectedOptions={false}
                                            // value={selectedChains}
                                            onChange={handleSelect}
                                            color={'white'}
                                            colorScheme={'whiteAlpha'}
                                            useBasicStyles
                                        />
                                        {/* <Input fontSize={'sm'} borderRadius={'0'} color={'white'} placeholder={"Rust, Solidity, Javascript, Node.js, Circuit, etc."} _placeholder={{ color: 'white' }}/> */}
                                        <FormHelperText fontSize={'xs'} mt={'4'} color={'gray.400'}>Choose all technical expertise that apply to this job.</FormHelperText>
                                        <FormLabel textTransform={'uppercase'} color={'white'} fontSize={'l'} mt={'4'}>job type</FormLabel>
                                        <Select
                                            // isMulti
                                            options={positionTypes}
                                            variant={'outline'}
                                            placeholder="Full-time, part-time, internship"
                                            closeMenuOnSelect={true}
                                            selectedOptionStyle="check"
                                            hideSelectedOptions={false}
                                            // value={selectedChains}
                                            onChange={handleSelect}
                                            color={'white'}
                                            colorScheme={'whiteAlpha'}
                                            useBasicStyles
                                        />
                                        {/* <Input fontSize={'sm'} borderRadius={'0'} color={'white'} placeholder={"Full time, part time, internship"} _placeholder={{ color: 'white' }}/> */}
                                        <FormLabel textTransform={'uppercase'} color={'white'} fontSize={'l'} mt={'4'}>Location</FormLabel>
                                        <Select
                                            isMulti
                                            options={locations}
                                            variant={'outline'}
                                            placeholder="Full-time, part-time, internship"
                                            closeMenuOnSelect={true}
                                            selectedOptionStyle="check"
                                            hideSelectedOptions={false}
                                            // value={selectedChains}
                                            onChange={handleSelect}
                                            color={'white'}
                                            colorScheme={'whiteAlpha'}
                                            useBasicStyles
                                        />
                                        {/* <Input fontSize={'sm'} borderRadius={'0'} color={'white'} placeholder={"Remote or city"} _placeholder={{ color: 'white' }}/> */}
                                        <FormLabel textTransform={'uppercase'} color={'white'} fontSize={'l'} mt={'4'}>token compensation?</FormLabel>
                                        <RadioGroup defaultValue='No'>
                                            <HStack spacing='24px'>
                                                <Radio  color={'white'} colorScheme={'whiteAlpha'} value='Yes'>Yes</Radio>
                                                <Radio inputProps={{
                                                    'color': 'white'
                                                }} colorScheme={'whiteAlpha'} value='Ho'>No</Radio>
                                            </HStack>
                                        </RadioGroup>
                                        <FormLabel textTransform={'uppercase'} color={'white'} fontSize={'l'} mt={'4'}>ANNUALIZED COMPENSATIOn/FULL-TIME EQUIVALENT SALARY</FormLabel>
                                        <HStack>
                                            <DropDown placeholder='Minimum Pay in USD' color={'white'} fontSize={'sm'}>
                                                <option value='20K-40K'>20K-40K</option>
                                                <option value='40K-60K'>40K-60K</option>
                                                <option value='60K-80K'>60K-80K</option>                                                
                                            </DropDown>
                                            <DropDown placeholder='Maximum Pay in USD' color={'white'} fontSize={'sm'}>
                                                <option value='80K-100K'>80K-100K</option>
                                                <option value='100K-120K'>100K-120K</option>
                                                <option value='120K-160K'>120K-160K</option>
                                                <option value='160K-200K'>160K-200K</option>
                                                <option value='200K+'>200K+</option>
                                            </DropDown>
                                        </HStack>
                                        <FormHelperText fontSize={'xs'} mt={'4'} color={'gray.400'}>Note: Full-time equivalent means that if you hire a half-time developer for $5,000 per month, that would be an annnualized rate of $120,000. We do not require pay range disclosure but jobs with clear compensation get more attention and Google does not pick up job postings without this information.</FormHelperText>                                    
                                        <FormLabel textTransform={'uppercase'} color={'white'} fontSize={'l'} mt={'4'}>Job Description</FormLabel>
                                        <Textarea placeholder='Description' size={'lg'} />
                                        <FormLabel mt='4' textTransform={'uppercase'} color={'white'} fontSize={'l'}>Application link or email</FormLabel>
                                        <Textarea placeholder='Company name, legal address, VAT number' size={'lg'} />
                                        <FormLabel mt='4' textTransform={'uppercase'} color={'white'} fontSize={'l'}>Organization Twitter</FormLabel>
                                        <Input borderRadius={'0'} color={'white'}/>
                                        <FormLabel  mt='4' textTransform={'uppercase'} color={'white'} fontSize={'l'}>POST DETAILS</FormLabel>
                                        <CheckboxGroup defaultValue='No'>
                                            <VStack align={'start'} spacing='10px'>
                                                <Checkbox colorScheme={'whiteAlpha'} value={"bearMarketSpecial"} onChange={handleAddOn}>
                                                    <Flex direction={'row'} gap={'1'}>
                                                    <Text fontSize={'xs'} color={'white'}>BEAR MARKET SPECIAL ($256): </Text> 
                                                    <Text fontSize={'xs'} color={'#E968F4'}> Post Job + 24 Hr Sticky + 24 Hr Support + Logo + Color</Text> 
                                                    </Flex>
                                                </Checkbox>
                                                <Checkbox colorScheme={'whiteAlpha'} value='logo'>
                                                    <VStack>
                                                        <Flex direction={'row'} gap={'1'}>
                                                            <Text fontSize={'xs'} color={'white'}>Add your logo + color ($69)</Text> 
                                                            <Text fontSize={'xs'} color={'#E968F4'}> 4X MORE VIEWS</Text>                                                         
                                                        </Flex>
                                                        {/* <Input type='file'></Input> */}
                                                    </VStack>
                                                </Checkbox>
                                                <Input width={'xs'} border='false' type='file'></Input>
                                                <HStack pl={'4'}>
                                                    <Button
                                                        // aria-label={color}
                                                        background={'#E968F4'}
                                                        height="22px"
                                                        width="22px"
                                                        padding={0}
                                                        minWidth="unset"
                                                        borderRadius={3}
                                                    ></Button>
                                                    <Text color={'white'}> Choose color</Text>
                                                </HStack>
                                                <Text color={'white'}> Sticky post to top + front page: </Text>
                                                <Checkbox colorScheme={'whiteAlpha'} value='48-hour-sticky' onChange={handleAddOn} >
                                                    <VStack>
                                                        <Flex direction={'row'} gap={'1'}>
                                                            <Text fontSize={'xs'} color={'white'}>48 hours ($69)</Text> 
                                                            <Text fontSize={'xs'} color={'#E968F4'}> 3X MORE VIEWS</Text>                                                         
                                                        </Flex>
                                                        {/* <Input type='file'></Input> */}
                                                    </VStack>
                                                </Checkbox>
                                                <Checkbox colorScheme={'whiteAlpha'} value='7-days-sticky'>
                                                    <VStack>
                                                        <Flex direction={'row'} gap={'1'}>
                                                            <Text fontSize={'xs'} color={'white'}>7 days ($269)</Text> 
                                                            <Text fontSize={'xs'} color={'#E968F4'}> 4X MORE VIEWS</Text>                                                         
                                                        </Flex>
                                                        {/* <Input type='file'></Input> */}
                                                    </VStack>
                                                </Checkbox>
                                                <Checkbox colorScheme={'whiteAlpha'} value='14-days-sticky'>
                                                    <VStack>
                                                        <Flex direction={'row'} gap={'1'}>
                                                            <Text fontSize={'xs'} color={'white'}>14 days ($469)</Text> 
                                                            <Text fontSize={'xs'} color={'#E968F4'}> 6X MORE VIEWS</Text>                                                         
                                                        </Flex>
                                                    </VStack>
                                                </Checkbox>
                                            </VStack>
                                        </CheckboxGroup>
                                        <Button width={'100%'} as={'a'} mt={'4'} variant={'outline'} color={'#B7DFB8'} border={'2px'} borderColor={"#E968F4"} size={['sm','md','md']} >POST JOB ${jobTotal}</Button>
                                    </FormControl>                                    
                                </Box>                                                        
                            </VStack>
                        </GridItem>
                        <GridItem colSpan={2} bg='black' border={'2px solid #B7DFB8'} boxShadow='dark-lg'>
                            <VStack p={'4'}>
                                <Box w={'100%'}>
                                    <Heading textAlign={'center'} textTransform={'uppercase'} color={'#F16DF4'} size={'2xl'} textShadow='-1px 2px #24FF00'>
                                        WHY US?
                                    </Heading>
                                    <Text mt={'4'} color={'white'} align={'center'}>
                                        <Highlight query={'only developer-focused job board'} styles={{color: '#F16DF4'}}>
                                        D4W3 is the only developer-focused job board for Web3 with skill-and-sector-specific posting and searching.
                                        </Highlight>
                                    </Text>                                    
                                    <Image mt="4" src='https://apqbccqpsxioblviamtj.supabase.co/storage/v1/object/public/social-proof/Screen%20Shot%202022-11-02%20at%202.35%201.png' />
                                    <Divider mt='4'/>
                                    <Heading color={"#F16DF4"} mt={'4'} align={'center'} size={'md'}>
                                        300+ jobs posted
                                    </Heading>
                                    <Divider mt='4'/>
                                    <Heading color={"#F16DF4"} mt={'4'} align={'center'} size={'md'}>
                                        # Million+ Views
                                    </Heading>
                                    <Divider mt='4'/>
                                    <Box>
                                        <Heading color={"#F16DF4"} mt={'4'} align={'center'} size={'md'}>
                                            300+ jobs posted
                                        </Heading>
                                        <Text color={"#F16DF4"} fontSize={'xs'} align={'center'}>across jobs</Text>
                                    </Box>                                    
                                    <Divider mt='4'/>
                                    <Box mt='4'>
                                        <Text color={"#F16DF4"} fontSize={'xs'} align={'center'}>Distributed on</Text>
                                        <Heading color={"#F16DF4"} align={'center'} size={'md'}>
                                            Google for jobs
                                        </Heading>
                                    </Box>                                    
                                    <Divider mt='4'/>
                                    <Heading color={"#F16DF4"} mt={'4'} align={'center'} size={'md'}>
                                        # Twitter Followers
                                    </Heading>
                                    <Divider mt='4'/>
                                    <Heading color={"#F16DF4"} mt={'4'} align={'center'} size={'md'}>
                                        # Email subscribers
                                    </Heading>
                                    <Divider mt='4'/>
                                    <VStack mt='4'>
                                        <Avatar>
                                            
                                        </Avatar>
                                        <Heading color={"#F16DF4"} align={'center'} size={'md'}>
                                            "My go-to place to hire web3 devs."
                                        </Heading>
                                        <Text color={'white'}>
                                            <Highlight query={['Satoshi Nakamoto', 'Bitcoin']} styles={{color: "#F16DF4"}}>
                                            Satoshi Nakamoto
                                            CTO at Bitcoin
                                            </Highlight>
                                        </Text>
                                    </VStack>
                                    <Divider mt='4'/>
                                    <VStack mt='4'>
                                        <Avatar>
                                            
                                        </Avatar>
                                        <Heading color={"#F16DF4"} align={'center'} size={'md'}>
                                            "My go-to place to hire web3 devs."
                                        </Heading>
                                        <Text align={'center'} color={'white'}>
                                            <Highlight query={['Satoshi Nakamoto', 'Bitcoin']} styles={{color: "#F16DF4"}}>
                                            Satoshi Nakamoto
                                            CTO at Bitcoin
                                            </Highlight>
                                        </Text>
                                    </VStack>
                                    <Divider mt='4'/>
                                    <VStack mt='4'>
                                        <Avatar>
                                            
                                        </Avatar>
                                        <Heading color={"#F16DF4"} align={'center'} size={'md'}>
                                            "My go-to place to hire web3 devs."
                                        </Heading>
                                        <Text color={'white'}>
                                            <Highlight query={['Satoshi Nakamoto', 'Bitcoin']} styles={{color: "#F16DF4"}}>
                                            Satoshi Nakamoto
                                            CTO at Bitcoin
                                            </Highlight>
                                        </Text>
                                    </VStack>
                                    <Divider mt='4'/>
                                    <VStack mt='4'>
                                        <Avatar>
                                            
                                        </Avatar>
                                        <Heading color={"#F16DF4"} align={'center'} size={'md'}>
                                            "My go-to place to hire web3 devs."
                                        </Heading>
                                        <Text color={'white'}>
                                            <Highlight query={['Satoshi Nakamoto', 'Bitcoin']} styles={{color: "#F16DF4"}}>
                                            Satoshi Nakamoto
                                            CTO at Bitcoin
                                            </Highlight>
                                        </Text>
                                    </VStack>
                                </Box>                  
                            </VStack>    
                        </GridItem>
                    </Grid>
                </Container>
            </Container>
        </div>
    );
}
