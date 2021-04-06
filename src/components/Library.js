import LibrarySong from "./LibrarySong";

function Library({ songs, currentSong, setCurrentSong, audioRef, isPlaying, setIsPlaying, setSongs, libraryStatus }) {
	return (
		<div className={`library ${libraryStatus ? 'active-library' : ''}`}>
			<div className="library-songs">
				{songs.map(song =>
					<LibrarySong
						setSongs={setSongs}
						songs={songs}
						currentSong={currentSong}
						setCurrentSong={setCurrentSong}
						song={song}
						key={song.id}
						audioRef={audioRef}
						isPlaying={isPlaying}
						setIsPlaying={setIsPlaying}
					/>
				)}
			</div>
		</div>
	)
}


export default Library;