export const generateCalendar = (data) => {
    const numTeams = data.length;
    const numRounds = numTeams - 1;
    const matchesPerRound = numTeams / 2;
    const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));

    const newMatches = [];
    for (let round = 0; round < numRounds; round++) {
        const roundMatches = [];

        for (let match = 0; match < matchesPerRound; match++) {
            const homeTeamIndex = (round + match) % (numTeams - 1);
            const awayTeamIndex = (numTeams - 1 - match + round) % (numTeams - 1);

            if (match === 0) {
                roundMatches.push([
                    sortedData[numTeams - 1]._id,
                    sortedData[homeTeamIndex]._id,
                    sortedData[numTeams - 1].fecha,
                ]);
            } else {
                roundMatches.push([
                    sortedData[homeTeamIndex]._id,
                    sortedData[awayTeamIndex]._id,
                    sortedData[homeTeamIndex].fecha,
                ]);
            }
        }

        roundMatches.sort((a, b) => {
            const dateA = new Date(a[2][0]);
            const dateB = new Date(b[2][0]);
            return dateA.getTime() - dateB.getTime();
        });
        newMatches.push(roundMatches);
    }
    return newMatches;
};