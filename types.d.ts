interface UnsplashPhoto {
    id: string;
    created_at: string;
    updated_at: string;
    promoted_at: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string;
    alt_description: string;
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
    };
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
    categories: Array<{
        id: string;
        title: string;
        color: string;
        description: string;
        slug: string;
        parent_id: string;
        featured_at: string;
    }>;
    likes: number;
    liked_by_user: boolean;
    current_user_collections: Array<{
        id: string;
        title: string;
        description: string;
        published_at: string;
        featured_at: string;
        curated_at: string;
        user: string;
        total_photos: number;
        private: boolean;
        share_key: string;
    }>;
    sponsorship: null;
    sponsored: boolean;
    sponsored_by_user: boolean;
    user: {
        id: string;
        updated_at: string;
        username: string;
        name: string;
        first_name: string;
        last_name: string;
        twitter_username: string;
        portfolio_url: string;
        bio: string;
        location: string;
        links: {
            self: string;
            html: string;
            photos: string;
            likes: string;
            portfolio: string;
            following: string;
            followers: string;
        };
        profile_image: {
            small: string;
            medium: string;
            large: string;
        };
        instagram_username: string;
        total_collections: number;
        total_likes: number;
        total_photos: number;
    };
    exif: {
        make: string;
        model: string;
        exposure_time: string;
        aperture: string;
        focal_length: string;
        iso: number;
    };
    location: {
        title: string;
        name: string;
        city: string;
        country: string;
        position: {
            latitude: number;
            longitude: number;
        };
    };
}