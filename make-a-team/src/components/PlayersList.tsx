interface PlayersListProps {
  players: string[];
}

export default function PlayersList(props: PlayersListProps) {
  return (
    <ul>
      {props.players.map((player, i) => (
        <li key={i}>{player}</li>
      ))}
    </ul>
  );
}
