import { MdOutlinePlaylistAdd } from "react-icons/md";
import React from 'react'

const SongCard = ({ title, image, channelTitle, videoId, loadSetter, currentSongSetter }) => {


  const playSong = async (id) => {
    loadSetter(true)
    try{
      const response = await fetch(`api/ytdl?id=${id}`)
      console.log("hello bhaiii", id)
      const data = await response.json();
      console.log(data)
      let aud = new Audio(data.audioLink)
      currentSongSetter({name: title,singer: channelTitle,image:  image})
      aud.play();

    }catch(error){
      console.log(error);
    }finally{
      loadSetter(false)
    }
  }


  return (
    // <div className='w-[300px] bg-[#292828] flex justify-center items-center flex-row text-white'>
    //   <div className='w-[80%]'>
    //     <img className='rounded-[3px]' src={image} alt="" />
    //   </div>
    //   <div className='w-[300px]'>
    //     <p className='text-1xl text-[white]'>{title}</p>
    //     <p>{channelTitle}</p>
    //   </div>
    // </div>

    <div onClick={()=>{playSong(videoId)}} className = 'w-[80%] sm:w-[900px] h-[60px] sm:h-[100px] bg-[#2f2f2f] transition cursor-pointer duration-150 hover:bg-[#191818] rounded-[10px] flex justify-between items-center flex-row text-white' >
      <div className='flex items-center ml-[10px] gap-[20px]'>
        <img className='rounded-[10px] h-[50px] sm:h-[90px]' src={image} alt="" />
        <div className='w-[150px] sm:w-[300px] overflow-hidden'>
          <p className='text-sm sm:text-xl text-[white] font-bold truncate'>{title}</p>
          <p>{channelTitle}</p>
        </div>
      </div>

      <div className='w-7 h-7 sm:w-12 sm:h-12 bg-[#313131] transition duration-300 rounded-[50%] flex justify-center items-center hover:bg-[grey] active:bg-[grey] mr-[20px]'>
        <MdOutlinePlaylistAdd size={35} />
      </div>
    </div >
  )
}

export default SongCard