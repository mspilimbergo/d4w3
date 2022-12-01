import { Box, Container, Flex, FormControl, Grid, GridItem, Heading, Switch, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, Wrap } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import JobList from "../components/Joblist";
import Taglist from "../components/Taglist";
import { chains, groupedOptions, locations, positionTypes, sectors, techs } from '../utils/data';
import { supabase } from "../utils/SupabaseCLient";


const intitialTagData = {
    chain: [],
    sector: [],
    tech: [],
    position_type: [],
    location: []
}    

export default function Home() {
    const [searchValues, setsearchValues] = useState([])
    const [tags, settagss] = useState({
        tagArray: [],
        tagMap: []
    })
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
        tagMap: []
    });
    
    function updateTags({tag}) {
        const category = tag.category;
        const tagVal = tag.value;
        const tagState = {...state.tagData};
        let currentTagMap;
        let newTagState = {};

        if (state.tagMap === undefined) {
            currentTagMap = new Map();
            currentTagMap.set(tag.id, tag)
        }
        // Remove tag from selected tags if it exists
        if (tagState[category].includes(tagVal)) {
            const selectedTagsInCategory = [...tagState[category]];
            const filteredTagList = selectedTagsInCategory.filter((existingTag) => existingTag !== tagVal);
            newTagState = {...tagState, [category]: [...filteredTagList]};
            currentTagMap.delete(tag.id);
        } // Add tag to appropriate category
        else {
            const updatedTagList = [...tagState[category], tagVal];
            newTagState = {...tagState, [category]: [...updatedTagList]};
            currentTagMap.set(tag.id, tag)
        }
        return {newTagState, currentTagMap};
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
    
    function filterJobs(selectedTags, currentTagMap) {
        // console.log("selectedTags", selectedTags)
        // console.log("currentTagMap", currentTagMap)
        const initialJobList = [...state.initialJobList];
        let allEmpty = true;
        let filteredList = [];
        // Iterate through each job in the DB
        initialJobList.forEach((job) => {
            // Iterate through each filter by category (chain, sector, etc)
            for (const tagCategory in selectedTags) {
                if (selectedTags[tagCategory].length > 0) {
                    allEmpty = false;
                    if (tagCategory === "tech") {
                        // [tech: ["node.js", "unity"]] selectedTechTags
                        // [tech: ["unity, python"]] jobTechTags
                        const selectedTechTags = selectedTags[tagCategory];
                        const jobTechTags = job[tagCategory];
                        selectedTechTags.forEach(selectedTag => {
                            // show the item
                            if (jobTechTags.includes(selectedTag)) {
                                filteredList = initialJobList.filter((job) => )
                            } else {
                                filteredList[...]
                            } 
                        });
                    } else if (tagCategory === "sector") {
                        const selectedSectorTags = selectedTags[tagCategory];
                        const jobSectorTags = job[tagCategory];
                        selectedSectorTags.forEach(selectedTag => {
                            if (jobSectorTags.includes(selectedTag)) {
                               if (!filteredList.has(job)) {
                                    filteredList.add(job);
                               } 
                            } else {
                                if (filteredList.has(job)) {
                                    filteredList.delete(job);
                                }
                            } 
                        });
                    } else {
                        if (!selectedTags[tagCategory].includes(job[tagCategory])) {
                            if (filteredList.has(job)) {
                                filteredList.delete(job);
                            }
                        } else {
                            filteredList.add(job)
                        }
                    }
                }                
            }
        });
        if (allEmpty) {
            filteredList = [...initialJobList];
        }
        setstate((prevState) => {
            return {
                ...prevState,
                tagData: {...selectedTags},
                filteredJobList: [...filteredList]
            }
        })
    }

    // function filterJobsRefactored(tags) {
        // const initialJobList = [...state.initialJobList];
        // if tag array is zero, then set to initial job list
        // go through each job list 
            // go through the tags array
                // for each tag item, check if the job contains the 
    // }
    
    const handleSearch = newSearchTags => {        
        let searchTagSelected = ""
        if (searchValues === undefined && newSearchTags.length > 0) {
            searchTagSelected = newSearchTags[0]
            setsearchValues([...newSearchTags]);
        }
        else {
            let arr1 = searchValues;
            let arr2 = newSearchTags; 
            searchTagSelected = arr1
            .filter(x => !arr2.includes(x))
            .concat(arr2.filter(x => !arr1.includes(x)));
            setsearchValues([...newSearchTags])
        }
        console.log("Search tag selected", searchTagSelected[0]);
        handleTagClick("search", searchTagSelected[0].category, searchTagSelected[0].value)
    }
    
    function handleTagClick(tagSource, tag) {
        // console.log(tag)
        
        if (tagSource === "search") {
            const newTagState = updateTags(tag);
            filterJobs(newTagState);        
        }
        if (tagSource === "tag") {
            // updateTagsMap(tag)
            const {newTagState, currentTagMap} = updateTags(tag)
            filterJobs(newTagState, currentTagMap);        
        }
    }
    
    // Fetch initial job data
    useEffect(() => {
        async function initState() {            
                const data = await fetchJobs();
                setstate({
                    tagData: intitialTagData,
                    initialJobList: data,
                    filteredJobList: data
                })
            // })
        }
        initState()
    },[])
    
    // Log state changes
    useEffect(() => {
        // console.log("Current Tag List", state.tagData)    
        // console.log("Initial Jobs Fetched", state.initialJobList)        
        // console.log("Filtered Jobs List", state.filteredJobList)
        // console.log("Tag Data", state.tagData)
        // console.log("Search Values", searchValues)
        // console.log("tempTagList", tempTagList)
        console.log("Tags array: ", tags.tagArray)
        console.log("Tags map: ", tags.tagMap)
    }, [state, searchValues, tags])

    
    async function fetchJobs() {        
        let query = supabase
        .from('formatted_jobs')
        .select('*')
        .order('inserted_at')
        .limit(20)
        // .single()

        const {data, error} = await query;
        if (!error) {
            return data;   
        }
        // console.log("logging data response", data);
    }
 
  return (
    <div>
    <Container 
      maxW={'container.xl'}
      bgColor={'blackAlpha.900'}
      h='calc(100vh)'
    >
        <Box 
        bgColor={'red.300'}  
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
                bgColor={'purple.200'}
                >
                    {/* Title and subtitle */}
                    <Box 
                    alignContent={'center'}
                    justifyContent={'center'}
                    >
                        {/* <Center> */}
                            <Heading as={'h1'} fontSize={{base: '4xl', md: '3xl', lg: '6xl'}} >Dev Jobs For Web3</Heading>
                            {/* <Heading as={'h1'} fontSize={{base: '3xl', md: '3xl', lg: '6xl'}} >For Web3  </Heading> */}
                        {/* </Center> */}
                    </Box>
                    <Box  w={{base: '15rem', md: '1', lg: '100%'}} display={'flex'} justifyContent={'center'}> 
                        <Text fontSize={{base: 'md', md: '3xl', lg: 'xl'}} textAlign={'center'}>Homeplace for Crypto and Blockchain Dev Jobs.</Text>
                    </Box>
                    {/* Search Bar & Remote Toggle */}
                    <Box maxW={'30rem'} >
                        <Grid
                        templateColumns='repeat(8, 1fr)'
                        gap={3}
                        // h='30'
                        >
                        <GridItem colSpan={7}>
                            <Box >
                                <FormControl p={4}>
                                    <Select
                                        isMulti
                                        options={groupedOptions}
                                        placeholder="Search.."
                                        closeMenuOnSelect={true}
                                        selectedOptionStyle="check"
                                        hideSelectedOptions={false}
                                        value={tags.tagArray}
                                        onChange={handleSearch}
                                    />
                                    </FormControl>
                            </Box> 
                        </GridItem>                   
                        <GridItem colSpan={1}> 
                            <Flex justifyContent="flex-start" alignItems={'center'} height={'100%'}>
                                <Switch></Switch>
                            </Flex>
                        </GridItem>
                        </Grid>
                    </Box>
                    {/* Tab List */}
                    <Box w={['xs', 'md', 'lg']}>                        
                        <Tabs variant='unstyled' defaultIndex={0} align={'center'}  >
                            <TabList >
                                <Tab  _selected={{ color: 'white', bg: 'blue.500' }}>Chain</Tab>
                                <Tab  _selected={{ color: 'white', bg: 'green.400' }}>Sector</Tab>
                                <Tab  _selected={{ color: 'white', bg: 'green.400' }}>Tech</Tab>
                                <Tab  _selected={{ color: 'white', bg: 'green.400' }}>Job Type</Tab>
                                <Tab  _selected={{ color: 'white', bg: 'green.400' }}>Location</Tab>
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
            <JobList jobs={state.filteredJobList}/>
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
      
      {/* Post Card List */}
        {/* Post Cards */}      
      {/* load more */}
    </div>
  )
}