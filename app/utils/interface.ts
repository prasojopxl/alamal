export interface iLang {
    id: number,
    title: string,
    image: string
}

export interface iItem {
    id: number | string,
    title: string,
    url?: string,
    image?: string,
    imageHover?: string,
    description?: string,
    color?: string

}

export interface iResponse {
    id: number;
    attributes: {
        name?: string;
        description?: string;
        position?: string;
        category?: string;
        slug?: string;
        localizations?: {
            data: {
                attributes: {
                    name: string;
                    description: string;
                    position: string;
                };
            }[];
        };
        image?: {
            data?: {
                attributes: {
                    url: string;
                };
            };
        };
    };
}