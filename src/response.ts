interface StreamResponse {
  data: {
    id: string,
    text: string,
    author_id: string,
    source: string,
    in_reply_to_user_id?: string,
    entities?: {
      mentions?: [
        username: string
      ]
    },
    referenced_tweets: [{
      type: string,
      id: string
    }]
  },
  includes: {
    users: [
      {
        id: string,
        name: string,
        username: string
      }
    ],
    tweets?: any[]
  }
  matching_rules: [
    {
      id: number, // WTF?
      tag: string
    }
  ]
}