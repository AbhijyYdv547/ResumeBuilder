interface ScoreProps {
    profileData: {
        name: string;
        bio: string;
        followers: number;
        following: number;
        publicRepos: number;
        createdAt: string;
        lastUpdated: string;
        totalStars: number;
        languages: Set<unknown>;

    }
}

export const genScorePrompt = ({ profileData }: ScoreProps): string => {
    const languages = Array.from(profileData.languages).join(", ")

    const scorePrompt = `
        Based on this GitHub profile data, give a score out of 10 for enthusiasm, OSS involvement, and quality:

        Name: ${profileData.name}
        Bio: ${profileData.bio}
        Followers: ${profileData.followers}
        Following: ${profileData.following}
        Public Repos: ${profileData.publicRepos}
        Total Stars: ${profileData.totalStars}
        Languages: ${languages}
        Account Created: ${profileData.createdAt}
        Last Active: ${profileData.lastUpdated}

        Only return the number (0-10). No explanation.`;

    return scorePrompt;
}


export const genAdvicePrompt = ({ profileData }: ScoreProps): string => {
    const languages = Array.from(profileData.languages).join(", ");

    const result =
        `Give the github profile with follwing details: 
            Name: ${profileData.name}
            Bio: ${profileData.bio}
            Followers: ${profileData.followers}
            Following: ${profileData.following}
            Public Repos: ${profileData.publicRepos}
            Total Stars: ${profileData.totalStars}
            Languages: ${languages}
            Account Created: ${profileData.createdAt}
            Last Active: ${profileData.lastUpdated}
    an advice on what they are lacking and what they can do to make their profile better in exactly 20 words`

    return result;
}