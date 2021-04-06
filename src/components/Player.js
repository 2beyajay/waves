import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause, faStepForward, faStepBackward } from "@fortawesome/free-solid-svg-icons";


function Player({ currentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, songs, setCurrentSong, setSongs, animationPercentage }) {

	// function to format the time string
	function getTime(time) {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		)
	}

	// event handlers
	function playSongHandler() {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying)
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying)
		}
	}

	function draghandler(e) {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value })
	}

	async function skipTrackHandler(direction) {
		let currentIndex = songs.findIndex(sng => sng.id === currentSong.id)

		if (direction === 'skip-back') {
			await setCurrentSong(songs[currentIndex === 0 ? (songs.length - 1) : (currentIndex - 1)]);
			if (isPlaying) audioRef.current.play();
			activeLibraryHandler(songs[currentIndex === 0 ? (songs.length - 1) : (currentIndex - 1)])
			return;
		}

		await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		activeLibraryHandler(songs[(currentIndex + 1) % songs.length])

		if (isPlaying) audioRef.current.play();
	}

	function activeLibraryHandler(nextPrev){
		const newSongs = songs.map(song => {
			if (song.id === nextPrev.id) {
				return {
					...song,
					active: true
				}
			} else {
				return {
					...song,
					active: false
				}
			}
		})
		setSongs(newSongs)
	}


	// add the styles
	const trackAnim = {
		transform: `translateX(${songInfo.animationPercentage}%)`,
		transition: "0.5s all ease"
	}

	return (
		<div className="player">

			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<div style={{ background: `linear-gradient(to right, ${currentSong.color[1]}, ${currentSong.color[0]})` }} className="track">
					<input
						onChange={draghandler}
						min={0}
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						type="range"
					/>
					<div style={trackAnim} className="animate-track"></div>
				</div>
				<p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
			</div>

			<div className="play-control">
				<FontAwesomeIcon
					onClick={() => skipTrackHandler('skip-back')}
					className="skip-back"
					icon={faStepBackward}
					size="2x"
				/>
				<FontAwesomeIcon
					className="play"
					icon={isPlaying ? faPause : faPlay}
					size="2x"
					onClick={playSongHandler}
				/>
				<FontAwesomeIcon
					className="skip-forward"
					icon={faStepForward}
					size="2x"
					onClick={() => skipTrackHandler('skip-forward')}
				/>

			</div>
		</div>
	)
}


export default Player;