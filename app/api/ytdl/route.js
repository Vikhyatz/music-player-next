import ytdl from "@distube/ytdl-core";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id")
    console.log("hello there", id)

    const videoUrl = `https://www.youtube.com/watch?v=${id}`

    // ytdl.getInfo(videoUrl).then(info => {
    //     const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });
    //     console.log('Direct Audio URL:', audioFormat.url);
    // }).catch(err => console.error('Error:', err));
    
    // return new Response(JSON.stringify({ audioLink: 'audio'}), { status: 200 })
    
    try {
        // Fetch video info from YouTube using ytdl-core
        const info = await ytdl.getInfo(videoUrl);
        
        // Choose the audio-only format
        const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });

        // Return the audio URL in the response
        return new Response(
            JSON.stringify({ audioLink: audioFormat.url }), 
            { status: 200 }
        );
    } catch (err) {
        // Handle errors and send a response
        console.error('Error:', err);
        return new Response(
            JSON.stringify({ error: 'Failed to retrieve audio URL' }), 
            { status: 500 }
        );
    }


}