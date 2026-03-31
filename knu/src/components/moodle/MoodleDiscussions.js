import React from 'react';
import { ContentSection, DiscussionThread, DiscussionContent, UserAvatar, DiscussionText } from './MoodleStyles';

const STATIC_POSTS = [
  { id: 's1', author: 'John Doe', avatar: 'JD', timestamp: '2 hours ago', message: "I found the Bitcoin case study fascinating! The way Satoshi designed the halving mechanism to create scarcity over time is brilliant. What do you think about the impact of halvings on Bitcoin's price cycles?" },
  { id: 's2', author: 'Alice Smith', avatar: 'AS', timestamp: '4 hours ago', message: 'The Terra collapse case study really opened my eyes to the risks of algorithmic stablecoins. The lesson here seems to be that any system promising guaranteed returns is inherently unsustainable. Thoughts?' },
  { id: 's3', author: 'Mike Johnson', avatar: 'MJ', timestamp: '1 day ago', message: "I'm working on the decision tree activity and I'm stuck on the governance attack scenario. What would you do if a whale acquired 30% of governance tokens? Implement guardrails, negotiate, or do nothing?" }
];

const MoodleDiscussions = ({ theme, discussionPosts, setDiscussionPosts, newPost, setNewPost }) => (
  <ContentSection theme={theme}>
    <h2>💬 Community Discussions</h2>
    <p>Participate in community discussions about tokenomics case studies and share your insights with fellow learners.</p>

    <div style={{ marginBottom: '25px' }}>
      <h4 style={{ color: theme === 'dark' ? '#63b3ed' : '#3182ce', marginBottom: '15px' }}>Add New Discussion Post</h4>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
        <textarea
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          placeholder="Share your thoughts on tokenomics case studies..."
          style={{ flex: 1, padding: '15px', borderRadius: '8px', border: `1px solid ${theme === 'dark' ? '#4a5568' : '#e2e8f0'}`, background: theme === 'dark' ? '#2d3748' : 'white', color: theme === 'dark' ? '#e2e8f0' : '#2d3748', minHeight: '80px', resize: 'vertical' }}
        />
        <button
          onClick={() => {
            if (newPost.trim()) {
              setDiscussionPosts([...discussionPosts, { id: Date.now(), author: 'You', timestamp: 'Just now', message: newPost, avatar: 'YO' }]);
              setNewPost('');
            }
          }}
          style={{ padding: '12px 25px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
        >
          Post
        </button>
      </div>
    </div>

    {discussionPosts.map(post => (
      <DiscussionThread key={post.id} theme={theme}>
        <DiscussionContent>
          <UserAvatar>{post.avatar}</UserAvatar>
          <DiscussionText theme={theme}>
            <div className="author">{post.author}</div>
            <div className="timestamp">{post.timestamp}</div>
            <div className="message">{post.message}</div>
          </DiscussionText>
        </DiscussionContent>
      </DiscussionThread>
    ))}

    {STATIC_POSTS.map(post => (
      <DiscussionThread key={post.id} theme={theme}>
        <DiscussionContent>
          <UserAvatar>{post.avatar}</UserAvatar>
          <DiscussionText theme={theme}>
            <div className="author">{post.author}</div>
            <div className="timestamp">{post.timestamp}</div>
            <div className="message">{post.message}</div>
          </DiscussionText>
        </DiscussionContent>
      </DiscussionThread>
    ))}
  </ContentSection>
);

export default MoodleDiscussions;
