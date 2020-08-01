export interface PlaylistInterface {
    name: string;
    owner: Owner;
    images: Image[]
    description: string;
    external_urls: ExternalURL;
}

interface Owner {
    display_name: string;
}

interface ExternalURL {
    spotify: string;
}

interface Image{
    url: string
}
