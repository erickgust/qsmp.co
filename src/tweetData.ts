import { type Tweet } from 'react-tweet/api'
import json from './tweets.json'

export const tweets = json as unknown as Tweet[]
