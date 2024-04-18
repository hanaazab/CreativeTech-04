document.getElementById('fetchTrack').addEventListener('click', async () => {
    const trackInfo = document.getElementById('trackInfo');
    const lyricsDiv = document.getElementById('lyrics');

    // Reset content
    trackInfo.innerHTML = '';
    lyricsDiv.innerHTML = '';

    try {
        const trackResponse = await fetch('/random-track');
        const track = await trackResponse.json();
        trackInfo.innerHTML = `<p><strong>${track.name}</strong> by ${track.artist.name}</p>`;

        const lyricsResponse = await fetch(`/lyrics?artist=${encodeURIComponent(track.artist.name)}&title=${encodeURIComponent(track.name)}`);
        if (lyricsResponse.ok) {
            const lyrics = await lyricsResponse.json();
            lyricsDiv.innerHTML = `<p>Lyrics: <a href="${lyrics.lyrics}" target="_blank">Click here to view lyrics on Genius</a></p>`;
        } else {
            lyricsDiv.textContent = 'Lyrics not found.';
        }
    } catch (error) {
        console.error('Failed to fetch data:', error);
        trackInfo.textContent = 'Failed to fetch data.';
        lyricsDiv.textContent = '';
    }
});

document.getElementById('analyzeLyrics').addEventListener('click', async () => {
    const lyricsInput = document.getElementById('lyricsInput').value;
    const analysisResultDiv = document.getElementById('analysisResult');

    // Reset analysis result
    analysisResultDiv.innerHTML = '';

    if (!lyricsInput.trim()) {
        analysisResultDiv.innerHTML = 'Please paste the lyrics into the text area.';
        return;
    }

    try {
        const response = await fetch('/analyze-sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: lyricsInput })
        });
        
        if (!response.ok) {
            throw new Error('Sentiment analysis failed');
        }
        
        const analysisResult = await response.json();
        const toxicityScore = analysisResult.attributeScores.TOXICITY.summaryScore.value;
        
        analysisResultDiv.innerHTML = `Toxicity score: ${toxicityScore}`;
        
    } catch (error) {
        console.error('Failed to analyze lyrics:', error);
        analysisResultDiv.textContent = 'Failed to analyze lyrics.';
    }
});
