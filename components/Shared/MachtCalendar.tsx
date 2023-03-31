import React, { useState } from "react";
import data from '../../utils/data.json'
import { Grid } from "@mui/material";

const MatchCalendar = () => {
    const [matches, setMatches] = useState([]);

    // Función para generar un partido aleatorio
    // Función para generar el calendario
    const generateCalendar = () => {
      const numTeams = data.length;
  const numRounds = numTeams - 1;
  const matchesPerRound = numTeams / 2;

  const teamIndexes = data.map((team, index) => index);

  const newMatches = [];
  for (let round = 0; round < numRounds; round++) {
    const roundMatches = [];

    for (let match = 0; match < matchesPerRound; match++) {
      const homeTeamIndex = (round + match) % (numTeams - 1);
      const awayTeamIndex = (numTeams - 1 - match + round) % (numTeams - 1);

      if (match === 0) {
        roundMatches.push([teamIndexes[numTeams - 1], teamIndexes[homeTeamIndex]]);
      } else {
        roundMatches.push([teamIndexes[homeTeamIndex], teamIndexes[awayTeamIndex]]);
      }
    }

    newMatches.push(roundMatches);
  }

  setMatches(newMatches);
};

    return (
        <Grid container >
            <button onClick={generateCalendar}>Generar calendario</button>
            {matches.map((roundMatches, index) => {
                // console.log('data1', roundMatches)
                return (
                    <Grid container flexDirection={'column'} alignItems={'center'} key={index}>
                        <h3>Ronda {index + 1}</h3>
                        <Grid sx={{ padding: '8px' }}>
                            {roundMatches.map((match, index) => {
                                // console.log('data2', match)
                                return (
                                    <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} key={index}>
                                        <Grid>
                                            <img style={{ height: '80px' }} src={data[match[0]].logo} alt={data[match[0]].name} />
                                            {/* {data[match[0]].name} */}
                                        </Grid>
                                        vs
                                        <Grid>
                                            <img style={{ height: '80px' }} src={data[match[1]].logo} alt={data[match[1]].name} />
                                            {/* {data[match[1]].name} */}
                                        </Grid>
                                    </Grid>
                                )

                            })}
                        </Grid>
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default MatchCalendar;