import fetch from 'node-fetch';

interface StringJSONObject {
  [key: string]: string;
}

export const getPoints = async (managerList: StringJSONObject) => {
  const results: { [key: string]: any } = {};

  for (let manager in managerList) {
    try {
      const url = 'https://apin.livefpltables.com/';
      const requestBody = {
        query: `
          {
            entry(id: ${managerList[manager]}) {
              id
              name
              player_first_name
              player_last_name
              last_deadline_total_transfers
              started_event
            }

            entryHistory(id: ${managerList[manager]}) {
              current {
                total_points
                event_transfers_cost
                overall_rank
                event_transfers
                points
                rank
                bank
                value
              }
              chips {
                name
                event
              }
              past {
                season_name
                total_points
                rank
              }
            }
          }
        `,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      console.log(manager);
      const data: any = await response.json();
      let weeksPlayed = (data.data.entryHistory.current).length;
      results[manager] = [];
      for(let week = 0;week < weeksPlayed; week++){
        results[manager].push({
          week: week + 1, // Adjust week number if needed
          points: data.data.entryHistory.current[week].points,
          teamName: data.data.entry.name
        });
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  return results;
};
