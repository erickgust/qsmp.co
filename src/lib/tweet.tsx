import { getTweet } from 'react-tweet/api'
import {
  TweetContainer,
  TweetHeader,
  TweetInReplyTo,
  TweetBody,
  TweetMedia,
  TweetInfo,
  TweetNotFound,
  QuotedTweet,
  enrichTweet,
} from 'react-tweet'

export async function Tweet({ id }: { id: string }) {
  const data = await getTweet(id).catch(console.error)
  if (!data) return <TweetNotFound />

  const tweet = enrichTweet(data)

  return (
    <TweetContainer>
      <TweetHeader tweet={tweet} />
      {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
      <TweetBody tweet={tweet} />
      {tweet.mediaDetails?.length ? <TweetMedia tweet={tweet} /> : null}
      {tweet.quoted_tweet && <QuotedTweet tweet={tweet.quoted_tweet} />}
      <TweetInfo tweet={tweet} />
    </TweetContainer>
  )
}
