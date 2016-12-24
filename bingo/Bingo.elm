module Bingo exposing (..)

import Html exposing (h1, ul, li, p, text, body)


-- Model


type alias Entry =
    { phrase : String
    , value : Int
    }


type alias Model =
    { entries : List Entry
    }


initialModel : Model
initialModel =
    { entries = [ Entry "foo" 100 ]
    }



-- Update


type Msg
    = NewGame


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        _ ->
            ( model, Cmd.none )


init : ( Model, Cmd Msg )
init =
    ( initialModel, Cmd.none )



-- View


view : Model -> Html.Html Msg
view model =
    p [] [ text (toString model) ]


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , update = update
        , subscriptions = (\_ -> Sub.none)
        , view = view
        }
