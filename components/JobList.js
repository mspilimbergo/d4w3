import PostCard from '../components/PostCard';

const JobList = ({jobs}) => (
    jobs.map((job, index) => {
        const sectorTags = job.sector.replace(/\[|\]/g,'').split(',');  
        const jobTechTags = job.tech.replace(/\[|\]/g,'').split(',');  
        return(
            <PostCard 
                key={index}
                id={job.id}
                jobTitle={job.job_title}
                organizationName={job.organization_name}
                location={job.location}
                logoUrl={job.logo_url}
                salaryRange={job.salary_range}
                positionType={job.position_type}
                tech={jobTechTags}
                sector={sectorTags}
                chain={job.chain}                    
            />
        )
    })
)

export default JobList;