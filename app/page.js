"use client"
import { useEffect, useRef, useState } from 'react';
import * as React from 'react';


import { MdPlayArrow } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import SongCard from './components/SongCard';



export default function MediaControlCard() {
  const ref = useRef();
  const [queryData, setQueryData] = useState()

  const fetchSearchRes = async (query) => {
    // console.log(query)
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&videoCategoryId=10`)
    const data = await response.json()
    console.log(data.items)
    setQueryData(data.items)
  }

  useEffect(() => {
    console.log("re-render please")
  }, [queryData])

  


  return (
    <>
      <div className='h-[100px] flex justify-center items-center'>

        <form className='w-full h-[100px] flex justify-center items-center' onSubmit={(e) => { e.preventDefault(); fetchSearchRes(ref.current.value) }}>
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-[80%] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
            name="text"
            placeholder="Enter song name"
            type="text"
            ref={ref}
          />
        </form>

      </div>

      <div className='w-full flex flex-col items-center justify-center gap-5 sm:gap-10 m-w-[100%]'>

        {queryData && queryData.length === 0 ? "No results found" :
          queryData?.map((elem, index) => (
            <SongCard
              title={elem.snippet.title}
              key={index}
              image={elem.snippet.thumbnails.high.url}
              channelTitle={elem.snippet.channelTitle}
              // onClick={()=>{console.log("hello")}}
              videoId={elem.id.videoId}
            />
          ))}


      </div>

      <footer className='flex fixed bottom-0 w-full justify-center items-center'>

        <div className='flex items-center justify-center w-full h-[60px] sm:h-[100px] gap-[15px] text-white bg-[#1E1E1E] absolute bottom-0'>
          <div className='w-[50px] sm:w-[80px]'>
            <img className='rounded-[10px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyL8vrteKi4iLkwUzY8gXOBtvG7x5IA0Yn4Q&s" alt="" />
          </div>
          <div>
            <p className='text-sm sm:text-xl font-bold'>Live from space</p>
            <p className='text-xs sm:text-sm'>Mac Miller</p>
          </div>

          <div className='flex gap-[10px] ml-[20px]'>
            <div className='w-7 h-7 sm:w-10 sm:h-10 bg-[#313131] transition duration-300 rounded-[50%] flex justify-center items-center hover:bg-[grey] active:bg-[grey]'>
              <MdSkipPrevious size={35} />
            </div>

            <div className='w-7 h-7 sm:w-10 sm:h-10 bg-[#313131] transition duration-300 rounded-[50%] flex justify-center items-center hover:bg-[grey] active:bg-[grey]'>
              <MdPlayArrow size={35} />
            </div>

            <div className='w-7 h-7 sm:w-10 sm:h-10 bg-[#313131] transition duration-300 rounded-[50%] flex justify-center items-center hover:bg-[grey] active:bg-[grey]'>
              <MdSkipNext size={35} />
            </div>
          </div>

        </div>
      </footer>

    </>
  );
}
