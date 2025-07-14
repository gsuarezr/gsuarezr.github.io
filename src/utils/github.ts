export async function getGitHubStats(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub stats');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}