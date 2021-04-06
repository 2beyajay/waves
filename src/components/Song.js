
function Song({ currentSong, isPlaying }) {
	return (
		<div className="song-container">
			<div className="song-cover">
				<img alt={currentSong.name} src={currentSong.cover} className={isPlaying ? 'rotating' : ''}></img>
			</div>
			<h2>{currentSong.name}</h2>
			<h3>{currentSong.artist}</h3>
		</div>
	)
}


export default Song;