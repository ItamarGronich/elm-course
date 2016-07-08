module Bingo where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import String exposing (toUpper, repeat, trimRight)

title message times =
  message ++ " "
    |> toUpper
    |> repeat times
    |> trimRight
    |> text

greet name color food animal =
  (name ++ "'s favorits are: " ++ (String.join " " [color, food, animal]))
   |> Html.text

pageHeader =
    h1 [] [title "bingo!" 3]

pageFooter =
  footer []
    [ a [href "https://github.com/itamargronich"]
        [ text "My Github" ]
    ]

view =
  div [] [ pageHeader, pageFooter ]

main =
  view
