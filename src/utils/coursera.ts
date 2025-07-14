export async function getCourseraCourses(learnerId: string): Promise<[]> {
  try {
    // Using the public profile achievements endpoint
    const response = await fetch(
      `https://www.coursera.org/api/onDemandCourseCompletions.v1?q=learner&userId=${learnerId}&fields=completedAt,courseId,courseName,platform,verifiedCertificateUrl,partners&includes=partner`,
      {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      }
    );

    if (!response.ok) {
      console.error('API Response status:', response.status);
      console.error('API Response text:', await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if data exists and has the expected structure
    if (!data || !data.elements) {
      console.error('Unexpected API response structure:', data);
      return [];
    }

    return data.elements.map((achievement: any) => ({
      completionDate: achievement.completedAt || new Date().toISOString(),
      courseId: achievement.courseId || '',
      courseName: achievement.courseName || 'Untitled Course',
      certificateUrl: achievement.verifiedCertificateUrl || '',
      partnerName: achievement.partners?.[0]?.name || 'Coursera Partner'
    }));
  } catch (error) {
    console.error('Error fetching Coursera courses:', error);
    
    // Try alternative endpoint if first one fails
    try {
      const altResponse = await fetch(
        `https://www.coursera.org/api/certificate.v1?q=learner&userId=${learnerId}&fields=courseId,courseName,certificateUrl,partners`,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (!altResponse.ok) {
        throw new Error(`Alternative API HTTP error! status: ${altResponse.status}`);
      }

      const altData = await altResponse.json();

      if (!altData || !altData.elements) {
        return [];
      }

      return altData.elements.map((cert: any) => ({
        completionDate: new Date().toISOString(), // Date might not be available in this endpoint
        courseId: cert.courseId || '',
        courseName: cert.courseName || 'Untitled Course',
        certificateUrl: cert.certificateUrl || '',
        partnerName: cert.partners?.[0]?.name || 'Coursera Partner'
      }));
    } catch (altError) {
      console.error('Error fetching from alternative endpoint:', altError);
      return [];
    }
  }
}