import React from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';

export default function HowToPlay() {
  return (
    <Container className="my-3">
      <Tabs
        defaultActiveKey="intro"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="intro" title="Intro">
          <div className="row bg-light">
            <div className="col-5">
              <h2 class="text-secondary fw-bold">Intro Pokémon TCG</h2>
              <p className="lead">
                The Pokémon Trading Card Game is a 2-player game in which
                players use 60-card decks to battle. In the Pokémon TCG, players
                build decks around cards that feature Pokémon characters, and
                then take turns using attacks to try to defeat their opponent.
                The game requires some strategy and planning to win.
              </p>
            </div>
            <div className="col-7">
              <img
                className="img-fluid"
                src={require('../images/how_to_play/intro.png')}
                alt="intro"
              />
            </div>
          </div>
        </Tab>
        <Tab eventKey="info" title="General Game Info">
          <h1 class="text-secondary fw-bold text-center">
            Pokemon TCG Basic Concepts
          </h1>
          <section className="bg-light my-3">
            <div className="row my-4 ps-3">
              <div className="col-5">
                <h3 className="pt-3 text-info fw-bold"> How to Win</h3>
                <p className="lead">
                  In the Pokemon TCG, your Pokemon battle your opponent Pokemon.
                  The first player to take all of their Prize cards wins! Also,
                  if your opponent has no Pokemon left in play, or no cards left
                  to draw at the beginning of their turn, you win the game!
                </p>
              </div>

              <div className="col-7">
                <img
                  className="img-fluid"
                  src={require('../images/how_to_play/prize_card.png')}
                  alt="prize_card"
                />
              </div>
            </div>
          </section>

          <section className="bg-white my-5">
            <div className="row my-4 ps-3">
              <div className="col-7">
                <img
                  className="img-fluid"
                  src={require('../images/how_to_play/energy_card.png')}
                  alt="prize_card"
                />
              </div>
              <div className="col-5">
                <h3 className="pt-3 text-info fw-bold"> Energy Types</h3>
                <p className="lead">
                  Pokémon Knock Out opposing Pokémon by using attacks or
                  Abilities. To power their attacks, Pokémon need Energy cards.
                  The Pokémon TCG has 11 Energy types, and you will find Pokémon
                  matching all 11 types in the game. (Note that there are no
                  Fairy-type Pokémon cards in the Sword & Shield Series, but
                  they do exist in older expansions.)
                </p>
              </div>
            </div>
          </section>

          <section className="bg-light my-5">
            <div className="row my-4 ps-3">
              <div className="col-5">
                <h3 className="pt-3 text-info fw-bold "> Pokémon Cards</h3>
                <p className="lead">
                  Pokémon cards are the important cards of the game, but are
                  useless to attack if there are no energy cards attacked. You
                  start with basic Pokémon cards and there are cards containing:
                  "Stage 1" and "Stage 2" which means a certain Pokémon can
                  evolve. There are important parts at a Pokémon card, such as:
                  HP or Ability.
                </p>

                <h5 className="lead fw-bold"> POKÉMON TYPE </h5>
                <p className="lead">
                  Cards can contain the type of the Pokémon which can be one of
                  the 10 energy cards. The eleven types are: Colorless, Grass,
                  Fire, Water, Lightning, Fighting, and Psychic. Later on, the
                  Darkness, Metal, Dragon, and Fairy types were introduced.
                  However, the Fairy type was later removed and is not scheduled
                  to appear on any future cards.
                </p>
                <h5 className="lead fw-bold">HEAL POINTS (HP)</h5>
                <p className="lead">
                  Those are the Pokémon energy of battling. If they are attack
                  with the points of the Pokémon attack, they will lose some
                  Heal Points. If they got attacked and lost all of their Heal
                  Points then the Pokémon is knocked out and sent to the discard
                  pile, with all energy cards that were attached to the Pokémon.
                </p>

                <h5 className="lead fw-bold">STAGE </h5>
                <p className="lead">
                  Some Pokémon that contains "basic" got evolution forms. If
                  there is a Pokémon with Stage 1 or Stage 2, then it means that
                  it is the evolved type of Pokémon. But only if the Pokémon in
                  the picture of the evolved Pokémon can be evolved.
                </p>
              </div>

              <div className="col-7">
                <img
                  className="img-fluid"
                  src={require('../images/how_to_play/part_1.png')}
                  alt="prize_card"
                />
                <img
                  className="img-fluid"
                  src={require('../images/how_to_play/part_2.png')}
                  alt="prize_card"
                />
              </div>
            </div>
          </section>

          <section className="bg-white my-5">
            <h3 className="pt-3 text-info fw-bold "> 3 Card Types</h3>
            <p className="lead fw-bold text-success">
              You’ll find 3 different types of cards in the Pokémon TCG:
            </p>

            <div className="row ">
              <div className="col-5">
                <h5 className="lead fw-bold">Pokémon </h5>
                <p className="lead">
                  Of course the most important cards are Pokémon! Most of these
                  cards are Basic Pokémon, Stage 1 Pokémon, or Stage 2 Pokémon.
                  Stage 1 and Stage 2 Pokémon are also called Evolution cards.
                  Look at the upper-left corner and you will see the Pokémon’s
                  Stage and the Pokémon it evolves from, if any.
                </p>
              </div>

              <div className="col-7">
                <img
                  className="img-fluid"
                  src={require('../images/how_to_play/type_1.png')}
                  alt="prize_card"
                />
              </div>
            </div>

            <div className="row ">
              <div className="col-5">
                <h5 className="lead fw-bold">Energy Cards </h5>
                <p className="lead">
                  Most of the time, Pokémon can’t attack without Energy cards!
                  You’ll need to match the symbols of the attack cost to the
                  Energy card, but any type of Energy can be used for.
                </p>
              </div>

              <div className="col-7">
                <img
                  className="img-fluid"
                  src={require('../images/how_to_play/type_2.png')}
                  alt="prize_card"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-5">
                <h5 className="lead fw-bold">Trainer Cards </h5>
                <p className="lead">
                  Trainer cards represent the Items, Supporters, and Stadiums a
                  Trainer can use in battle. You can see the specific Trainer
                  subtype in the upper-right corner and any special rules for
                  that subtype at the bottom of the card.
                </p>
              </div>

              <div className="col-7">
                <img
                  className="img-fluid"
                  src={require('../images/how_to_play/type_3.png')}
                  alt="prize_card"
                />
              </div>
            </div>
          </section>
        </Tab>

        <Tab eventKey="play" title="How To Play"></Tab>
      </Tabs>
      <div className="text-center mt-4">
        <a href="/" className="btn btn-primary btn-lg">
          Back To Home
        </a>
      </div>
    </Container>
  );
}
