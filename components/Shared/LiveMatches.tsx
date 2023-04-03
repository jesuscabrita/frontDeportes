import React from "react";

const matches = [  {    homeTeam: "Barcelona",    awayTeam: "Real Madrid",    homeGoals: 2,    awayGoals: 1,    homeScorers: ["Messi", "Griezmann"],
    awayScorers: ["Benzema"],
    homeYellowCards: ["Pique", "Busquets"],
    awayYellowCards: ["Modric", "Kroos"],
  },
  {
    homeTeam: "Atletico Madrid",
    awayTeam: "Sevilla",
    homeGoals: 0,
    awayGoals: 0,
    homeScorers: [],
    awayScorers: [],
    homeYellowCards: ["Koke"],
    awayYellowCards: ["Ocampos"],
  },
  // ...
];

export const LiveMatches = () => {
    return (
        <div>
            {matches.map((match, index) => (
                <div key={index}>
                    <span>{match.homeTeam}</span>
                    <span>{match.homeGoals}</span>
                    <ul>
                        {match.homeScorers.map((scorer, index) => (
                            <li key={index}>{scorer}</li>
                        ))}
                    </ul>
                    <ul>
                        {match.homeYellowCards.map((player, index) => (
                            <li key={index}>{player}</li>
                        ))}
                    </ul>
                    <span>{match.awayGoals}</span>
                    <span>{match.awayTeam}</span>
                    <ul>
                        {match.awayScorers.map((scorer, index) => (
                            <li key={index}>{scorer}</li>
                        ))}
                    </ul>
                    <ul>
                        {match.awayYellowCards.map((player, index) => (
                            <li key={index}>{player}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};