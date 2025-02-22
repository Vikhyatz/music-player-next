"use client"
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { CardActionArea } from '@mui/material';

export default function MediaControlCard() {
  const theme = useTheme();

  return (
    <>
      <div className='w-full h-[100vh] flex justify-center items-center flex-col gap-10'>


        <Card sx={{backgroundColor: '#1E1E1E'}}>
          <CardActionArea sx={{ display: 'flex', width: "fit-content", flexDirection: "column" }}>
            <CardMedia
              component="img"
              sx={{ width: '100%' }}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyL8vrteKi4iLkwUzY8gXOBtvG7x5IA0Yn4Q&s"
              alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5" sx={{color: 'white'}}>
                  Live From Space
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: 'text.secondary' , color: 'white'}}
                >
                  Mac Miller
                </Typography>
              </CardContent>

            </Box>

          </CardActionArea>
        </Card>
        <footer className='flex absolute bottom-0 w-full justify-center items-center'>

          <Card sx={{ display: 'flex', width: "100%", justifyContent: 'center', backgroundColor: '#1E1E1E', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h6" sx={{color: 'white'}}>
                  Live From Space
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: 'text.secondary', color: 'white' }}
                >
                  Mac Miller
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="previous" sx={{color: 'white'}}>
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause" sx={{color: 'white'}}>
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next" sx={{color: 'white'}}>
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </Box>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 70, height: 70 , borderRadius: '10px'}}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyL8vrteKi4iLkwUzY8gXOBtvG7x5IA0Yn4Q&s"
              alt="Live from space album cover"
            />
          </Card>
        </footer>

      </div>
    </>
  );
}
