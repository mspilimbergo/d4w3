import { Checkbox, WrapItem } from '@chakra-ui/react';

const CustomTabItem = ({tag, handleTagClick}) => {  
    const source = "tag"
    // console.log(tag)       
    return (
        <WrapItem onChange={() => handleTagClick(source, {tag})}>
            <Checkbox size='md' colorScheme='green'>
                {tag.label}
            </Checkbox>
        </WrapItem>
    )
    
}

export default CustomTabItem;