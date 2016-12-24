module Bingo exposing (..)

import Html exposing (h1,ul,li,p,text,body)

-- Model



-- View


view : Model -> Html Msg
view model =
  body [] [ text toString model]

main =
    Html.program ({ init :  model, Platform.Cmd.Cmd msg ) ( , update : msg -> model ->  model, Platform.Cmd.Cmd msg ) , subscriptions : model Platform.Sub.Sub msg , view : model Html.Html msg }
