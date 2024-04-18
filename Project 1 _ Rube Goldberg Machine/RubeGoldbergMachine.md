# Project 1 Week 1: API's of Interest

I am hoping to capture/analyze the current messaging of music and by proxy the cultural zeitgeist through the billboard hot 100 chart. Through using Billboard RapidKey API, Genius API (music lyrics & information), and Perspective API (NLP API which returns the probability if a text is toxic) I feel as though I can collect data from different time periods. I am going to start with analyzing the Billboard 100, top 10 songs and then hpe to expand to a custom query which I can sort through billboard data over the years and approximately understand how cultural messaging has evolved or disentegrated over time. 

# Diagram 
![API Chain Diagram](https://github.com/hanaazab/CreativeTech-04/blob/main/Project%201%20_%20Rube%20Goldberg%20Machine/API%20Chain.png)

# Project 1 Week 2: Execution of API Chain 

Initial attempts to use the RAPID API Key for Billboard failed me; Billboard data can only be used through web scraping. Due to this, I changed my first API request to Last.fm to get top tracks charting globally. This offered me a random assortment of titles, artist names, which could then be parsed through Genius Lyrics. 

![Cultural Litmus](https://github.com/hanaazab/CreativeTech-04/blob/main/Project%201%20_%20Rube%20Goldberg%20Machine/CulturalLitmus_LastFM_Genius.png)

Genius would not provide the lyrics directly, only offering a URL due to copyright restrictions. For the next week I had a decision ahead of me, I could either implement a manual input for users to copy lyrics generated from Genius and recieve a sentiment analysis from Perspective API, or alter the chain entirely. 

# Project Week 3: Documentation 
Initially I had issues with Google Console, deciding whether to install the google-auth library or use the Perspective API key directly, due to the negligence of the API key, I recieved errors/failure to analyze lyrics. However, I quickly changed it and was able to recieve a toxixity rating for the tracks generated. 
![Cultural Litmus_Failed](https://github.com/hanaazab/CreativeTech-04/blob/main/Project%201%20_%20Rube%20Goldberg%20Machine/CulturalLitmus_Perspective_Failed.png)

![Cultural Litmus Toxicity 00](https://github.com/hanaazab/CreativeTech-04/blob/main/Project%201%20_%20Rube%20Goldberg%20Machine/CulturalLitmus_Perspective_Toxicity.png)
![Cultural Litmus Toxicity 01](https://github.com/hanaazab/CreativeTech-04/blob/main/Project%201%20_%20Rube%20Goldberg%20Machine/CulturalLitmus_Perspective_Toxicity_00.png)
![Cultural Litmus Toxicity 02](https://github.com/hanaazab/CreativeTech-04/blob/main/Project%201%20_%20Rube%20Goldberg%20Machine/CulturalLitmus_Perspective_Toxicity_01.png)


