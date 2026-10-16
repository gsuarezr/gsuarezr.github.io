export async function getGitHubStats(username: string) {
  try {
    const token = import.meta.env.PAT;

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': token ? `token ${token}` : ''
      }
    });

    if (!response.ok) {
      // You can get more info from the response here
      const errorText = await response.text();
      console.error(`GitHub API returned an error: ${response.status} - ${errorText}`);
      throw new Error('Failed to fetch GitHub stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}