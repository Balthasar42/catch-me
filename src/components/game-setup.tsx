import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useGameStore } from "@/store/game-store";

export function GameSetup() {
  const { numberOfPlayers, setNumberOfPlayers, startGame } = useGameStore();
  const [secretWord, setSecretWord] = useState("");
  const [error, setError] = useState("");

  const handleStartGame = () => {
    if (secretWord.trim() === "") {
      setError("Please enter a secret word");
      return;
    }

    if (numberOfPlayers < 3) {
      setError("Please select at least 3 players");
      return;
    }

    startGame(secretWord);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Game Setup</CardTitle>
        <CardDescription>
          Configure your game settings. One player will be the spy!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="secretWord">Secret Word</Label>
          <Input
            id="secretWord"
            placeholder="Enter a secret word"
            value={secretWord}
            onChange={(e) => {
              setSecretWord(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="players">Number of Players: {numberOfPlayers}</Label>
          </div>
          <Slider
            id="players"
            min={3}
            max={10}
            step={1}
            value={[numberOfPlayers]}
            onValueChange={(value) => {
              setNumberOfPlayers(value[0]);
              setError("");
            }}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>3</span>
            <span>10</span>
          </div>
        </div>

        {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      </CardContent>
      <CardFooter>
        <Button onClick={handleStartGame} className="w-full">
          Start Game
        </Button>
      </CardFooter>
    </Card>
  );
}