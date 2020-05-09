import React, { useState, useEffect } from "react"
import PuzzlePiece from "./PuzzlePiece"
import { deepcopy } from "../lib/utils.js"
import Posn from "../lib/Posn.js"
import queenImg from "../assets/queen.png"

const queenTileStyle: React.CSSProperties = {
  background: "url(" + queenImg + ")",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100%",
}

type EightQueensBoardProps = {
  size: number
}

const EightQueensBoard = (props: EightQueensBoardProps) => {
  const { size } = props
  const [queens, setQueens] = useState<Array<Posn>>([])
  useEffect(() => setQueens([]), [size])

  const isAQueen = (pos: Posn): boolean => {
    return Posn.includes(pos, queens)
  }

  const setQueen = (pos: Posn): void => {
    if (isAQueen(pos)) return
    let newQueens = deepcopy(queens)
    newQueens.push(pos)
    setQueens(newQueens)
  }

  const unsetQueen = (pos: Posn): void => {
    if (!isAQueen(pos)) return
    let newQueens: Posn[] = queens.filter((queen) => !Posn.isEqual(queen, pos))
    setQueens(newQueens)
  }

  // const getCol = (pos: Posn): Posn[] => {
  //   let posArray: Posn[] = []
  //   for (let i = 0; i < size; ++i) {
  //     posArray.push(new Posn(pos.col, i))
  //   }
  //   return posArray
  // }

  // const getRow = (pos: Posn): Posn[] => {
  //   let posArray: Posn[] = []
  //   for (let i = 0; i < size; ++i) {
  //     posArray.push(new Posn(i, pos.row))
  //   }
  //   return posArray
  // }

  const getDiagonal = (pos: Posn): Posn[] => {
    let posArray: Posn[] = []
    let i = pos.row
    let j = pos.col
    while (i > 0 && j > 0) {
      --i
      --j
    }
    while (i < size && j < size) posArray.push(new Posn(i++, j++))
    return posArray
  }

  const isSolved = () => {
    // Check number of queens
    if (queens.length !== size) return false
    // Check row, col, and diagonal conflict
    let rowSeen = new Set()
    let colSeen = new Set()
    let diagonals = []
    for (let queen of queens) {
      rowSeen.add(queen.row)
      colSeen.add(queen.col)
      diagonals.push(getDiagonal(queen))
      for (let diagnal of diagonals.slice(0, -1)) {
        for (let pos of diagnal) {
          if (Posn.isEqual(pos, queen)) return false
        }
      }
    }
    return rowSeen.size === size && colSeen.size === size
  }

  // TODO: highlightTile = (pos: Posn) => {}

  // TODO: unhighlightTile = (pos: Posn) => {}

  const toggleQueen = (pos: Posn) => {
    isAQueen(pos) ? unsetQueen(pos) : setQueen(pos)
  }

  let rows = []
  for (let i = 0; i < size; ++i) {
    let tableDatas = []
    for (let j = 0; j < size; ++j) {
      tableDatas.push(
        <td
          style={{
            width: 400 / size,
            height: 400 / size,
            background: (i + j) % 2 === 0 ? "#d18b47" : "#ffce9e",
          }}
          key={j}
        >
          <PuzzlePiece
            tileId={i + "-" + j}
            pos={new Posn(i, j)}
            tileStyle={isAQueen(new Posn(i, j)) ? queenTileStyle : {}}
            handleClick={toggleQueen}
            handleDragStart={() => {}}
            handleDragEnd={() => {}}
          />
        </td>
      )
    }
    let row = <tr key={i}>{tableDatas}</tr>
    rows.push(row)
  }

  let successScreen = isSolved() ? "Solved!" : ""

  return (
    <div className="board">
      <table>
        <tbody>{rows}</tbody>
      </table>
      <br />
      <div className="buttons">
        <button
          onClick={() => {
            setQueens([])
          }}
        >
          Reset Puzzle
        </button>
      </div>
      <div>{successScreen}</div>
    </div>
  )
}

export default EightQueensBoard
