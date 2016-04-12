import sys, os
import json
# import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
sid = SentimentIntensityAnalyzer()

def getSentiment(jsonfile):
  songs = []
  with open(jsonfile) as jfile:
    data = json.load(jfile)
    for song in data:
      sentiment = sid.polarity_scores(song['lyrics'])['compound']
      song['sentiment'] = sentiment
      songs.append(song)

  with open(jsonfile + '.sentiment.json', 'w') as outfile:
    json.dump(songs, outfile, indent=4, separators=(',', ': '))

getSentiment(sys.argv[1])