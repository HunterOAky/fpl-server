import fetch from 'node-fetch';

export const getPoints = async (startWeek: number, endWeek: number, managerId: string) => {
  try {
    const baseUrl = 'https://fantasy.premierleague.com/api/entry';

    let totalPoints = 0;

    for (let currentWeek = startWeek; currentWeek <= endWeek; currentWeek++) {
      const endpoint = `/${managerId}/event/${currentWeek}/picks/`;
      const url = `${baseUrl}${endpoint}`;

      const response = await fetch(url);
      console.log("RES", response);

      if (!response.ok) {
        if (response.status === 404) {
          // If the response status is 404, return totalPoints
          return totalPoints;
        } else {
          console.log(await response.json());
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
