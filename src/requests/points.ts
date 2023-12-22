import fetch from 'node-fetch';

export const getPoints = async (startWeek: number, endWeek: number, managerId: string) => {
  try {
    const baseUrl = 'https://fantasy.premierleague.com/api/entry';

    let totalPoints = 0;

    for (let currentWeek = startWeek; currentWeek <= endWeek; currentWeek++) {
      const endpoint = `/${managerId}/event/${currentWeek}/picks/`;
      const url = `${baseUrl}${endpoint}`;

      // Define the custom User-Agent header
      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36',
      };

      // Send the fetch request with the custom User-Agent header
      const response = await fetch(url, { headers });
      console.log("RES", response);

      if (!response.ok) {
        if (response.status === 404) {
          // If the response status is 404, return totalPoints
          return totalPoints;
        } else {
          // If the response status is other than 404, throw an error
          throw new Error(`Failed to fetch data for Week ${currentWeek}. Status: ${response.status}`);
        }
      }

      const data: any = await response.json();

      // console.log(`Data for Week ${currentWeek}:`, data);

      let pointsForWeek = data.entry_history.points;

      totalPoints += pointsForWeek;
    }

    return totalPoints;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
