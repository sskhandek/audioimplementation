import string
import json
import urllib.request
import time
import sys, os

def formatString(inString):
    formatOut = '';
    for c in inString:
        if c in string.ascii_lowercase or c in string.digits:
            formatOut += c
        elif c in string.ascii_uppercase:
            formatOut += c.lower()
    return formatOut;

def scrape(artist, song):
    reqArtist = formatString(artist)
    reqSong = formatString(song)
    reqURL = 'http://www.azlyrics.com/lyrics/' + reqArtist + '/' + reqSong + '.html'
    try:
        response = urllib.request.urlopen(reqURL)
    except urllib.error.HTTPError as e:
        if e.code == 404:
            print('Song not found')
        else:
            print('Error ' + e.code)
        return ''
    else:
        html = response.read().decode()
        startTag = '<!-- Usage of azlyrics.com content by any third-party lyrics provider is prohibited by our licensing agreement. Sorry about that. -->'
        endTag = '</div>'
        startIndex = html.find(startTag)
        endIndex = html.find(endTag, startIndex)
        if startIndex == -1 or endIndex == -1:
            print('Parsing error')
            return ''
        else:
            lyrics = html[startIndex + len(startTag) : endIndex].replace('<br>', '')
            return lyrics

# artist = input('Artist: ')
# song = input('Song: ')
# lyrics = scrape(artist, song)
# print(lyrics)

def main(infile):
    songs = []
    with open(infile) as f:
        for line in f:
            song = line.rstrip()
            print(song)
            artist = next(f).rstrip()
            lyrics = scrape(artist, song)
            if lyrics != '':
                songs.append({'song':song, 'artist':artist, 'lyrics':lyrics})
            time.sleep(2)
    print(songs)

    print(infile+'_v2.json')
    with open(infile+'_v2.json', 'w') as outfile:
        json.dump(songs, outfile, indent=4, separators=(',', ': '))

main(sys.argv[1])
