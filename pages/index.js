import { Box, CircularProgress, Container, Flex, FormControl, Grid, GridItem, Heading, Switch, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, Wrap } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import JobList from "../components/JobList";
import Taglist from "../components/Taglist";
import { supabase } from "../utils/SupabaseCLient";
import { chains, groupedOptions, locations, positionTypes, sectors, techs } from '../utils/data';


const intitialTagData = {
    chain: [],
    sector: [],
    tech: [],
    position_type: [],
    location: []
}    

export default function Home() {
    const [searchValues, setsearchValues] = useState([])
    // const [tags, settagss] = useState({
    //     tagArray: [],
    //     tagMap: []
    // })
    const [state, setstate] = useState({
        tagData: {
            chain: [],
            sector: [],
            tech: [],
            job_type: [],
            location: []
        },
        filteredJobList: [],
        initialJobList: [],
        tagArray: [],
        tagMap: [], 
        hasTagData: false,
        isLoading: true
    });
    
    function updateTags(source, {tag}, tagArray) {
        let tagArr = []
        if (tagArray.length !== 0) {
            tagArr = [...tagArray]
        }        
        let mapIsEmpty = false;
        const category = tag.category;
        const tagVal = tag.value;
        const tagState = {...state.tagData};
        let currentTagMap;
        let selectedTags = {};

        if (state.tagMap === undefined) {
            currentTagMap = new Map();
            mapIsEmpty = true;
        } 
        
        // Remove tag from selected tags if it exists
        if (tagState[category].includes(tagVal)) {
            if (!mapIsEmpty) {
                currentTagMap = new Map([...state.tagMap]);
                const selectedTagsInCategory = [...tagState[category]];
                const removedTagList = selectedTagsInCategory.filter((existingTag) => existingTag !== tagVal);
                selectedTags = {...tagState, [category]: [...removedTagList]};
                currentTagMap.delete(tag.id);
            } else {
                const selectedTagsInCategory = [...tagState[category]];
                const removedTagList = selectedTagsInCategory.filter((existingTag) => existingTag !== tagVal);
                selectedTags = {...tagState, [category]: [...removedTagList]};
            }                        
        } // Add tag to appropriate category
        else {
            if (!mapIsEmpty) {
                currentTagMap = new Map([...state.tagMap]);
                const appendedTagList = [...tagState[category], tagVal];
                selectedTags = {...tagState, [category]: [...appendedTagList]};
                currentTagMap.set(tag.id, tag)
            } else {
                const appendedTagList = [...tagState[category], tagVal];
                selectedTags = {...tagState, [category]: [...appendedTagList]};
                currentTagMap.set(tag.id, tag)
            }            
        }
        if (source === "tag") {
            // console.log("logging tag map in updateTags",currentTagMap)
            tagArr = [...currentTagMap.values()]
            return {selectedTags, tagArr, currentTagMap}
        }
        else if (source === "remote") {
            return {selectedTags}
        }
        else {
            return {selectedTags, tagArr};
        }
    }
    
    function updateTagsMap({tag}) {
        console.log("tag in tagsmap", tag)
        let currentTagMap;
        if (tags === undefined) {
            currentTagMap = new Map();
            currentTagMap.set(tag.id, tag)
        } else {
            currentTagMap = new Map([...tags.tagMap]);
            // Remove tag from selected tags if it exists
            if (currentTagMap.has(tag.id)) {
                currentTagMap.delete(tag.id);
            } // Add tag to appropriate category
            else {
                currentTagMap.set(tag.id, tag)
            }            
        }
        settagss((prevTagState) => {
            return {
                ...prevTagState,
                tagArray: [...currentTagMap.values()],
                tagMap: currentTagMap
            }
        })        
    }
    
    function filterJobs(tagSource, selectedTags, tagArr, newTagMap) {
        console.log("In filterJobs")
        const initialJobList = [...state.initialJobList];
        let filteredList = [];
        let allEmpty = true;
        // if (tagSource === "remote" && !state.hasTagData) {  
        //     allEmpty = false;          
        //     console.log("Remote filter with no tags")
        //     initialJobList.forEach((job) => {
        //         if (job.location === "remote") {
        //             console.log("job with remote location", job)
        //             filteredList.push(job)
        //         }
        //     })
        // } // filter for all remote jobs with current tags
        // else {
            // Iterate through each job in the DB
        initialJobList.forEach((job) => {
            // console.log(job.location)
            // Iterate through each filter by category (chain, sector, etc)
            for (const tagCategory in selectedTags) {
                if (selectedTags[tagCategory].length > 0) {
                    allEmpty = false;
                    if (tagCategory === "tech") {
                        const selectedTechTags = selectedTags[tagCategory];
                        const jobTechTags = job[tagCategory];
                        selectedTechTags.forEach(selectedTag => {                            
                            if (jobTechTags.includes(selectedTag)) {
                                filteredList.push(job)
                                return;
                            }
                        });                        

                    } else if (tagCategory === "sector") {
                        const selectedSectorTags = selectedTags[tagCategory];
                        const jobSectorTags = job[tagCategory];
                        selectedSectorTags.forEach(selectedTag => {
                            if (jobSectorTags.includes(selectedTag)) {
                                filteredList.push(job);
                                return;
                            }
                        });
                    } else {
                        if (!selectedTags[tagCategory].includes(job[tagCategory])) {
                            continue;

                        } else {
                            filteredList.push(job)
                        }
                    }
                }                
            }
        });
        // }
        
        if (allEmpty) {
            filteredList = [...initialJobList];
        }
        if (tagSource === "remote") {
            setstate((prevState) => {
                return {
                    ...prevState,
                    tagData: {...selectedTags},
                    filteredJobList: [...filteredList],
                }
            })
        }
        else if (tagSource === "tag") {
            setstate((prevState) => {
                return {
                    ...prevState,
                    tagData: {...selectedTags},
                    filteredJobList: [...filteredList],
                    tagArray: [...tagArr],
                    tagMap: newTagMap,
                    hasTagData: true
                }
            })
        } else {
            setstate((prevState) => {
                return {
                    ...prevState,
                    tagData: {...selectedTags},
                    filteredJobList: [...filteredList],
                    tagArray: [...tagArr],
                    hasTagData: true
                }
            })
        }
    }

    const handleSearch = newSearchTags => {  
        // console.log("search tag array", newSearchTags)              
        if (newSearchTags.length === 0) {
            handleTagClick("empty", "", newSearchTags)
        }

        let searchResults;
        // if (state.tagArray === undefined && newSearchTags.length > 0) {
        if (searchValues === undefined && newSearchTags.length > 0) {
            searchResults = newSearchTags[0]
            setsearchValues([...newSearchTags]);
        }
        else {
            // const tagArray = [...state.tagArray];
            const tagArray = [...searchValues]
            let arr1 = tagArray;
            let arr2 = newSearchTags; 
            searchResults = arr1
            .filter(x => !arr2.includes(x))
            .concat(arr2.filter(x => !arr1.includes(x)));
            setsearchValues([...newSearchTags])
        }
        console.log("Search tag selected in search", searchResults[0]);
        const searchTagSelected = searchResults[0];
        handleTagClick("search", searchTagSelected, newSearchTags)
    }
    
    function handleTagClick(tagSource, tag, selectedTagsArr) {
        
        if (tagSource === "remote") {
            tag = locations[0]
            const {selectedTags} = updateTags(tagSource, {tag}, [])
            filterJobs(tagSource, selectedTags)
        }
        if (tagSource === "search") {
            const {selectedTags, tagArr} = updateTags(tagSource, {tag}, selectedTagsArr);
            filterJobs(tagSource, selectedTags, tagArr);        
        }
        if (tagSource === "tag") {
            const {selectedTags, tagArr, currentTagMap} = updateTags(tagSource, tag, [])
            filterJobs(tagSource, selectedTags, tagArr, currentTagMap);        
        }
    }
    
    // Fetch initial job data
    useEffect(() => {
        async function initState() {            
                const data = await fetchJobs();
                setstate({
                    tagData: intitialTagData,
                    initialJobList: data,
                    filteredJobList: data, 
                    isLoading: false
                })
            // })
        }
        initState()
    },[])
    
    // Log state changes
    useEffect(() => {
        // console.log("Current Tag List", state.tagData)    
        // console.log("Initial Jobs Fetched", state.initialJobList)        
        console.log("Filtered Jobs List", state.filteredJobList)
        console.log("Tag Data", state.tagData)
        // console.log("Search Values", searchValues)
        // console.log("tempTagList", tempTagList)
        console.log("Tags array: ", state.tagArray)
        console.log("Tags map: ", state.tagMap)
    }, [state])

    
    async function fetchJobs() {        
        let query = supabase
        .from('formatted_jobs')
        .select()
        // .eq('location', 'remote')
        .order('inserted_at', {ascending: true})
        .limit(10)
        // .single()

        const {data, error} = await query;
        if (!error) {
            return data;   
        }
        console.log("logging data response", data);
    }
 
  return (
    <div>
    <Container maxW={'100vw'} bgColor={'blackAlpha.900'} h={'100%'}>
    <Container 
      maxW={'container.xl'}
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
            maxWidth={'container.xl'}
            // bgColor={'green.200'}
            >   
                <Flex
                direction={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={'4'}
                // bgColor={'purple.200'}
                >
                    {/* Title and subtitle */}
                    <Box 
                    alignContent={'center'}
                    justifyContent={'center'}
                    >
                        {/* <Center> */}
                        
                            <Heading textTransform={'uppercase'} as={'h1'} fontSize={{base: '6xl', md: '3xl', lg: '8xl'}} color={'#F16DF4'} textShadow='-1px 2px #24FF00' >Dev Jobs <br/> For Web3</Heading>
                            {/* <Heading as={'h1'} fontSize={{base: '3xl', md: '3xl', lg: '6xl'}} >For Web3  </Heading> */}
                        {/* </Center> */}
                    </Box>
                    <Box  w={{base: '15rem', md: '1', lg: '100%'}} display={'flex'} justifyContent={'center'}> 
                        <Text fontSize={{base: 'md', md: '3xl', lg: 'xl'}} color={'white'} textAlign={'center'}>Homepage for Blockchain and Crypto Developers</Text>
                    </Box>
                    {/* Search Bar & Remote Toggle */}
                    <Box maxW={'34rem'} 
                    // bgColor={"gray"}
                    >
                        <Grid
                        templateColumns='repeat(14, 1fr)'
                        // gap={0}
                        // h='30'
                        >
                        <GridItem colSpan={12}>
                            <Box >
                                <FormControl p={10}>
                                    <Select
                                        isMulti
                                        options={groupedOptions}
                                        variant={'outline'}
                                        placeholder="Smart Contract, Full Stack, ZK, DAO..."
                                        closeMenuOnSelect={true}
                                        selectedOptionStyle="check"
                                        hideSelectedOptions={false}
                                        value={state.tagArray}
                                        onChange={handleSearch}
                                        color={'white'}
                                        colorScheme={'whiteAlpha'}
                                        useBasicStyles
                                    />
                                    </FormControl>
                            </Box> 
                        </GridItem>                   
                        <GridItem colSpan={2}> 
                            <Flex gap={'3'} justifyContent="flex-start"alignItems={'center'} height={'100%'}>
                                <Switch colorScheme={'light-green'} color={'blue'} variant={'boxy'} onChange={() => handleTagClick("remote")}></Switch>
                                <Text fontSize={'sm'} color={'white'}>REMOTE</Text>
                            </Flex>
                        </GridItem>
                        </Grid>
                    </Box>
                    {/* Tab List */}
                    <Box w={['xs', 'md', 'lg']}>                        
                        <Tabs variant='solid-rounded' defaultIndex={0} align={'center'}  >
                        {/* color={'#E400EC'} textShadow='-1px 2px #24FF00' */}
                            <TabList >
                                <Tab  _selected={{ color: 'white', bg: '#F16DF4' }} color={'white'}>Chain</Tab>
                                <Tab  _selected={{ color: 'white', bg: '#F16DF4' }} color={'white'}>Sector</Tab>
                                <Tab  _selected={{ color: 'white', bg: '#F16DF4' }} color={'white'}>Tech</Tab>
                                <Tab  _selected={{ color: 'white', bg: '#F16DF4' }} color={'white'}>Job Type</Tab>
                                <Tab  _selected={{ color: 'white', bg: '#F16DF4' }} color={'white'}>Location</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>    
                                    <Wrap spacing={'10px'} justify={'center'}>
                                        {/* Map through chains */}
                                        <Taglist tags={chains} tagClick={handleTagClick} />                                                        
                                    </Wrap>                                                                                      
                                </TabPanel>
                                <TabPanel>
                                    <Wrap spacing={'10px'} justify={'center'}>                                        
                                        <Taglist tags={sectors} tagClick={handleTagClick} />                                                        
                                    </Wrap>                    
                                </TabPanel>
                                <TabPanel>
                                    <Wrap spacing={'10px'} justify={'center'}>                                        
                                        <Taglist tags={techs} tagClick={handleTagClick} />                                                         
                                    </Wrap>                    
                                </TabPanel>
                                <TabPanel>
                                    <Wrap spacing={'10px'} justify={'center'}>                                        
                                        <Taglist tags={positionTypes} tagClick={handleTagClick} />                                                         
                                    </Wrap>                                                    
                                </TabPanel>
                                <TabPanel>
                                    <Wrap spacing={'10px'} justify={'center'}>                                        
                                        <Taglist tags={locations} tagClick={handleTagClick} />                                                         
                                    </Wrap>                                                    
                                </TabPanel>
                            </TabPanels>
                        </Tabs>                                   
                    </Box>
                    <Box>
                        
                    </Box>
                    {/* Multi Select Items */}   
                    <Box>
                            {
                            state.isLoading ? 
                            <CircularProgress isIndeterminate color='#F16DF4' /> :  
                            <JobList jobs={state.filteredJobList}/>
                            }
                    </Box>                                                 
                </Flex>
                {/* {
                    jobs.map((job) => (
                    <PostCard 
                    key={job.id}
                    jobTitle={job.job_title}
                    organization={job.organization_name}
                    location={job.location}
                    minSalary={job.min_salary}
                    maxSalary={job.max_salary}
                    positionType={job.position_type}
                    tech={job.tech}
                    />
                    ))
                } */}
                
                {/* {
                    // loading ? 
                    // <Spinner size={'xl'} /> :
                    // (
                        jobs.map(({job: {
                            id,
                            job_title,
                            organization_name,
                            location,
                            min_salary,
                            max_salary,
                            position_type,
                            tech
                        }}) => (
                            <PostCard 
                            // key={id}s
                            jobTitle={job_title}
                            organization={organization_name}
                            location={location}
                            minSalary={min_salary}
                            maxSalary={max_salary}
                            positionType={position_type}
                            tech={tech}
                            />
                        ))


                        
                    // )                     
                } */}

            {/*  */}                   
            </Container>            
            {/* <Container maxW={'100%'}
            bgColor={'purple.100'}
            h={'full'}
            >
            {/* Job card list */}
            {/* {
            state.isLoading ? 
            <CircularProgress isIndeterminate color='#B7DFB8' /> : 
            <JobList jobs={state.filteredJobList}/>
            } */}
            
                {/* {jobs.map((job, index) => (
                    <PostCard 
                    key={index}
                    jobTitle={job.job_title}
                    organizationName={job.organization_name}
                    location={job.location}
                    logoUrl={job.logo_url}
                    salaryRange={job.salary_range}
                    positionType={job.position_type}
                    tech={job.tech}
                    sector={job.sector}
                    chain={job.chain}                    
                    />
                ))} */}
            {/* </Container> */}
            </VStack>

        </Box>            
    </Container>
    </Container>
      
      {/* Post Card List */}
        {/* Post Cards */}      
      {/* load more */}
    </div>
  )
}