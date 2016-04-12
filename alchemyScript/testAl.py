import os, sys, string, time, re
import requests, json, urllib, urllib2, base64

def main():
    keysToConcept = ""
    tweet={}
    tweet['text'] = '''When I was ten years old
I remember thinking how cool it would be
When we were going on an eight-hour drive
If I could just watch TV
And I'd have given anything
To have my own Pac-Man game at home
I used to have to get a ride down to the arcade
Now I've got it on my phone

Hey, glory, glory, hallelujah
Welcome to the future

My grandpa was in World War 2
He fought against the Japanese
He wrote a hundred letters to my grandma
Mailed them from his base in the Philippines
I wish they could see this now
The world they saved has changed you know
'Cause I was on a video chat this morning
With a company in Tokyo

Hey, everyday's a revolution
Welcome to the future

Hey, look around it's all so clear
Hey, wherever we were going, well we're here
Hey, so many things I never thought I'd see
Happening right in front of me

I had a friend in school
Running back on the football team
They burned a cross in his front yard
For asking out the homecoming queen
I thought about him today
And everybody who'd seen what he'd seen
From a woman on a bus
To a man with a dream

Hey, wake up Martin Luther
Welcome to the future
Hey, glory, glory, hallelujah
Welcome to the future '''
    # Base AlchemyAPI URL for targeted sentiment call
    alchemy_url = "http://access.alchemyapi.com/calls/text/TextGetRankedKeywords"
    
    parameters = {
        "apikey" : '55d3757115b17f54e943893bd426c332f588dec5',
        "text"   : tweet['text'],
        "maxRetrieve" : 50,
        "sentiment" : 1,
        "outputMode" : "json",
        "showSourceText" : 1
        }   

    try:
        results = requests.get(url=alchemy_url, params=urllib.urlencode(parameters))
        response = results.json()

    except Exception as e:
        print "Error"
        return

    try:
        if 'OK' != response['status'] or 'keywords' not in response:
            print "Problem"
            print response
            print "HTTP Status:", results.status_code, results.reason
            print "--"
            return
        for i in response["keywords"]:
            keysToConcept += i['text'] + " "
            label = i['text']
            tweet[label] = {}
            tweet[label]['sentiment'] = i['sentiment']['type']
            tweet[label]['score'] =0.
            if tweet[label]['sentiment'] in ('positive', 'negative'):
                tweet[label]['score'] = float(i['sentiment']['score'])
            # print label
            # print tweet[label]['sentiment']
            # print tweet[label]['score']
    except Exception as e:
        print "Error"



    alchemy_url = "http://access.alchemyapi.com/calls/text/TextGetRankedConcepts"
    parameters = {
        "apikey" : '55d3757115b17f54e943893bd426c332f588dec5',
        "text"   : keysToConcept,
        "maxRetrieve" : 5,
        "outputMode" : "json",
        "showSourceText" : 1
        }
    try:
        results = requests.get(url=alchemy_url, params=urllib.urlencode(parameters))
        response = results.json()

    except Exception as e:
        print "Error"
        return

    try:
        if 'OK' != response['status'] or 'concepts' not in response:
            print "Problem"
            print response
            print "HTTP Status:", results.status_code, results.reason
            print "--"
            return
        for i in response["concepts"]:
            print i['text']
            print i['relevance']
    except Exception as e:
        print "Error"
    return
    # return
    # except Exception as e:
    #     print "D'oh! There was an error enriching"
    #     print "Error:", e
    #     print "Request:", results.url
    #     print "Response:", response    
    # Parameter list, containing the data to be enriched
    # parameters = {
    #     "apikey" : '55d3757115b17f54e943893bd426c332f588dec5',
    #     "text"   : tweet['text'],
    #     "targets" : "Genie|Airplanes",
    #     "outputMode" : "json",
    #     "showSourceText" : 1
    #     }

    # try:

    #     results = requests.get(url=alchemy_url, params=urllib.urlencode(parameters))
    #     response = results.json()

    # except Exception as e:
    #     print "Error"
    #     return

    # try:
    #     if 'OK' != response['status'] or 'results' not in response:
    #         print "Problem finding 'docSentiment' in HTTP response from AlchemyAPI"
    #         print response
    #         print "HTTP Status:", results.status_code, results.reason
    #         print "--"
    #         return
    #     for i in response["results"]:
    #         tweet['label'] = {}
    #         tweet['label']['sentiment'] = i['']
    #         tweet['label']['score'] =0.
    #         if tweet['label']['sentiment'] in ('positive', 'negative'):
    #             tweet['label']['score'] = float(response['docSentiment']['score'])
    #         print tweet['label']['sentiment']
    #         print tweet['label']['sentiment']
    #         print tweet['label']['score']

    # except Exception as e:
    #     print "D'oh! There was an error enriching"
    #     print "Error:", e
    #     print "Request:", results.url
    #     print "Response:", response
    # return
main()