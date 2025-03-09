"use client"
import { useEffect, useRef, useState } from 'react';
import * as React from 'react';


import { MdPlayArrow } from "react-icons/md";
import { MdPause } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import SongCard from './components/SongCard';



export default function MediaControlCard() {
  const ref = useRef();
  const [queryData, setQueryData] = useState()
  const [loading, setLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const [currentSong, setCurrentSong] = useState({
    name: 'SongTitle',
    singer: 'Singer',
    image: 'https://jammybeatz.beatstars.com/tpl/assets/img/placeholders/track-placeholder.svg'

  })

  const fetchSearchRes = async (query) => {
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
              loadSetter={setLoading}
              currentSongSetter={setCurrentSong}
            />
          ))}


      </div>

      <footer className='flex fixed bottom-0 w-full justify-center items-center'>

        <div className='flex items-center justify-center w-full h-[60px] sm:h-[100px] gap-[15px] text-white bg-[#1E1E1E] absolute bottom-0'>
          <div className='w-[50px] sm:w-[80px]'>
            <img className='rounded-[10px]' src={currentSong.image} alt="" />
          </div>
          <div className='w-[20%]'>
            <p className='text-sm sm:text-xl font-bold w-full truncate '>{currentSong.name}</p>
            <p className='text-xs sm:text-sm'>{currentSong.singer}</p>
          </div>

          <div className='flex gap-[10px] ml-[20px]'>
            <div className='w-7 h-7 sm:w-10 sm:h-10 bg-[#313131] transition duration-300 rounded-[50%] flex justify-center items-center hover:bg-[grey] active:bg-[grey]'>
              <MdSkipPrevious size={35} />
            </div>

            <div className='w-7 h-7 sm:w-10 sm:h-10 bg-[#313131] transition duration-300 rounded-[50%] flex justify-center items-center hover:bg-[grey] active:bg-[grey]'>
            {loading == true ? 

              <div role="status">
                <svg aria-hidden="true" className="w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
             : 
            (
              isPlaying ? <MdPause size={35} /> : <MdPlayArrow size={35} />
            )
             
             }

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
