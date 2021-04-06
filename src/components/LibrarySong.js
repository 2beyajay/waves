import { useState } from "react";

function LibrarySong({ song, songs, currentSong, setCurrentSong, audioRef, isPlaying, setIsPlaying, setSongs }) {

	// states
	const [hover, setHover] = useState(false);

	// handlers
	async function songSelectHandler() {
		await setCurrentSong(song);
		audioRef.current.play();

		// active song
		const newSongs = songs.map(sng => {
			if (song.id === sng.id) {
				return {
					...sng,
					active: true
				}
			} else {
				return {
					...sng,
					active: false
				}
			}
		})

		setSongs(newSongs)

		// check if the song is playing or paused
		// if (isPlaying) audioRef.current.play();

		audioRef.current.play();
		setIsPlaying(true)
	}

	function toggleHover(){
    setHover(!hover);
	}


	// changing the color for active and hovered songs
	let bg;

	if(song.active){
		bg = `${currentSong.color[1]}bf`;
	} else{
		if(hover){
			bg = `${currentSong.color[1]}50`;
		}
	}



	return (
		<div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}
			style={ {background: bg} }
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
		>

			<img alt={song.name} src={song.cover}></img>

			<div className="song-description">
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>

		</div>
	)
}


export default LibrarySong;