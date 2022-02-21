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
                  alt="type_3"
                />
              </div>
            </div>
          </section>
        </Tab>

        <Tab eventKey="play" title="How To Play">
          <h1 class="text-secondary fw-bold text-center">How To Play</h1>

          <section className="bg-white my-4 ">
            <div className="row">
              <div className="col-6">
                <h3 className="pt-3 text-info fw-bold ps-2">
                  {' '}
                  Setting Up To Play
                </h3>
                <ol className="ps-5">
                  <li className="lead">Shake hands with your opponent.</li>
                  <li className="lead">
                    Flip a coin. The winner of the coin flip decides which
                    player goes first.
                  </li>
                  <li className="lead">
                    Shuffle your 60-card deck and draw the top 7 cards.
                  </li>
                  <li className="lead">
                    Check to see if you have any Basic Pokémon in your hand.
                  </li>
                  <li className="lead">
                    Put one of your Basic Pokémon face down as your Active
                    Pokémon.
                  </li>
                  <li className="lead">
                    Put up to 5 more Basic Pokémon face down on your Bench.
                  </li>
                  <li className="lead">
                    Put the top 6 cards of your deck off to the side face down
                    as your Prize cards.
                  </li>
                  <li className="lead">
                    Both players flip their Active and Benched Pokémon face up
                    and start the game!
                  </li>
                </ol>
              </div>

              <div className="col-6">
                <img
                  className="img-fluid"
                  src={require('../images/how_to_play/setting_up.png')}
                  alt="setting_up"
                />
              </div>
            </div>
          </section>

          <section className="bg-light my-4 ">
            <div>
              <h3 className="pt-3 text-info fw-bold ps-2"> Parts of a Turn</h3>
              <ol className="ps-5">
                <li className="fw-bold lead">Draw a card.</li>
                <li className="fw-bold lead">
                  Do any of the following actions in any order:
                  <ol type="A" className="fw-light">
                    <li>
                      Put Basic Pokémon cards from your hand onto your Bench (as
                      many as you want).
                    </li>
                    <li>Evolve your Pokémon (as many as you want).</li>
                    <li>
                      Attach an Energy card from your hand to one of your
                      Pokémon (once per turn).
                    </li>
                    <li>
                      Play Trainer cards (as many as you want, but only one
                      Supporter card and one Stadium card per turn).
                    </li>
                    <li>Retreat your Active Pokémon (only once per turn).</li>
                    <li>Use Abilities (as many as you want).</li>
                  </ol>
                </li>
                <li className="fw-bold lead">
                  Attack. Then, end your turn.
                  <ol type="A" className="fw-light">
                    <div>
                      <li className="fw-bold">
                        CHECK the Energy attached to your Active Pokémon.
                      </li>
                      <div className="row">
                        <div className="col-6">
                          <p>
                            You need the right amount of Energy attached to a
                            Pokémon for it to attack. For example, look at
                            Drizzile. Its Rain Splash attack costs 1 water
                            enery, so you must have at least 1 water Energy
                            attached to Drizzile to use this attack.
                          </p>
                        </div>
                        <div className="col-6">
                          <img
                            className="img-fluid"
                            src={require('../images/how_to_play/attack.png')}
                            alt="attack"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <li className="fw-bold">
                        CHECK Weakness and Resistance of your opponent’s Active
                        Pokémon.
                      </li>
                      <p>
                        Some Pokémon have Weakness or Resistance to Pokémon of
                        certain types, marked in the lower-left corner of the
                        card. If the attack does damage, your opponent’s Active
                        Pokémon takes more damage if it has Weakness to the
                        attacker’s type. It takes less damage from a Pokémon if
                        it has Resistance to that Pokémon’s type.
                      </p>
                    </div>

                    <div>
                      <li className="fw-bold">
                        PUT damage counters on your opponent’s Active Pokémon.
                      </li>
                      <p>
                        When you attack, put 1 damage counter on your opponent’s
                        Active Pokémon for each 10 damage your Pokémon’s attack
                        does (written to the right of the attack name). In the
                        example to the right, Scorbunny’s Tackle attack does 10
                        damage. Then, Grookey’s Weakness of ×2 to Pokémon makes
                        that 10 ×2 = 20 damage. So put 2 damage counters on
                        Grookey. If an attack says to do something else, be sure
                        to do that, too! Your attack is complete, so check to
                        see if any Pokémon were Knocked Out by the attack. Some
                        attacks can damage more than one Pokémon, and sometimes
                        they can even damage the Attacking Pokémon! So, make
                        sure to check every Pokémon that was affected by the
                        attack. If a Pokémon has total damage at least equal to
                        its HP (for example, 5 or more damage counters on a
                        Pokémon with 50 HP), it is Knocked Out. If a player’s
                        Pokémon is Knocked Out, that player puts it and all
                        cards attached to it in the discard pile. That player’s
                        opponent takes 1 of their own Prize cards and puts it
                        into their hand. The player whose Pokémon was Knocked
                        Out chooses a new Active Pokémon from their Bench. If
                        your opponent can’t do this because their Bench is empty
                        (or for any other reason), you win the game! If your
                        opponent still has Pokémon in play, but you just took
                        your last Prize card, you also win the game!
                      </p>
                    </div>

                    <div>
                      <li className="fw-bold">Your turn is over.</li>
                      <p>
                        Next, you take care of a few special things during
                        Pokémon Checkup.
                      </p>
                    </div>
                  </ol>
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h3 className="fw-bold text-info ps-2">More Rules & Info</h3>
            <div className="ps-4">
              <p>For more rules and information, you can check this link:</p>
              <a href="https://www.pokemon.com/us/pokemon-tcg/">
                https://www.pokemon.com/us/pokemon-tcg/
              </a>
            </div>
          </section>
        </Tab>
      </Tabs>
      <div className="text-center mt-4">
        <a href="/" className="btn btn-primary btn-lg">
          Back To Home
        </a>
      </div>
    </Container>
  );
}
