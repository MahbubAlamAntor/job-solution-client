import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import JobCard from './JobCard';
import { useQuery } from '@tanstack/react-query';
// import JobCard from './JobCard';

const TabCategories = () => {

    const {data: allJobs, isLoading} = useQuery({ queryKey: ['jobs'], queryFn: async() => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
        return data
    } })

    if(isLoading){
        return <span className="loading loading-bars loading-lg"></span>
    }
    return (
        <Tabs>
            <div className='container px-6 py-10 mx-auto'>
                <h1 className='text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl '>
                    Browse Jobs By Categories
                </h1>
                <p className='max-w-2xl mx-auto my-6 text-center text-gray-500 '>
                    Three categories available for the time being. They are Web
                    Development, Graphics Design and Digital Marketing. Browse them by
                    clicking on the tabs below.
                </p>

                <div className='flex items-center justify-center'>
                    <TabList>
                        <Tab>Web Development</Tab>
                        <Tab>Graphics Design</Tab>
                        <Tab>Digital Marketing</Tab>
                    </TabList>
                </div>

                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {/* <JobCard />
                        <JobCard />
                        <JobCard />
                        <JobCard /> */}
                        {
                            allJobs.filter(jobs => jobs.category === 'Web Development').map(job => <JobCard key={job._id} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {
                            allJobs.filter(jobs => jobs.category === 'Graphics Design').map(job => <JobCard key={job._id} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {
                            allJobs.filter(jobs => jobs.category === 'Digital Marketing').map(job => <JobCard key={job._id} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>
            </div>
        </Tabs>
    );
};

export default TabCategories;