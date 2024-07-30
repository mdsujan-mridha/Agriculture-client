
import React, { Fragment } from 'react';
import aboutImage from "../images/about/apple-1122537_1280.jpg";
import missionImg from "../images/about/apples-1872997_1280.jpg";
import vissionImg from "../images/about/wheat-2391348_1280.jpg";



const Aboutus = () => {

    const aboutUsData = [
        {
            _id: 1,
            title: "Mission",
            image: missionImg,
            description: " ফার্মিং এসিস্ট্যান্ট এর মিশন হলো কৃষি সেক্টরে প্রযুক্তিগত উন্নতি এবং সামাজিক সমৃদ্ধির পথে একটি পরিবর্তন নির্মাণ করা। এর মূল লক্ষ্য হলো কৃষকদের প্রযুক্তিগত সম্প্রসারণ এবং সমৃদ্ধ প্রশিক্ষণ প্রদান করে তাদের কাজের দক্ষতা ও আয় বৃদ্ধি করা। এটি প্রযুক্তিগত সমাধান প্রয়োগ করে কৃষি উন্নতি এবং সামাজিক উন্নতিতে অবদান রাখে। ফার্মিং এসিস্ট্যান্ট এর মিশন সামাজিক উন্নতি, কৃষি বাস্তবায়ন, বাণিজ্যিক সহযোগিতা ও পরিবেশের সংরক্ষণে গুরুত্ব দেয়। এটি বিশেষভাবে কৃষিবিষয়ক তথ্য প্রযুক্তিতে ভরসা এবং একটি প্রযুক্তিগত কৃষি সেক্টর সৃষ্টি করার উদ্দেশ্যে ডিজিটাল প্ল্যাটফর্ম প্রদান করে। "

        },
        {
            _id: 2,
            title: "Vision",
            image: vissionImg,
            description: " ফার্মিং এসিস্ট্যান্ট এর ভিশন হলো কৃষি সেক্টরে প্রযুক্তিগত সমৃদ্ধি এবং সামাজিক উন্নতি উভয়ই সাধন করা। এটি প্রযুক্তিগত সমাধান প্রয়োগ করে কৃষকদের জন্য উন্নত পরিচালনা এবং সহায়তা সরবরাহ করে যাতে তারা প্রফিটযোগ্য, উন্নত এবং সামর্থ্যশীল প্রকৃতি বিশেষজ্ঞতা অর্জন করতে পারেন। এটি সামাজিক উন্নতির দিকেও লক্ষ্য করে, যেখানে কৃষকদের আর্থিক ও সামাজিক স্থিতিশীলতা উন্নতি করে তাদের জীবনমান ও জীবনযাত্রা উন্নত হয়। ফার্মিং এসিস্ট্যান্ট এর ভিশন হলো একটি সমৃদ্ধ এবং সামর্থ্যশীল কৃষি সেক্টর যেখানে প্রযুক্তিগত উন্নতি এবং সামাজিক উন্নতি সমন্বয়ে একটি বিশেষজ্ঞতা প্রদান করে।"
        }
    ]

    return (
        <Fragment>
            <div className='px-12 min-h-screen'>
                <h1 className='text-5xl font-bold text-center border-b-2 py-10 text-white'>  About us </h1>
                <div className='w-1/2 mx-auto'>
                    <p className='text-center text-2xl pt-9 font-bold text-white'>
                        ফার্মিং এসিস্ট্যান্ট হলো একটি ডিজিটাল প্ল্যাটফর্ম যা কৃষকদের কৃষি কর্মকাণ্ড সহায়তা এবং প্রশিক্ষণ প্রদানের উদ্দেশ্যে তৈরি করা হয়েছে। এটি কৃষি সেক্টরের উন্নতির মাধ্যমে কৃষকদের প্রযুক্তিগত সম্প্রসারণ এবং জীবিকা উন্নতির লক্ষ্যে তৈরি করা হয়েছে। ফার্মিং এসিস্ট্যান্টে কৃষকরা প্রযুক্তিগত সমাধান এবং তথ্য প্রযুক্তির সাথে পরিচিত হয়ে তাদের কৃষি কাজে সহায়তা পেতে পারেন। এটি পাওয়া যায় মোবাইল অ্যাপ্লিকেশন হিসেবে এবং তথ্য প্রযুক্তির সাথে যোগাযোগ করে কৃষকদের কৃষি উন্নতি এবং সহজলভ্য প্রশিক্ষণ প্রদান করে। ফার্মিং এসিস্ট্যান্টের মাধ্যমে কৃষকরা প্রযুক্তিগত উন্নতি এবং সামাজিক উন্নতি উভয়েই সহজ ও অনুকূল।
                    </p>
                </div>
                <div className='w-1/2 mx-auto'>
                    <img className='rounded-xl py-10' src={aboutImage} alt="about us" />
                </div>
                <div className='flex gap-10 flex-col'>
                    {
                        aboutUsData.map((data, index) => (
                            <div className={`flex gap-5 justify-center items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`} key={data._id}>
                                <img className='w-1/2' src={data.image} alt="about us" />
                                <div className='w-1/2'>
                                    <h1 className='text-5xl font-bold border-b-2 py-3 text-white'> {data.title} </h1>
                                    <p className='text-xl font-bold pt-3 text-white'> {data.description} </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default Aboutus;