import React, {useState} from 'react';
import styled from "styled-components";

import './App.css';
import {MyButton} from "./components/button/my-button";
import {ColorsGrid} from "./components/color-list/color-list";
import {FieldHint, FieldLabel, FormField, Input, InputWrapper} from "./components/input-field/input-field";
import {ColorItemData, getRandomColors} from "./core/color-game-utils";
import {ColorItem} from "./components/color-list/color-item/color-item-data";

enum GameState {
    Start,
    Playing,
    Defeat,
    Win
}

const GameContainer = styled.main`
  padding: 4rem;
  background-color: #333333;
  border-radius: 1rem;
`

const AlignCenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
    const [gameState, setGameState] = useState(GameState.Start);
    const [activeColors, setActiveColors] = useState<ColorItemData[]>([]);
    const [secretColor, setSecretColor] = useState<ColorItemData>(null!);
    const [inputValue, setInputValue] = useState('');
    const [hint, setHint] = useState('');
    const [tries, setTries] = useState(0);

    const initGame = () => {
        document.body.style.background = '#222222';
        setTries(0);
        setHint('');
        setInputValue('');
        const colors = getRandomColors(10);
        setActiveColors(colors);
        setSecretColor(colors[Math.floor(Math.random() * colors.length)]);
    }

    const startGame = () => {
        initGame();
        setGameState(GameState.Playing);
    }


    const makeGuess = () => {
        if (secretColor.colorName === inputValue) {
            document.body.style.background = secretColor.colorHex;
            setGameState(GameState.Win);
            return;
        }

        if (!activeColors.some(c => c.colorName === inputValue)) {
            setHint('Invalid color');
            return;
        } else if (secretColor?.colorName > inputValue) {
            setHint(`You've guessed ${inputValue}. Your color is alphabetically lower than mine.`);
        } else if (secretColor?.colorName < inputValue) {
            setHint(`You've guessed ${inputValue}. Your color is alphabetically greater than mine.`);
        }

        setTries(tries + 1);

        if ((tries + 1) >= 3) {
            setGameState(GameState.Defeat);
        }
    }

    const statesContent = {
        [GameState.Start]:
            <AlignCenterDiv>
                <h1>Guess Color Game</h1>
                <MyButton onClick={startGame}>Start</MyButton>
            </AlignCenterDiv>,
        [GameState.Playing]:
            <div>
                <h3>I am thinking of one of these colors:</h3>
                <div style={{marginBottom: "2rem"}}>
                    <ColorsGrid>
                        {activeColors.map(i =>
                            <ColorItem key={i.colorName} onClick={() => setInputValue(i.colorName)}
                                       colorHex={i.colorHex} colorName={i.colorName}></ColorItem>)}
                    </ColorsGrid>
                </div>
                <FormField>
                    <FieldLabel>Color name</FieldLabel>
                    <InputWrapper>
                        <Input value={inputValue} onInput={e => setInputValue(e.currentTarget.value)}
                               id="colorNameGuess"
                               type="text" placeholder="Your guess color name"></Input>
                    </InputWrapper>
                    {hint && <FieldHint>{hint}</FieldHint>}
                </FormField>
                <div style={{marginTop: '1rem', width: '100%'}}>
                    <MyButton onClick={makeGuess}>Guess</MyButton>
                </div>
            </div>,
        [GameState.Defeat]:
            <AlignCenterDiv>
                <h3>It wasn't this time, but you always can try again.</h3>
                <MyButton style={{marginTop: "1rem"}} onClick={startGame}>Try again</MyButton>
            </AlignCenterDiv>,
        [GameState.Win]:
            <AlignCenterDiv>
                <h3>Congrats! That's the color! Can you read my mind?</h3>
                <MyButton style={{marginTop: "1rem"}} onClick={startGame}>Play again</MyButton>
            </AlignCenterDiv>
    }

    return <GameContainer>
        {statesContent[gameState]}
    </GameContainer>
}

export default App;
