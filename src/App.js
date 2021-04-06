import { useState, useRef } from 'react'
// adding components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";


// adding util
import data from './data'

// adding styles
import "./styles/app.scss";


function App() {

	// refs
	const audioRef = useRef(null);


	// states
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
		animationPercentage: 0
	})
	const [libraryStatus, setLibraryStatus] = useState(false)


	// handlers
	function timeUpdateHandler(e) {
		const current = e.target.currentTime
		const duration = e.target.duration;

		// calculate percentage
		const roundedCurrent = Math.round(current);
		const roundedDuration = Math.round(duration);
		const animation = Math.round((roundedCurrent / roundedDuration) * 100)


		setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage: animation })
	}

	async function songEndHandler() {
		let currentIndex = songs.findIndex(sng => sng.id === currentSong.id)

		await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

		if (isPlaying) audioRef.current.play();
	}

	// style
	let myStyle = {
		background: `linear-gradient(120deg, ${currentSong.color[0]}, ${currentSong.color[1]})`
	}


	return (
		<div className={`App ${libraryStatus ? 'library-active' : ''}`} style={myStyle}>
			<Nav
				libraryStatus={libraryStatus}
				setLibraryStatus={setLibraryStatus}
			/>

			<Song currentSong={currentSong} isPlaying={isPlaying} />

			<Player
				setSongs={setSongs}
				setCurrentSong={setCurrentSong}
				songs={songs}
				audioRef={audioRef}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				setSongInfo={setSongInfo}
				songInfo={songInfo}
			/>

			<Library
				libraryStatus={libraryStatus}
				setSongs={setSongs}
				isPlaying={isPlaying}
				audioRef={audioRef}
				songs={songs}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				setIsPlaying={setIsPlaying}
			/>
			<audio
				onEnded={songEndHandler}
				onLoadedMetadata={timeUpdateHandler}
				onTimeUpdate={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}>
			</audio>
		</div>
	);
}

export default App;
