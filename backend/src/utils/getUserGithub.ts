
interface GitHubUser {
  name: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  updated_at: string;
}

interface GitHubRepo {
  stargazers_count: number;
  language: string;
}

export const getUserGithub = async (username:string) => {
try {
    const userData = await axios.get<GitHubUser>(`https://api.github.com/users/${username}`)
    const repoData = await axios.get<GitHubRepo[]>(`https://api.github.com/users/${username}/repos?per_page=100`);

    const user = userData.data;
    const repos = repoData.data;
    let sum = 0;
    repos.forEach((repo: any) => {
      sum += repo.stargazers_count;
    });
    const totalStars = sum;

  const languages = new Set();
    repos.forEach((repo:any)=>{
      if (!repo.language) return;
      languages.add(repo.language);
    })

   return {
    name: user.name,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    totalStars,
    languages,
    createdAt: user.created_at,
    lastUpdated: user.updated_at,
  };
} catch (error) {
    console.log("Internal Server Error!")  
    }
};
