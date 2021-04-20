interface StreamResponse {
  data: {
    id: string,
    text: string,
    author_id: string
  },
  includes: {
    users: [
      {
        id: string,
        name: string,
        username: string
      }
    ]
  }
  matching_rules: [
    {
      id: number, // WTF?
      tag: string
    }
  ]
}