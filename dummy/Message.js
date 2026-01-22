import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
export function Message()
{
   return(
     < >
     <div className="bg-white h-[60vh]  w-6xl mx-auto my-32 rounded-xl flex ">
      <div className="space-y-5 mx-20 pt-7 justify-center  ">
        <div className=" gap-3">
       <a href="" className="" >< FaMapMarkerAlt /></a>
         <h1 className="text-2xl font-bold" >Address</h1>
          <p>sukhendra nagar db</p>
          <p>birendra nagar db6</p>
        </div>
        <div>
           <a href="" className=""><FaPhone /></a>
          <h1  className="text-2xl font-bold" >Phone</h1>
          <p>📱 +91 98765 43210</p>
          <p>📱 +91 89886 93457</p>
        </div>
        <div>
           <a href="" ><FaEnvelope/></a>
          <h1  className="text-2xl font-bold" >Email</h1>
          <p>vermarishika@gmail.com</p>
          <p>infocodinglab@gmail.com</p>
        </div>
      </div>
      <div className="mt-6 mr-6 ml-5 p-5">
        <h1  className="text-2xl font-bold" >Send us a Message</h1>
        <p>Thank you for reaching out! We’ve received your message and will get back to you as soon as possible.
Your inquiry means a lot to us — we’ll make sure you get the help you need.</p>
      <div className="grid-cols-1 ">
         <label className="flex flex-col text-gray-700 font-medium">
    Email
    <input
      type="email"
      placeholder="Enter your email"
      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </label>

  <label className="flex flex-col text-gray-700 font-medium">
    Phone
    <input
      type="tel"
      placeholder="Enter your phone number"
      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </label>
  <label className="flex flex-col text-gray-700 font-medium">
      Message
      <textarea
        placeholder="Enter your message here..."
        className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-32"
      />
    </label>
      </div>
      </div>
     </div>
     </>
   )
}