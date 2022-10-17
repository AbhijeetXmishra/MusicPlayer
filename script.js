console.log("welcome to spotyfy")

//Initialize Variables

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let listPlayBtn = Array.from(document.getElementsByClassName('songItemPlay'));

let masterSongName = document.getElementById('masterSongName');


let songs = [
    {songName: "warriyo-Maortals", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "Cielo-Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "DEAF KEV-Invincible", filePath: "songs/3.mp3", coverPath: "covers/cover3.jpg"},
    {songName: "Diffrent Heaven", filePath: "songs/4.mp3", coverPath: "covers/cover4.jpg"},
    {songName: "Janji-Heroes-Tonight", filePath: "songs/5.mp3", coverPath: "covers/cover5.jpg"},
    {songName: "ishq", filePath: "songs/6.mp3", coverPath: "covers/cover6.jpg"},
    {songName: "ishq-hvv", filePath: "songs/7.mp3", coverPath: "covers/cover7.jpg"}
]
// change songlist img and name throw array

songItems.forEach((element, i)=>{
    console.log(element, i);
    // change song img
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    // change song name
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    // change song Time Duration

    // element.getElementsByClassName("timestamp")[0].innerText = songs[i].audioElement.duration;
})

// Handle Play/Pause click
masterPlay.addEventListener('click', ()=>{
    console.log("clicked");
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Listen to Events

audioElement.addEventListener('timeupdate', ()=>{
    // console.log(parseInt((audioElement.currentTime/audioElement.duration)*100));

    // update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

// update song duration thow seekbar

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlay = () =>{
    listPlayBtn.forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

listPlayBtn.forEach((element)=>{
    element.addEventListener('click', (e)=>{
        
        makeAllPlay();

        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');


        songIndex = parseInt(e.target.id);

        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        gif.style.opacity = 1;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})



//next song

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >6){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    makeAllPlay();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause')
})

// previous

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    makeAllPlay();

    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause')
})
