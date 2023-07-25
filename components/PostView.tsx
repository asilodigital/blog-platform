import { PostItems } from '@components/PostItems'
import { PostItemsBranded } from '@components/PostItemsBranded'
import { GhostPostsOrPages, GhostSettings } from '@lib/ghost'

interface PostViewProps {
  settings: GhostSettings
  posts: GhostPostsOrPages
  isHome?: boolean
}

export const PostView = (props: PostViewProps) => (
  <div className="inner posts">
    <div className="post-feed">
      <PostItemsBranded {...props} />
      <PostItems {...props} />
    </div>
  </div>
)
