import React from 'react';
// FIX: Corrected import path.
import { KnowledgeHubPost } from '../types';
import Card from './common/Card';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface KnowledgeHubProps {
  posts: KnowledgeHubPost[];
}

const KnowledgeHub: React.FC<KnowledgeHubProps> = ({ posts }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div 
      ref={ref} 
      className={`py-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-foreground/80 dark:from-dark-accent dark:to-dark-foreground/80">Knowledge Hub</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            Insights, tutorials, and stories from the Inferra Labs community.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Card key={post.title} className="overflow-hidden p-0">
              <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <span>{post.date}</span>
                  <span className="mx-2">&bull;</span>
                  <span>{post.author}</span>
                </div>
                <h3 className="text-xl font-semibold text-card-foreground dark:text-dark-card-foreground">{post.title}</h3>
                <div className="flex flex-wrap gap-2 my-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold bg-accent/10 text-accent dark:bg-dark-accent/20 dark:text-dark-accent-foreground px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent dark:text-dark-accent hover:opacity-80 transition-opacity duration-300 flex items-center">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
