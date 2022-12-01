import CustomTabItem from "./CustomTabItem";

const Taglist = ({tags, tagClick}) => (
    tags.map((tag,key) => {
        // console.log(tag)
        return (
            <CustomTabItem  key={key} tag={tag} handleTagClick={tagClick} />
        )
    })
)

export default Taglist;