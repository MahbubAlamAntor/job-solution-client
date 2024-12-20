import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { compareAsc, format } from "date-fns";
import toast from "react-hot-toast";

const JobDetails = () => {
    const [startDate, setStartDate] = useState(new Date())
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [job, setJob] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        fetchJobData();
    }, [id]);

    const fetchJobData = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/${id}`);
        setJob(data)
        // setStartDate(new Date(data.date))
    }
    const { title, date, min_price, max_price, description,category, buyer,_id } = job || {};

    const handleSubmit = async(e) => {
        e.preventDefault();
        const form = e.target;
        const price = form.price.value;
        const email = user?.email;
        const comment = form.comment.value;
        const jobId = _id;

        // user validation
        if(user?.email === buyer?.email) return toast.error('Action Not Permitted')
        // One Deadline Validation
        if (compareAsc(new Date(), new Date(date)) === 1) return toast.error('Your Deadline Crossed')
        // Price Validation
        if (price > max_price) return toast.error('Offer Price less or at least equal to maximum price')
        // Deadline Validation
        if (compareAsc(new Date(startDate), new Date(date)) === 1) return toast.error('Your Date Line Not Valid')
        
        const bidData = {price, email, comment, dateLine: startDate,jobId, title,category, status:'Pending', buyer: buyer.email };

        try{
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/add-bid`, bidData)
            toast.success('Bid Add Successful')
            form.reset();
            navigate('/my-bids')
            console.log(data)
        }
        catch(error){
            console.log(error)
            toast.error(error?.response?.data)
        }
        // console.log(price, email, comment, dateLine)
    }
    // console.log(allJob)

    return (
        <div className='flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto '>
            {/* Job Details */}
            <div className='flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]'>
                <div className='flex items-center justify-between'>
                    {
                        date && <span className='text-sm font-light text-gray-800 '>
                            Deadline:{format(new Date(date), 'P')}
                        </span>
                    }
                    <span className='px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full '>
                        {title}
                    </span>
                </div>

                <div>
                    <h1 className='mt-2 text-3xl font-semibold text-gray-800 '>

                    </h1>

                    <p className='mt-2 text-lg text-gray-600 '>
                        {description}
                    </p>
                    <p className='mt-6 text-sm font-bold text-gray-600 '>
                        Buyer Details:
                    </p>
                    <div className='flex items-center gap-5'>
                        <div>
                            <p className='mt-2 text-sm  text-gray-600 '>
                                Name: {buyer?.name}
                            </p>
                            <p className='mt-2 text-sm  text-gray-600 '>
                                Email: {buyer?.email}
                            </p>
                        </div>
                        <div className='rounded-full object-cover overflow-hidden w-14 h-14'>
                            <img
                                src={buyer?.photo}
                                alt=''
                            />
                        </div>
                    </div>
                    <p className='mt-6 text-lg font-bold text-gray-600 '>
                        Range: ${min_price} - ${max_price}
                    </p>
                </div>
            </div>
            {/* Place A Bid Form */}
            <section className='p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]'>
                <h2 className='text-lg font-semibold text-gray-700 capitalize '>
                    Place A Bid
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
                        <div>
                            <label className='text-gray-700 ' htmlFor='price'>
                                Price
                            </label>
                            <input
                                id='price'
                                type='text'
                                name='price'
                                required
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        <div>
                            <label className='text-gray-700 ' htmlFor='emailAddress'>
                                Email Address
                            </label>
                            <input
                                id='emailAddress'
                                type='email'
                                defaultValue={user?.email}
                                name='email'
                                disabled
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        <div>
                            <label className='text-gray-700 ' htmlFor='comment'>
                                Comment
                            </label>
                            <input
                                id='comment'
                                name='comment'
                                type='text'
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <label className='text-gray-700'>Deadline</label>

                            {/* Date Picker Input Field */}
                            <DatePicker
                                className='border p-2 rounded-md'
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                            />
                        </div>
                    </div>

                    <div className='flex justify-end mt-6'>
                        <button
                            type='submit'
                            className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
                        >
                            Place Bid
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default JobDetails;