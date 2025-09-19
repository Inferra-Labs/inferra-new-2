import React, { useState } from 'react';
import Card from './common/Card';
// FIX: Corrected import path.
import type { GalleryCategory } from '../types';
import Tooltip from './common/Tooltip';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface GalleryProps {
    galleryData: GalleryCategory[];
}

const Gallery: React.FC<GalleryProps> = ({ galleryData }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

    const openModal = (src: string) => {
        setSelectedImage(src);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const allImages = galleryData.flatMap(cat => cat.images);
    const displayedImages = activeCategory === 'All' 
        ? allImages
        : galleryData.find(cat => cat.name === activeCategory)?.images ?? [];

    return (
        <div 
          ref={ref} 
          className={`py-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-foreground/80 dark:from-dark-accent dark:to-dark-foreground/80">Our Gallery</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
                        A glimpse into our events, workshops, and community moments.
                    </p>
                </div>

                <div className="flex justify-center flex-wrap gap-2 mb-8">
                    <button onClick={() => setActiveCategory('All')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeCategory === 'All' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted dark:bg-dark-card dark:hover:bg-dark-muted'}`}>All</button>
                    {galleryData.map(cat => (
                         <button key={cat.id} onClick={() => setActiveCategory(cat.name)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeCategory === cat.name ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted dark:bg-dark-card dark:hover:bg-dark-muted'}`}>{cat.name}</button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedImages.map(image => (
                        <Card key={image.id} className="overflow-hidden p-0 group cursor-pointer" onClick={() => openModal(image.imageUrl)}>
                           <div className="relative">
                             <img src={image.imageUrl} alt={image.description} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                             <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg">{image.title}</h3>
                           </div>
                        </Card>
                    ))}
                </div>
            </div>

            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center animate-fade-in-up" style={{animationDuration: '0.3s'}}
                    onClick={closeModal}
                >
                    <div className="relative max-w-4xl max-h-[90vh] p-4" onClick={e => e.stopPropagation()}>
                        <img src={selectedImage} alt="Enlarged view" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                        <Tooltip text="Close" position="left">
                          <button 
                              onClick={closeModal}
                              className="absolute -top-2 -right-2 bg-background text-foreground dark:bg-dark-background dark:text-dark-foreground rounded-full h-8 w-8 flex items-center justify-center hover:scale-110 transition-transform"
                              aria-label="Close image viewer"
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </Tooltip>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
