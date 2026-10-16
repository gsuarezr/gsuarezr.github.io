export interface CredlyBadge {
  id: string;
  name: string;
  image_url: string;
  description: string;
  issued_at: string;
  page_url: string;
}

// src/utils/credly.ts
export async function getCredlyBadges(username: string): Promise<CredlyBadge[]> {
  try {
    const response = await fetch(
      `https://www.credly.com/users/${username}/badges.json`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return data.data.map((badge: any) => ({
      id: badge.id,
      name: badge.badge_template?.name || 'Unknown Badge',
      image_url: badge.badge_template?.image?.url || '',
      description: badge.badge_template?.description || '',
      issued_at: badge.issued_at || '',
      page_url: badge.badge_template?.url || ''
    }));
  } catch (error) {
    console.error('Error fetching Credly badges:', error);
    return [];
  }
}