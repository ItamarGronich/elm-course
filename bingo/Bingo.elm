module Bingo exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class, href)


-- Model


type alias Entry =
    { phrase : String
    , value : Int
    }


type alias Model =
    { entries : List Entry
    , gameNumber : Int
    , player : Maybe String
    }


initialModel : Model
initialModel =
    { entries = [ Entry "foo" 100 ]
    , gameNumber = 0
    , player = Nothing
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


viewHeader : Model -> Html.Html Msg
viewHeader model =
    header []
        [ h1 [ class "gameTitle" ] [ text "Bingo Game" ]
        , h2 [ class "classy" ] [ text (viewGameNumber model.player model.gameNumber) ]
        ]


viewGameNumber : Maybe String -> Int -> String
viewGameNumber name gameNumber =
    let
        playerName =
            Maybe.withDefault "Anonymous" name
    in
        "Game #" ++ (toString gameNumber) ++ " - " ++ playerName


viewFooter : Html.Html Msg
viewFooter =
    footer [] [ a [ href "github.com/ItamarGronich/elm-course-bingo" ] [ text "My Github" ] ]


viewMainContent : Model -> Html.Html Msg
viewMainContent model =
    main_ [] [ ul [] (viewEntriesList model.entries) ]


viewEntriesList : List Entry -> List (Html.Html Msg)
viewEntriesList entries =
    let
        viewEntry entry =
            li []
                [ span [ class "phrase" ] [ text entry.phrase ]
                , span [ class "points" ] [ text (toString entry.value) ]
                ]
    in
        List.map viewEntry entries


view : Model -> Html.Html Msg
view model =
    body [ class "content" ]
        [ (viewHeader model)
        , (viewMainContent model)
        , p [] [ text (toString model) ]
        , viewFooter
        ]


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , update = update
        , subscriptions = (\_ -> Sub.none)
        , view = view
        }
