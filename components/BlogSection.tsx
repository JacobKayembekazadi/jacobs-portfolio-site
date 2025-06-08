import React from 'react';
import { BLOG_POSTS_DATA, CARD_BG_COLOR, TEXT_COLOR_HEADLINE, TEXT_COLOR_MUTED, ACCENT_COLOR_PRIMARY } from '../constants';
import { BlogPost } from '../types';
import { ArrowRightIcon } from './icons/InterfaceIcons';

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <div className={`${CARD_BG_COLOR} rounded-2xl overflow-hidden shadow-xl group border border-gray-800 hover:border-${ACCENT_COLOR_PRIMARY}/70 transition-all duration-300 flex flex-col transform hover:-translate-y-1 hover:shadow-${ACCENT_COLOR_PRIMARY}/20`}>
      <div className="relative h-60 w-full overflow-hidden bg-gray-900">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-6 md:p-8 flex-grow flex flex-col">
        <p className={`text-sm ${TEXT_COLOR_MUTED} mb-2`}>{post.date}</p>
        <h3 className={`text-xl font-bold ${TEXT_COLOR_HEADLINE} mb-3 group-hover:text-${ACCENT_COLOR_PRIMARY} transition-colors`}>{post.title}</h3>
        <p className={`${TEXT_COLOR_MUTED} text-sm mb-6 flex-grow`}>{post.summary}</p>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto inline-flex items-center font-medium text-${ACCENT_COLOR_PRIMARY} hover:text-opacity-80 transition-colors`}
        >
          Read more <ArrowRightIcon className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
};

const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold ${TEXT_COLOR_HEADLINE} mb-4`}>Latest Articles</h2>
          <p className={`${TEXT_COLOR_MUTED} text-lg max-w-2xl`}>
            Insights and thoughts on AI, digital transformation, and creative processes.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {BLOG_POSTS_DATA.map((post: BlogPost) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
        {/* Optional: View More Articles button, like Athos */}
        {/* <div className="text-center mt-16">
            <a href="#" className={`inline-flex items-center px-6 py-3 border border-gray-700 rounded-full hover:bg-gray-800 transition font-medium ${TEXT_COLOR_LIGHT}`}>
                View More Articles
            </a>
        </div> */}
      </div>
    </section>
  );
};

export default BlogSection;