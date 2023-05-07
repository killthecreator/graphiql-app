export const typeDefs = `
"A single Pokémon ability entry"
type Ability {
  "The key of the ability as stored in the API"
  key: AbilitiesEnum!

  "Bulbapedia page for an ability"
  bulbapediaPage: String!

  "The long description for an ability"
  desc: String

  "Whether this ability has effects outside of battle, and if so what the effect is"
  isFieldAbility: String

  "The name for an ability"
  name: String!

  """
  The Pokémon that have this ability.
  Note that when querying this field and nesting deep into Pokemon.abilities, that the nested list
  will not have any values to prevent infinite looping data.
  """
  pokemonThatHaveThisAbility: [Pokemon]!

  "Serebii page for an ability"
  serebiiPage: String!

  "The short description for an ability"
  shortDesc: String!

  "Smogon page for an ability"
  smogonPage: String!
}

"A Pokémon's entry"
type Pokemon {
  "The key of the Pokémon as stored in the API"
  key: PokemonEnum!

  "The abilities for a Pokémon"
  abilities: Abilities!

  "The back sprite for a Pokémon. For most Pokémon this will be the animated gif, with some exceptions that were older-gen exclusive"
  backSprite: String!

  "Base form if this entry describes an alternate form"
  baseForme: String

  "Base species if this entry describes a special form"
  baseSpecies: String

  "Base stats for a Pokémon"
  baseStats: Stats!

  "The total of all base stats for a Pokémon"
  baseStatsTotal: Int!

  "Bulbapedia page for a Pokémon"
  bulbapediaPage: String!

  "The catch rate data for a Pokémon"
  catchRate: CatchRate

  "The colour of a Pokémon as listed in the Pokedex"
  color: String!

  "Any other *cosmetic* forms for a Pokémon, distinguished from other formes as cosmetic formes only change the look of the Pokémon, while other formes might also change an ability, move set or other data."
  cosmeticFormes: [String!]

  "The egg groups a Pokémon is in"
  eggGroups: [String!]

  "The evolution level, or special method, for a Pokémon"
  evolutionLevel: String

  "The evolutions for a Pokémon, if any"
  evolutions: [Pokemon!]

  "EV yields for a Pokémon"
  evYields: EvYields!

  "The flavor texts for a Pokémon"
  flavorTexts: [Flavor!]!

  "The form identifier of a Pokémon"
  forme: String

  "The single letter identifier of the form"
  formeLetter: String

  "The gender data for a Pokémon"
  gender: Gender!

  "The height of a Pokémon in meters"
  height: Float!

  "Whether the egg of a Pokémon is obtainable"
  isEggObtainable: Boolean!

  "The levelling rate of a Pokémon"
  levellingRate: String

  "The maximum number of steps required for the egg of a Pokémon to hatch"
  maximumHatchTime: Int

  "The minimum number of steps required for the egg of a Pokémon to hatch"
  minimumHatchTime: Int

  "The dex number for a Pokémon"
  num: Int!

  "The learnset for this pokemon"
  learnsets: GenerationalPokemonLearnset

  "Any other forms for a Pokémon"
  otherFormes: [String!]

  "The preevolutions for a Pokémon, if any"
  preevolutions: [Pokemon!]

  "Serebii page for a Pokémon"
  serebiiPage: String!

  "The shiny back sprite for a Pokémon. For most Pokémon this will be the animated gif, with some exceptions that were older-gen exclusive"
  shinyBackSprite: String!

  "The shiny sprite for a Pokémon. For most Pokémon this will be the animated gif, with some exceptions that were older-gen exclusive"
  shinySprite: String!

  "Smogon page for a Pokémon"
  smogonPage: String!

  "The smogon tier a Pokémon falls under"
  smogonTier: String!

  "The species name for a Pokémon"
  species: String!

  "The sprite for a Pokémon. For most Pokémon this will be the animated gif, with some exceptions that were older-gen exclusive"
  sprite: String!

  "The types for a Pokémon"
  types: [PokemonType!]!

  "The weight of a Pokémon in kilograms"
  weight: Float!
}

"The type of a Pokémon and that types matchup"
type PokemonType {
  "The name of the typ"
  name: String!

  "The type matchup for this type"
  matchup: TypeMatchup!
}

"A Pokémon's abilities entry"
type Abilities {
  "The first ability of a Pokémon"
  first: Ability!

  "The hidden ability of a Pokémon"
  hidden: Ability

  "The second ability of a Pokémon"
  second: Ability

  "The special ability of a Pokémon"
  special: Ability
}

"A Pokémon's stats"
type Stats {
  "The base attack stat of a Pokémon"
  attack: Int!

  "The base defense stat of a Pokémon"
  defense: Int!

  "The base HP stat of a pokémon"
  hp: Int!

  "The base special attack stat of a Pokémon"
  specialattack: Int!

  "The base special defense stat of a Pokémon"
  specialdefense: Int!

  "The base speed stat of a Pokémon"
  speed: Int!
}

"A Pokémon catch rate entry"
type CatchRate {
  "The base catch rate for a Pokémon that will be used to calculate the final catch rate"
  base: Int!

  "The chance to capture a Pokémon when an ordinary Poké Ball is thrown at full health without any status condition"
  percentageWithOrdinaryPokeballAtFullHealth: String!
}

"A Pokémon's EV yields"
type EvYields {
  "The attack EV yield of a Pokémon"
  attack: Int!

  "The defense EV yield of a Pokémon"
  defense: Int!

  "The HP EV yield of a pokémon"
  hp: Int!

  "The special attack EV yield of a Pokémon"
  specialattack: Int!

  "The special defense EV yield of a Pokémon"
  specialdefense: Int!

  "The speed EV yield of a Pokémon"
  speed: Int!
}

"A flavor text entry for a Pokémon"
type Flavor {
  "The flavor text for this entry"
  flavor: String!

  "The name of the game this flavor text is from"
  game: String!
}

"A Pokémon gender ratio entry"
type Gender {
  "The percentage for female occurrences"
  female: String!

  "The percentage of male occurrences"
  male: String!
}

"A single item entry"
type Item {
  "The key of the item as stored in the API"
  key: ItemsEnum!

  "Bulbapedia page for an item"
  bulbapediaPage: String!

  "The long description for an item"
  desc: String!

  "The generation in which this item was introduced"
  generationIntroduced: Int!

  "Whether an item is non-standard, and if it is why"
  isNonstandard: String

  "The name for an item"
  name: String!

  "Serebii page for an item"
  serebiiPage: String!

  "The long description for an item"
  shortDesc: String

  "Smogon page for an item"
  smogonPage: String

  "The sprite for an item"
  sprite: String!
}

"The learnset for each Pokémon split by generation"
type GenerationalPokemonLearnset {
  "The learnset of this Pokémon in Generation 8"
  generation8: PokemonLearnset!
  "The learnset of this Pokémon in Generation 7"
  generation7: PokemonLearnset!
  "The learnset of this Pokémon in Generation 6"
  generation6: PokemonLearnset!
  "The learnset of this Pokémon in Generation 5"
  generation5: PokemonLearnset!
  "The learnset of this Pokémon in Generation 4"
  generation4: PokemonLearnset!
  "The learnset of this Pokémon in Generation 3"
  generation3: PokemonLearnset!
}

type PokemonLearnset {
  "The moves that are exclusively learned in the Unova Dream World"
  dreamworldMoves: [LearnsetMove!]

  "The moves that can be passed as egg moves"
  eggMoves: [LearnsetMove!]

  "The moves that are exclusive to event variants of the Pokémon"
  eventMoves: [LearnsetMove!]

  "The moves that can be learned through levelling up"
  levelUpMoves: [LearnsetLevelUpMove!]

  "The moves that can be learned from a Technical Machine or Technical Record"
  tmMoves: [LearnsetMove!]

  "The moves that can be learned from a move tutor"
  tutorMoves: [LearnsetMove!]

  "The moves that can be learned through virtual console transfer"
  virtualTransferMoves: [LearnsetMove!]
}

"A learnset entry"
type Learnset {
  "The back sprite for a Pokémon. For most Pokémon this will be the animated gif, with some exceptions that were older-gen exclusive"
  backSprite: String!

  "The PokéDex colour for the Pokémon"
  color: String!

  "The key of the Pokémon as stored in the API"
  pokemonKey: PokemonEnum!

  "The dex number for a Pokémon"
  num: Int!

  "The shiny back sprite for a Pokémon. For most Pokémon this will be the animated gif, with some exceptions that were older-gen exclusive"
  shinyBackSprite: String!

  "The shiny sprite for a Pokémon. For most Pokémon this will be the animated gif, with some exceptions that were older-gen exclusive"
  shinySprite: String!

  "The species name for a Pokémon"
  species: String!

  "The sprite for a Pokémon. For most Pokémon this will be the animated gif, with some exceptions that were older-gen exclusive"
  sprite: String!

  "The moves that are exclusively learned in the Unova Dream World"
  dreamworldMoves: [LearnsetMove!]

  "The moves that can be passed as egg moves"
  eggMoves: [LearnsetMove!]

  "The moves that are exclusive to event variants of the Pokémon"
  eventMoves: [LearnsetMove!]

  "The moves that can be learned through levelling up"
  levelUpMoves: [LearnsetLevelUpMove!]

  "The moves that can be learned from a Technical Machine or Technical Record"
  tmMoves: [LearnsetMove!]

  "The moves that can be learned from a move tutor"
  tutorMoves: [LearnsetMove!]

  "The moves that can be learned through virtual console transfer"
  virtualTransferMoves: [LearnsetMove!]
}

"A learnset move entry"
type LearnsetMove {
  "The generation in which this pokémon learned the move this way"
  generation: Int!

  "The move"
  move: Move!
}

"A learnset level up move entry"
type LearnsetLevelUpMove {
  "The generation in which this pokémon learned the move this way"
  generation: Int!

  "The move"
  move: Move!

  "The level at which the move is learned"
  level: Int!
}

"A single Pokémon move entry"
type Move {
  "The key of the move as stored in the API"
  key: MovesEnum!

  "The accuracy for a move"
  accuracy: Int!

  "The base power for a move"
  basePower: String!

  "Bulbapedia page for a move"
  bulbapediaPage: String!

  "The category for a move"
  category: String!

  "The contest type for a move"
  contestType: String

  "The long description for a move"
  desc: String

  "Whether this move can be used outside of battle, and if it can what the effect of the field move is"
  isFieldMove: String

  "Whether this move is a G-MAX move, and if it is which Gigantamaxed Pokémon can use it"
  isGMax: String

  "Whether a move is non-standard, and if it is why"
  isNonstandard: String

  "Whether this move is a Z-Move, and if it is the Z-Crystal required to trigger it"
  isZ: String

  "The power this move will have when used with its Max Move equivalent"
  maxMovePower: Int

  "The name for a move"
  name: String!

  "The power points for a move"
  pp: Int!

  "The priority for a move"
  priority: Int!

  "Serebii page for a move"
  serebiiPage: String!

  "The short description for a move"
  shortDesc: String!

  "Smogon page for a move"
  smogonPage: String!

  "The target for a move"
  target: String!

  "The type for a move"
  type: String!

  "The power this move will have when used with its Z-move equivalent"
  zMovePower: Int!
}

"The type matchups for any one or two given types"
type TypeMatchup {
  "The type matchups when attacking"
  attacking: TypeEffectiveness!

  "The type matchups when defending"
  defending: TypeEffectiveness!
}

"A type matchup entry"
type TypeEffectiveness {
  "The types with 4x effectiveness"
  doubleEffectiveTypes: [String!]!

  "The types with 0.25x effectiveness"
  doubleResistedTypes: [String!]!

  "The types with 2x effectiveness"
  effectiveTypes: [String!]!

  "The types with 0x effectiveness"
  effectlessTypes: [String!]!

  "The types with 1x effectiveness"
  normalTypes: [String!]!

  "The types with 0.5x effectiveness"
  resistedTypes: [String!]!
}

type Query {
  "Gets the details on a Pokémon ability, using the ability name"
  getAbility("The ability to look up" ability: AbilitiesEnum!): Ability!

  """
  Gets details on a Pokémon ability, using a fuzzy search on name

  This can be used to find multiple results based on the query

  You can provide 'tak' to limit the amount of abilities to return (default: 1), set the offset of where to start with 'offset', and reverse the entire array with 'reverse'.
  """
  getFuzzyAbility(
    "Sets the offset where to start"
    offset: Int = 0

    "Return only this many results, starting from the offset"
    take: Int = 1

    "Reverses the dataset before paginating"
    reverse: Boolean = false

    "The ability to fuzzily search"
    ability: String!
  ): [Ability!]!

  """
  Gets details on a single Pokémon based on National Pokédex number

  You can provide 'takeFlavorTexts' to limit the amount of flavour texts to return, set the offset of where to start with 'offsetFlavorTexts', and reverse the entire array with 'reverseFlavorTexts'.

  **Reversal is applied before pagination!**
  """
  getPokemonByDexNumber(
    "Sets the offset for flavor texts from where to start."
    offsetFlavorTexts: Int = 0

    "Return this many flavour texts, up to the maximum of entries that the requested Pokémon has."
    takeFlavorTexts: Int = 1

    "Whether to reverse the list of games from which to get the data. By default Generation 1 is considered for 'take' first, when setting this to true that is instead Generation 8."
    reverseFlavorTexts: Boolean = true

    "The International PokéDex number of the Pokémon to look up"
    number: Int!
  ): Pokemon!

  """
  Gets details on a single Pokémon based on species name

  You can provide 'takeFlavorTexts' to limit the amount of flavour texts to return, set the offset of where to start with 'offsetFlavorTexts', and reverse the entire array with 'reverseFlavorTexts'.

  **Reversal is applied before pagination!**
  """
  getPokemon(
    "Sets the offset for flavor texts from where to start."
    offsetFlavorTexts: Int = 0

    "Return this many flavour texts, up to the maximum of entries that the requested Pokémon has."
    takeFlavorTexts: Int = 1

    "Whether to reverse the list of games from which to get the data. By default Generation 1 is considered for 'take' first, when setting this to true that is instead Generation 8."
    reverseFlavorTexts: Boolean = true

    "The Pokémon to look up"
    pokemon: PokemonEnum!
  ): Pokemon!

  """
  Gets details on one or more Pokémon based on species name

  You can provide 'take' to limit the amount of Pokémon to return (default: 1), set the offset of where to start with 'offset', and reverse the entire array with 'reverse'.

  You can provide 'takeFlavorTexts' to limit the amount of flavour texts to return, set the offset of where to start with 'offsetFlavorTexts', and reverse the entire array with 'reverseFlavorTexts'.

  **Reversal is applied before pagination!**
  """
  getFuzzyPokemon(
    "Sets the offset where to start"
    offset: Int = 0

    "Return only this many results, starting from the offset"
    take: Int = 1

    "Reverses the dataset before paginating"
    reverse: Boolean = false

    "The Pokémon to fuzzily search"
    pokemon: String!

    "Sets the offset for flavor texts from where to start."
    offsetFlavorTexts: Int = 0

    "Return this many flavour texts, up to the maximum of entries that the requested Pokémon has."
    takeFlavorTexts: Int = 1

    "Whether to reverse the list of games from which to get the data. By default Generation 1 is considered for 'take' first, when setting this to true that is instead Generation 8."
    reverseFlavorTexts: Boolean = true
  ): [Pokemon!]!

  """
  Returns a list of all the known Pokémon.

  For every Pokémon all the data on each requested field is returned.

  **_NOTE:_ To skip all CAP Pokémon, PokéStar Pokémon, Missingno, and 'M (00) provide an 'offset' of 89**

  You can provide 'take' to limit the amount of Pokémon to return (default: 1), set the offset of where to start with 'offset', and reverse the entire array with 'reverse'.

  You can provide 'takeFlavorTexts' to limit the amount of flavour texts to return, set the offset of where to start with 'offsetFlavorTexts', and reverse the entire array with 'reverseFlavorTexts'.

  While the API will currently not rate limit the usage of this query, it may do so in the future.

  It is advisable to cache responses of this query.
  """
  getAllPokemon(
    "Sets the offset where to start"
    offset: Int = 0

    "Return only this many results, starting from the offset"
    take: Int = 1390

    "Reverses the dataset before paginating"
    reverse: Boolean = false

    "Sets the offset for flavor texts from where to start."
    offsetFlavorTexts: Int = 0

    "Return this many flavour texts, up to the maximum of entries that the requested Pokémon has."
    takeFlavorTexts: Int = 1

    "Whether to reverse the list of games from which to get the data. By default Generation 1 is considered for 'take' first, when setting this to true that is instead Generation 8."
    reverseFlavorTexts: Boolean = true
  ): [Pokemon!]!

  "Gets the details on a Pokémon item, using the item name"
  getItem("The item to look up" item: ItemsEnum!): Item!

  """
  Gets details on a Pokémon item, using a fuzzy search on name

  This can be used to find multiple results based on the query

  By default only 1 result is returned. You can provide the arguments 'take', 'offset', and 'reverse' to modify this behaviour.
  """
  getFuzzyItem(
    "Sets the offset where to start"
    offset: Int = 0

    "Return only this many results, starting from the offset"
    take: Int = 1

    "Reverses the dataset before paginating"
    reverse: Boolean = false

    "The item to fuzzily search"
    item: String!
  ): [Item!]!

  """
  Gets the learnsets for a given Pokémon and move.

  Multiple moves are possible by putting them in an array: '[move1, move2]'.

  You can also apply a generation filter (only results for the given generation will be returned) with the generation argument
  """
  getLearnset(
    "The generation filter to apply"
    generation: Int

    "The moves to match against the Pokémon"
    moves: [MovesEnum!]!

    "The Pokémon for which to get the learnset"
    pokemon: PokemonEnum!
  ): Learnset!

  """
  Gets the learnset for a given Pokémon and move.

  A fuzzy search is performed to find a matching Pokémon and move

  Multiple moves are possible by putting them in an array: '[move1, move2]'.

  You can also apply a generation filter (only results for the given generation will be returned) with the generation argument
  """
  getFuzzyLearnset(
    "The generation filter to apply"
    generation: Int

    "The moves to match against the Pokémon"
    moves: [String!]!

    "The Pokémon for which to get the learnset"
    pokemon: String!
  ): Learnset!

  "Gets the details on a Pokémon move, using the move name"
  getMove("The move to look up" move: MovesEnum!): Move!

  """
  Gets details on a Pokémon move, using a fuzzy search on name

  This can be used to find multiple results based on the query

  By default only 1 result is returned. You can provide the arguments 'take', "offset", and "reverse" to modify this behaviour.
  """
  getFuzzyMove(
    "Sets the offset where to start"
    offset: Int = 0

    "Return only this many results, starting from the offset"
    take: Int = 1

    "Reverses the dataset before paginating"
    reverse: Boolean = false

    "The move to fuzzily search"
    move: String!
  ): [Move!]!

  "Gets the type matchup data for the given type or types"
  getTypeMatchup("The primary type to check" primaryType: TypesEnum!, "The secondary type to check" secondaryType: TypesEnum): TypeMatchup!
}

"The supported abilities"
enum AbilitiesEnum {
  adaptability
  aerilate
  aftermath
  airlock
  analytic
  angerpoint
  angershell
  anticipation
  arenatrap
  armortail
  aromaveil
  asoneglastrier
  asonespectrier
  aurabreak
  baddreams
  ballfetch
  battery
  battlearmor
  battlebond
  beadsofruin
  beastboost
  berserk
  bigpecks
  blaze
  bulletproof
  cheekpouch
  chillingneigh
  chlorophyll
  clearbody
  cloudnine
  colorchange
  comatose
  commander
  competitive
  compoundeyes
  contrary
  corrosion
  costar
  cottondown
  cudchew
  curiousmedicine
  cursedbody
  cutecharm
  damp
  dancer
  darkaura
  dauntlessshield
  dazzling
  defeatist
  defiant
  deltastream
  desolateland
  disguise
  download
  dragonsmaw
  drizzle
  drought
  dryskin
  earlybird
  eartheater
  effectspore
  electricsurge
  electromorphosis
  emergencyexit
  fairyaura
  filter
  flamebody
  flareboost
  flashfire
  flowergift
  flowerveil
  fluffy
  forecast
  forewarn
  friendguard
  frisk
  fullmetalbody
  furcoat
  galewings
  galvanize
  gluttony
  goodasgold
  gooey
  gorillatactics
  grasspelt
  grassysurge
  grimneigh
  guarddog
  gulpmissile
  guts
  hadronengine
  harvest
  healer
  heatproof
  heavymetal
  honeygather
  hugepower
  hungerswitch
  hustle
  hydration
  hypercutter
  icebody
  iceface
  icescales
  illuminate
  illusion
  immunity
  imposter
  infiltrator
  innardsout
  innerfocus
  insomnia
  intimidate
  intrepidsword
  ironbarbs
  ironfist
  justified
  keeneye
  klutz
  leafguard
  levitate
  libero
  lightmetal
  lightningrod
  limber
  lingeringaroma
  liquidooze
  liquidvoice
  longreach
  magicbounce
  magicguard
  magician
  magmaarmor
  magnetpull
  marvelscale
  megalauncher
  merciless
  mimicry
  minus
  mirrorarmor
  mistysurge
  moldbreaker
  moody
  motordrive
  mountaineer
  moxie
  multiscale
  multitype
  mummy
  myceliummight
  naturalcure
  neuroforce
  neutralizinggas
  noability
  noguard
  normalize
  oblivious
  opportunist
  orichalcumpulse
  overcoat
  overgrow
  owntempo
  parentalbond
  pastelveil
  perishbody
  persistent
  pickpocket
  pickup
  pixilate
  plus
  poisonheal
  poisonpoint
  poisontouch
  powerconstruct
  powerofalchemy
  powerspot
  prankster
  pressure
  primordialsea
  prismarmor
  propellertail
  protean
  protosynthesis
  psychicsurge
  punkrock
  purepower
  purifyingsalt
  quarkdrive
  queenlymajesty
  quickdraw
  quickfeet
  raindish
  rattled
  rebound
  receiver
  reckless
  refrigerate
  regenerator
  ripen
  rivalry
  rkssystem
  rockhead
  rockypayload
  roughskin
  runaway
  sandforce
  sandrush
  sandspit
  sandstream
  sandveil
  sapsipper
  schooling
  scrappy
  screencleaner
  seedsower
  serenegrace
  shadowshield
  shadowtag
  sharpness
  shedskin
  sheerforce
  shellarmor
  shielddust
  shieldsdown
  simple
  skilllink
  slowstart
  slushrush
  sniper
  snowcloak
  snowwarning
  solarpower
  solidrock
  soulheart
  soundproof
  speedboost
  stakeout
  stall
  stalwart
  stamina
  stancechange
  static
  steadfast
  steamengine
  steelworker
  steelyspirit
  stench
  stickyhold
  stormdrain
  strongjaw
  sturdy
  suctioncups
  superluck
  supremeoverlord
  surgesurfer
  swarm
  sweetveil
  swiftswim
  swordofruin
  symbiosis
  synchronize
  tabletsofruin
  tangledfeet
  tanglinghair
  technician
  telepathy
  teravolt
  thermalexchange
  thickfat
  tintedlens
  torrent
  toughclaws
  toxicboost
  toxicdebris
  trace
  transistor
  triage
  truant
  turboblaze
  unaware
  unburden
  unnerve
  unseenfist
  vesselofruin
  victorystar
  vitalspirit
  voltabsorb
  wanderingspirit
  waterabsorb
  waterbubble
  watercompaction
  waterveil
  weakarmor
  wellbakedbody
  whitesmoke
  wimpout
  windpower
  windrider
  wonderguard
  wonderskin
  zenmode
  zerotohero
}

"The supported Pokémon"
enum PokemonEnum {
  pokestarsmeargle
  pokestarufo
  pokestarufo2
  pokestarbrycenman
  pokestarmt
  pokestarmt2
  pokestartransport
  pokestargiant
  pokestarhumanoid
  pokestarmonster
  pokestarf00
  pokestarf002
  pokestarspirit
  pokestarblackdoor
  pokestarwhitedoor
  pokestarblackbelt
  pokestarufopropu2
  syclar
  syclant
  revenankh
  embirch
  flarelm
  pyroak
  breezi
  fidgit
  rebble
  tactite
  stratagem
  privatyke
  arghonaut
  kitsunoh
  cyclohm
  colossoil
  krilowatt
  voodoll
  voodoom
  scratchet
  tomohawk
  necturine
  necturna
  mollux
  cupra
  argalis
  aurumoth
  brattler
  malaconda
  cawdet
  cawmodore
  volkritter
  volkraken
  snugglow
  plasmanta
  floatoy
  caimanoe
  naviathan
  crucibelle
  crucibellemega
  pluffle
  kerfluffle
  pajantom
  mumbao
  jumbao
  fawnifer
  electrelk
  caribolt
  smogecko
  smoguana
  smokomodo
  swirlpool
  coribalis
  snaelstrom
  justyke
  equilibra
  solotl
  astrolotl
  miasmite
  miasmaw
  chromera
  nohface
  monohm
  duohm
  dorsoil
  protowatt
  venomicon
  venomiconepilogue
  saharascal
  saharaja
  missingno
  m00
  bulbasaur
  ivysaur
  venusaur
  venusaurgmax
  venusaurmega
  charmander
  charmeleon
  charizard
  charizardmegax
  charizardmegay
  charizardgmax
  squirtle
  wartortle
  blastoise
  blastoisegmax
  blastoisemega
  caterpie
  metapod
  butterfree
  butterfreegmax
  weedle
  kakuna
  beedrill
  beedrillmega
  pidgey
  pidgeotto
  pidgeot
  pidgeotmega
  rattata
  rattataalola
  raticate
  raticatealola
  raticatealolatotem
  spearow
  fearow
  ekans
  arbok
  pikachu
  pikachugmax
  pikachucosplay
  pikachurockstar
  pikachubelle
  pikachupopstar
  pikachuphd
  pikachulibre
  pikachuoriginal
  pikachuhoenn
  pikachusinnoh
  pikachuunova
  pikachukalos
  pikachualola
  pikachupartner
  pikachustarter
  pikachuworld
  raichu
  raichualola
  sandshrew
  sandshrewalola
  sandslash
  sandslashalola
  nidoranf
  nidorina
  nidoqueen
  nidoranm
  nidorino
  nidoking
  clefairy
  clefable
  vulpix
  vulpixalola
  ninetales
  ninetalesalola
  jigglypuff
  wigglytuff
  zubat
  golbat
  oddish
  gloom
  vileplume
  paras
  parasect
  venonat
  venomoth
  diglett
  diglettalola
  dugtrio
  dugtrioalola
  meowth
  meowthalola
  meowthgalar
  meowthgmax
  persian
  persianalola
  psyduck
  golduck
  mankey
  primeape
  growlithe
  growlithehisui
  arcanine
  arcaninehisui
  poliwag
  poliwhirl
  poliwrath
  abra
  kadabra
  alakazam
  alakazammega
  machop
  machoke
  machamp
  machampgmax
  bellsprout
  weepinbell
  victreebel
  tentacool
  tentacruel
  geodude
  geodudealola
  graveler
  graveleralola
  golem
  golemalola
  ponyta
  ponytagalar
  rapidash
  rapidashgalar
  slowpoke
  slowpokegalar
  slowbro
  slowbrogalar
  slowbromega
  magnemite
  magneton
  farfetchd
  farfetchdgalar
  doduo
  dodrio
  seel
  dewgong
  grimer
  grimeralola
  muk
  mukalola
  shellder
  cloyster
  gastly
  haunter
  gengar
  gengarmega
  gengargmax
  onix
  drowzee
  hypno
  krabby
  kingler
  kinglergmax
  voltorb
  voltorbhisui
  electrode
  electrodehisui
  exeggcute
  exeggutor
  exeggutoralola
  cubone
  marowak
  marowakalola
  marowakalolatotem
  hitmonlee
  hitmonchan
  lickitung
  koffing
  weezing
  weezinggalar
  rhyhorn
  rhydon
  chansey
  tangela
  kangaskhan
  kangaskhanmega
  horsea
  seadra
  goldeen
  seaking
  staryu
  starmie
  mrmime
  mrmimegalar
  scyther
  jynx
  electabuzz
  magmar
  pinsir
  pinsirmega
  tauros
  taurospaldea
  taurospaldeafire
  taurospaldeawater
  magikarp
  gyarados
  gyaradosmega
  lapras
  laprasgmax
  ditto
  eevee
  eeveestarter
  eeveegmax
  vaporeon
  jolteon
  flareon
  porygon
  omanyte
  omastar
  kabuto
  kabutops
  aerodactyl
  aerodactylmega
  snorlax
  snorlaxgmax
  articuno
  articunogalar
  zapdos
  zapdosgalar
  moltres
  moltresgalar
  dratini
  dragonair
  dragonite
  mewtwo
  mewtwomegax
  mewtwomegay
  mew
  chikorita
  bayleef
  meganium
  cyndaquil
  quilava
  typhlosion
  typhlosionhisui
  totodile
  croconaw
  feraligatr
  sentret
  furret
  hoothoot
  noctowl
  ledyba
  ledian
  spinarak
  ariados
  crobat
  chinchou
  lanturn
  pichu
  pichuspikyeared
  cleffa
  igglybuff
  togepi
  togetic
  natu
  xatu
  mareep
  flaaffy
  ampharos
  ampharosmega
  bellossom
  marill
  azumarill
  sudowoodo
  politoed
  hoppip
  skiploom
  jumpluff
  aipom
  sunkern
  sunflora
  yanma
  wooper
  wooperpaldea
  quagsire
  espeon
  umbreon
  murkrow
  slowking
  slowkinggalar
  misdreavus
  unown
  wobbuffet
  girafarig
  pineco
  forretress
  dunsparce
  gligar
  steelix
  steelixmega
  snubbull
  granbull
  qwilfish
  qwilfishhisui
  scizor
  scizormega
  shuckle
  heracross
  heracrossmega
  sneasel
  sneaselhisui
  teddiursa
  ursaring
  slugma
  magcargo
  swinub
  piloswine
  corsola
  corsolagalar
  remoraid
  octillery
  delibird
  mantine
  skarmory
  houndour
  houndoom
  houndoommega
  kingdra
  phanpy
  donphan
  porygon2
  stantler
  smeargle
  tyrogue
  hitmontop
  smoochum
  elekid
  magby
  miltank
  blissey
  raikou
  entei
  suicune
  larvitar
  pupitar
  tyranitar
  tyranitarmega
  lugia
  hooh
  celebi
  treecko
  grovyle
  sceptile
  sceptilemega
  torchic
  combusken
  blaziken
  blazikenmega
  mudkip
  marshtomp
  swampert
  swampertmega
  poochyena
  mightyena
  zigzagoon
  zigzagoongalar
  linoone
  linoonegalar
  wurmple
  silcoon
  beautifly
  cascoon
  dustox
  lotad
  lombre
  ludicolo
  seedot
  nuzleaf
  shiftry
  taillow
  swellow
  wingull
  pelipper
  ralts
  kirlia
  gardevoir
  gardevoirmega
  surskit
  masquerain
  shroomish
  breloom
  slakoth
  vigoroth
  slaking
  nincada
  ninjask
  shedinja
  whismur
  loudred
  exploud
  makuhita
  hariyama
  azurill
  nosepass
  skitty
  delcatty
  sableye
  sableyemega
  mawile
  mawilemega
  aron
  lairon
  aggron
  aggronmega
  meditite
  medicham
  medichammega
  electrike
  manectric
  manectricmega
  plusle
  minun
  volbeat
  illumise
  roselia
  gulpin
  swalot
  carvanha
  sharpedo
  sharpedomega
  wailmer
  wailord
  numel
  camerupt
  cameruptmega
  torkoal
  spoink
  grumpig
  spinda
  trapinch
  vibrava
  flygon
  cacnea
  cacturne
  swablu
  altaria
  altariamega
  zangoose
  seviper
  lunatone
  solrock
  barboach
  whiscash
  corphish
  crawdaunt
  baltoy
  claydol
  lileep
  cradily
  anorith
  armaldo
  feebas
  milotic
  castform
  castformsunny
  castformrainy
  castformsnowy
  kecleon
  shuppet
  banette
  banettemega
  duskull
  dusclops
  tropius
  chimecho
  absol
  absolmega
  wynaut
  snorunt
  glalie
  glaliemega
  spheal
  sealeo
  walrein
  clamperl
  huntail
  gorebyss
  relicanth
  luvdisc
  bagon
  shelgon
  salamence
  salamencemega
  beldum
  metang
  metagross
  metagrossmega
  regirock
  regice
  registeel
  latias
  latiasmega
  latios
  latiosmega
  kyogre
  kyogreprimal
  groudon
  groudonprimal
  rayquaza
  rayquazamega
  jirachi
  deoxys
  deoxysattack
  deoxysdefense
  deoxysspeed
  turtwig
  grotle
  torterra
  chimchar
  monferno
  infernape
  piplup
  prinplup
  empoleon
  starly
  staravia
  staraptor
  bidoof
  bibarel
  kricketot
  kricketune
  shinx
  luxio
  luxray
  budew
  roserade
  cranidos
  rampardos
  shieldon
  bastiodon
  burmy
  wormadam
  wormadamsandy
  wormadamtrash
  mothim
  combee
  vespiquen
  pachirisu
  buizel
  floatzel
  cherubi
  cherrim
  cherrimsunshine
  shellos
  gastrodon
  ambipom
  drifloon
  drifblim
  buneary
  lopunny
  lopunnymega
  mismagius
  honchkrow
  glameow
  purugly
  chingling
  stunky
  skuntank
  bronzor
  bronzong
  bonsly
  mimejr
  happiny
  chatot
  spiritomb
  gible
  gabite
  garchomp
  garchompmega
  munchlax
  riolu
  lucario
  lucariomega
  hippopotas
  hippowdon
  skorupi
  drapion
  croagunk
  toxicroak
  carnivine
  finneon
  lumineon
  mantyke
  snover
  abomasnow
  abomasnowmega
  weavile
  magnezone
  lickilicky
  rhyperior
  tangrowth
  electivire
  magmortar
  togekiss
  yanmega
  leafeon
  glaceon
  gliscor
  mamoswine
  porygonz
  gallade
  gallademega
  probopass
  dusknoir
  froslass
  rotom
  rotomheat
  rotomwash
  rotomfrost
  rotomfan
  rotommow
  uxie
  mesprit
  azelf
  dialga
  dialgaorigin
  palkia
  palkiaorigin
  heatran
  regigigas
  giratina
  giratinaorigin
  cresselia
  phione
  manaphy
  darkrai
  shaymin
  shayminsky
  arceus
  arceusbug
  arceusdark
  arceusdragon
  arceuselectric
  arceusfairy
  arceusfighting
  arceusfire
  arceusflying
  arceusghost
  arceusgrass
  arceusground
  arceusice
  arceuspoison
  arceuspsychic
  arceusrock
  arceussteel
  arceuswater
  arceuslegend
  victini
  snivy
  servine
  serperior
  tepig
  pignite
  emboar
  oshawott
  dewott
  samurott
  samurotthisui
  patrat
  watchog
  lillipup
  herdier
  stoutland
  purrloin
  liepard
  pansage
  simisage
  pansear
  simisear
  panpour
  simipour
  munna
  musharna
  pidove
  tranquill
  unfezant
  blitzle
  zebstrika
  roggenrola
  boldore
  gigalith
  woobat
  swoobat
  drilbur
  excadrill
  audino
  audinomega
  timburr
  gurdurr
  conkeldurr
  tympole
  palpitoad
  seismitoad
  throh
  sawk
  sewaddle
  swadloon
  leavanny
  venipede
  whirlipede
  scolipede
  cottonee
  whimsicott
  petilil
  lilligant
  lilliganthisui
  basculin
  basculinbluestriped
  basculinwhitestriped
  sandile
  krokorok
  krookodile
  darumaka
  darumakagalar
  darmanitan
  darmanitangalar
  darmanitanzen
  darmanitangalarzen
  maractus
  dwebble
  crustle
  scraggy
  scrafty
  sigilyph
  yamask
  yamaskgalar
  cofagrigus
  tirtouga
  carracosta
  archen
  archeops
  trubbish
  garbodor
  garbodorgmax
  zorua
  zoruahisui
  zoroark
  zoroarkhisui
  minccino
  cinccino
  gothita
  gothorita
  gothitelle
  solosis
  duosion
  reuniclus
  ducklett
  swanna
  vanillite
  vanillish
  vanilluxe
  deerling
  sawsbuck
  emolga
  karrablast
  escavalier
  foongus
  amoonguss
  frillish
  frillishfemale
  jellicent
  jellicentfemale
  alomomola
  joltik
  galvantula
  ferroseed
  ferrothorn
  klink
  klang
  klinklang
  tynamo
  eelektrik
  eelektross
  elgyem
  beheeyem
  litwick
  lampent
  chandelure
  axew
  fraxure
  haxorus
  cubchoo
  beartic
  cryogonal
  shelmet
  accelgor
  stunfisk
  stunfiskgalar
  mienfoo
  mienshao
  druddigon
  golett
  golurk
  pawniard
  bisharp
  bouffalant
  rufflet
  braviary
  braviaryhisui
  vullaby
  mandibuzz
  heatmor
  durant
  deino
  zweilous
  hydreigon
  larvesta
  volcarona
  cobalion
  terrakion
  virizion
  tornadus
  tornadustherian
  thundurus
  thundurustherian
  reshiram
  zekrom
  landorus
  landorustherian
  kyurem
  kyuremblack
  kyuremwhite
  keldeo
  keldeoresolute
  meloetta
  meloettapirouette
  genesect
  genesectdouse
  genesectshock
  genesectburn
  genesectchill
  chespin
  quilladin
  chesnaught
  fennekin
  braixen
  delphox
  froakie
  frogadier
  greninja
  greninjaash
  bunnelby
  diggersby
  fletchling
  fletchinder
  talonflame
  scatterbug
  spewpa
  vivillon
  vivillonfancy
  vivillonpokeball
  litleo
  pyroar
  flabebe
  floette
  floetteeternal
  florges
  skiddo
  gogoat
  pancham
  pangoro
  furfrou
  espurr
  meowstic
  meowsticf
  honedge
  doublade
  aegislash
  aegislashblade
  spritzee
  aromatisse
  swirlix
  slurpuff
  inkay
  malamar
  binacle
  barbaracle
  skrelp
  dragalge
  clauncher
  clawitzer
  helioptile
  heliolisk
  tyrunt
  tyrantrum
  amaura
  aurorus
  sylveon
  hawlucha
  dedenne
  carbink
  goomy
  sliggoo
  sliggoohisui
  goodra
  goodrahisui
  klefki
  phantump
  trevenant
  pumpkaboo
  pumpkaboosmall
  pumpkaboolarge
  pumpkaboosuper
  gourgeist
  gourgeistsmall
  gourgeistlarge
  gourgeistsuper
  bergmite
  avalugg
  avalugghisui
  noibat
  noivern
  xerneas
  xerneasneutral
  yveltal
  zygarde
  zygarde10
  zygardecomplete
  diancie
  dianciemega
  hoopa
  hoopaunbound
  volcanion
  rowlet
  dartrix
  decidueye
  decidueyehisui
  litten
  torracat
  incineroar
  popplio
  brionne
  primarina
  pikipek
  trumbeak
  toucannon
  yungoos
  gumshoos
  gumshoostotem
  grubbin
  charjabug
  vikavolt
  vikavolttotem
  crabrawler
  crabominable
  oricorio
  oricoriopompom
  oricoriopau
  oricoriosensu
  cutiefly
  ribombee
  ribombeetotem
  rockruff
  lycanroc
  lycanrocmidnight
  lycanrocdusk
  wishiwashi
  wishiwashischool
  mareanie
  toxapex
  mudbray
  mudsdale
  dewpider
  araquanid
  araquanidtotem
  fomantis
  lurantis
  lurantistotem
  morelull
  shiinotic
  salandit
  salazzle
  salazzletotem
  stufful
  bewear
  bounsweet
  steenee
  tsareena
  comfey
  oranguru
  passimian
  wimpod
  golisopod
  sandygast
  palossand
  pyukumuku
  typenull
  silvally
  silvallybug
  silvallydark
  silvallydragon
  silvallyelectric
  silvallyfairy
  silvallyfighting
  silvallyfire
  silvallyflying
  silvallyghost
  silvallygrass
  silvallyground
  silvallyice
  silvallypoison
  silvallypsychic
  silvallyrock
  silvallysteel
  silvallywater
  minior
  miniormeteor
  komala
  turtonator
  togedemaru
  togedemarutotem
  mimikyu
  mimikyubusted
  mimikyutotem
  mimikyubustedtotem
  bruxish
  drampa
  dhelmise
  jangmoo
  hakamoo
  kommoo
  kommoototem
  tapukoko
  tapulele
  tapubulu
  tapufini
  cosmog
  cosmoem
  solgaleo
  lunala
  nihilego
  buzzwole
  pheromosa
  xurkitree
  celesteela
  kartana
  guzzlord
  necrozma
  necrozmaduskmane
  necrozmadawnwings
  necrozmaultra
  magearna
  magearnaoriginal
  marshadow
  poipole
  naganadel
  stakataka
  blacephalon
  zeraora
  meltan
  melmetal
  melmetalgmax
  grookey
  thwackey
  rillaboom
  rillaboomgmax
  scorbunny
  raboot
  cinderace
  cinderacegmax
  sobble
  drizzile
  inteleon
  inteleongmax
  skwovet
  greedent
  rookidee
  corvisquire
  corviknight
  corviknightgmax
  blipbug
  dottler
  orbeetle
  orbeetlegmax
  nickit
  thievul
  gossifleur
  eldegoss
  wooloo
  dubwool
  chewtle
  drednaw
  drednawgmax
  yamper
  boltund
  rolycoly
  carkol
  coalossal
  coalossalgmax
  applin
  flapple
  flapplegmax
  appletun
  appletungmax
  silicobra
  sandaconda
  sandacondagmax
  cramorant
  cramorantgulping
  cramorantgorging
  arrokuda
  barraskewda
  toxel
  toxtricity
  toxtricitylowkey
  toxtricitygmax
  toxtricitylowkeygmax
  sizzlipede
  centiskorch
  centiskorchgmax
  clobbopus
  grapploct
  sinistea
  sinisteaantique
  polteageist
  polteageistantique
  hatenna
  hattrem
  hatterene
  hatterenegmax
  impidimp
  morgrem
  grimmsnarl
  grimmsnarlgmax
  obstagoon
  perrserker
  cursola
  sirfetchd
  mrrime
  runerigus
  milcery
  alcremie
  alcremiegmax
  falinks
  pincurchin
  snom
  frosmoth
  stonjourner
  eiscue
  eiscuenoice
  indeedee
  indeedeef
  morpeko
  morpekohangry
  cufant
  copperajah
  copperajahgmax
  dracozolt
  arctozolt
  dracovish
  arctovish
  duraludon
  duraludongmax
  dreepy
  drakloak
  dragapult
  zacian
  zaciancrowned
  zamazenta
  zamazentacrowned
  eternatus
  eternatuseternamax
  kubfu
  urshifu
  urshifurapidstrike
  urshifugmax
  urshifurapidstrikegmax
  zarude
  zarudedada
  regieleki
  regidrago
  glastrier
  spectrier
  calyrex
  calyrexice
  calyrexshadow
  wyrdeer
  kleavor
  ursaluna
  basculegion
  basculegionf
  sneasler
  overqwil
  enamorus
  enamorustherian
  sprigatito
  floragato
  meowscarada
  fuecoco
  crocalor
  skeledirge
  quaxly
  quaxwell
  quaquaval
  lechonk
  oinkologne
  oinkolognef
  tarountula
  spidops
  nymble
  lokix
  pawmi
  pawmo
  pawmot
  tandemaus
  maushold
  mausholdfour
  fidough
  dachsbun
  smoliv
  dolliv
  arboliva
  squawkabilly
  squawkabillyblue
  squawkabillyyellow
  squawkabillywhite
  nacli
  naclstack
  garganacl
  charcadet
  armarouge
  ceruledge
  tadbulb
  bellibolt
  wattrel
  kilowattrel
  maschiff
  mabosstiff
  shroodle
  grafaiai
  bramblin
  brambleghast
  toedscool
  toedscruel
  klawf
  capsakid
  scovillain
  rellor
  rabsca
  flittle
  espathra
  tinkatink
  tinkatuff
  tinkaton
  wiglett
  wugtrio
  bombirdier
  finizen
  palafin
  palafinhero
  varoom
  revavroom
  cyclizar
  orthworm
  glimmet
  glimmora
  greavard
  houndstone
  flamigo
  cetoddle
  cetitan
  veluza
  dondozo
  tatsugiri
  annihilape
  clodsire
  farigiraf
  dudunsparce
  dudunsparcethreesegment
  kingambit
  greattusk
  screamtail
  brutebonnet
  fluttermane
  slitherwing
  sandyshocks
  irontreads
  ironbundle
  ironhands
  ironjugulis
  ironmoth
  ironthorns
  frigibax
  arctibax
  baxcalibur
  gimmighoul
  gimmighoulroaming
  gholdengo
  wochien
  chienpao
  tinglu
  chiyu
  roaringmoon
  ironvaliant
  koraidon
  miraidon
}

"The supported items"
enum ItemsEnum {
  abilityshield
  abomasite
  absolite
  absorbbulb
  acrobike
  adamantorb
  adrenalineorb
  adventureguide
  aerodactylite
  aggronite
  aguavberry
  airballoon
  alakazite
  aloraichiumz
  altarianite
  ampharosite
  apicotberry
  apricornbox
  aquasuit
  armorfossil
  aspearberry
  assaultvest
  audinite
  auroraticket
  auspiciousarmor
  autograph
  azureflute
  babiriberry
  bandautograph
  banettite
  basementkey
  beastball
  beedrillite
  belueberry
  berry
  berryjuice
  berrypots
  berrypouch
  berrysweet
  berserkgene
  bicycle
  bigroot
  bikevoucher
  bindingband
  bitterberry
  blackbelt
  blackglasses
  blacksludge
  blastoisinite
  blazikenite
  bluecard
  blueorb
  bluepetal
  blukberry
  blunderpolicy
  boosterenergy
  bottlecap
  brightpowder
  buggem
  buginiumz
  bugmemory
  bugterashard
  burndrive
  burntberry
  cameruptite
  campinggear
  cardkey
  catchingcharm
  cellbattery
  charcoal
  charizarditex
  charizarditey
  chartiberry
  cheriberry
  cherishball
  chestoberry
  chilanberry
  chilldrive
  chippedpot
  choiceband
  choicescarf
  choicespecs
  chopleberry
  clawfossil
  clearamulet
  clearbell
  cloversweet
  cobaberry
  coincase
  colburberry
  colressmchn
  contestcostume
  contestpass
  cornnberry
  coupon1
  coupon2
  coupon3
  coverfossil
  covertcloak
  crackedpot
  crucibellite
  custapberry
  damprock
  darkgem
  darkiniumz
  darkmemory
  darkstone
  darkterashard
  dawnstone
  decidiumz
  deepseascale
  deepseatooth
  destinyknot
  devongoods
  devonparts
  devonscope
  devonscubagear
  diancite
  diveball
  dnasplicers
  domefossil
  dousedrive
  dowsingmachine
  dowsingmchn
  dracoplate
  dragonfang
  dragongem
  dragoniumz
  dragonmemory
  dragonscale
  dragonskull
  dragonterashard
  dreadplate
  dreamball
  droppeditem
  dubiousdisc
  durinberry
  duskball
  duskstone
  dynamaxband
  earthplate
  eeviumz
  eggcard
  ejectbutton
  ejectpack
  electirizer
  electricgem
  electricmemory
  electricseed
  electricterashard
  electriumz
  elevatorkey
  endorsement
  energypowder
  enigmaberry
  enigmastone
  enigmaticcard
  eonflute
  eonticket
  escaperope
  eviolite
  expertbelt
  explorerkit
  expshare
  fairiumz
  fairygem
  fairymemory
  fairyterashard
  famechecker
  fashioncase
  fastball
  fightinggem
  fightingmemory
  fightingterashard
  fightiniumz
  figyberry
  firegem
  firememory
  firestone
  fireterashard
  firiumz
  fishingrod
  fistplate
  flameorb
  flameplate
  floatstone
  flowersweet
  flyinggem
  flyingmemory
  flyingterashard
  flyiniumz
  focusband
  focussash
  foragebag
  fossilizedbird
  fossilizeddino
  fossilizeddrake
  fossilizedfish
  friendball
  fullincense
  fullrestore
  galactickey
  galaricacuff
  galaricawreath
  galladite
  ganlonberry
  garchompite
  gardevoirite
  gbsounds
  gengarite
  ghostgem
  ghostiumz
  ghostmemory
  ghostterashard
  glalitite
  godstone
  gogoggles
  goldberry
  goldbottlecap
  goldteeth
  goodrod
  gracidea
  gram1
  gram2
  gram3
  grassgem
  grassiumz
  grassmemory
  grassterashard
  grassyseed
  greatball
  greenpetal
  grepaberry
  gripclaw
  griseousorb
  groundgem
  groundiumz
  groundmemory
  groundterashard
  grubbyhanky
  gsball
  gyaradosite
  habanberry
  hardstone
  healball
  heatrock
  heavyball
  heavydutyboots
  helixfossil
  heracronite
  hitechearbuds
  holocaster
  hondewberry
  honorofkalos
  houndoominite
  hyperpotion
  iapapaberry
  iceberry
  icegem
  icememory
  icestone
  iceterashard
  icicleplate
  iciumz
  icyrock
  ilimasnormaliumz
  inciniumz
  insectplate
  intriguingstone
  ironball
  ironplate
  itemfinder
  jabocaberry
  jadeorb
  jawfossil
  journal
  kangaskhanite
  kasibberry
  kebiaberry
  keeberry
  kelpsyberry
  keystone
  keytoroom1
  keytoroom2
  keytoroom4
  keytoroom6
  kingsrock
  kofuswallet
  kommoniumz
  koraidonspokeball
  laggingtail
  lansatberry
  latiasite
  latiosite
  laxincense
  leafstone
  leek
  leftovers
  leftpokeball
  legendplate
  lenscase
  leppaberry
  letter
  levelball
  libertypass
  liechiberry
  lifeorb
  liftkey
  lightball
  lightclay
  lightstone
  loadeddice
  lockcapsule
  lookerticket
  lootsack
  lopunnite
  lostitem
  loveball
  lovesweet
  lucarionite
  luckypunch
  lumberry
  luminousmoss
  lunaliumz
  lunarwing
  lureball
  lustrousorb
  luxuryball
  lycaniumz
  machbike
  machinepart
  machobrace
  magmaemblem
  magmarizer
  magmastone
  magmasuit
  magnet
  magoberry
  magostberry
  mail
  makeupbag
  maliciousarmor
  manectite
  marangaberry
  marshadiumz
  masterball
  mawilite
  maxpotion
  meadowplate
  medalbox
  medichamite
  megabracelet
  megaring
  membercard
  mentalherb
  metagrossite
  metalcoat
  metalpowder
  meteorite
  meteoriteshard
  metronome
  mewniumz
  mewtwonitex
  mewtwonitey
  micleberry
  mimikiumz
  mindplate
  mintberry
  miracleberry
  miracleseed
  miraidonspokeball
  mirrorherb
  mistyseed
  moonball
  moonflute
  moonstone
  muscleband
  mysteryberry
  mysteryegg
  mysticticket
  mysticwater
  nanabberry
  nestball
  netball
  nevermeltice
  nlunarizer
  nomelberry
  normalgem
  normaliumz
  normalterashard
  nsolarizer
  oaksletter
  oaksparcel
  occaberry
  oddincense
  oldamber
  oldcharm
  oldletter
  oldrod
  oldseamap
  oranberry
  orangepetal
  ovalcharm
  ovalstone
  pairoftickets
  palpad
  pamtreberry
  parcel
  parkball
  pass
  passhoberry
  payapaberry
  pechaberry
  permit
  persimberry
  petayaberry
  photoalbum
  pidgeotite
  pikaniumz
  pikashuniumz
  pinapberry
  pinkbow
  pinkpetal
  pinsirite
  pixieplate
  plasmacard
  plumefossil
  poffincase
  pointcard
  poisonbarb
  poisongem
  poisoniumz
  poisonmemory
  poisonterashard
  pokeball
  pokeblockcase
  pokeblockkit
  pokeflute
  pokemonboxlink
  pokeradar
  polkadotbow
  pomegberry
  potion
  powderjar
  poweranklet
  powerband
  powerbelt
  powerbracer
  powerherb
  powerlens
  powerplantpass
  powerweight
  premierball
  primariumz
  prismscale
  prisonbottle
  professorsmask
  profsletter
  propcase
  protectivepads
  protector
  przcureberry
  psncureberry
  psychicgem
  psychicmemory
  psychicseed
  psychicterashard
  psychiumz
  punchingglove
  purplepetal
  qualotberry
  quickball
  quickclaw
  quickpowder
  rabutaberry
  ragecandybar
  rainbowflower
  rainbowpass
  rainbowwing
  rarebone
  rawstberry
  razorclaw
  razorfang
  razzberry
  reapercloth
  redcard
  redchain
  redorb
  redpetal
  redscale
  repeatball
  revealglass
  ribbonsweet
  ridepager
  rindoberry
  ringtarget
  rm1key
  rm2key
  rm4key
  rm6key
  rockgem
  rockincense
  rockiumz
  rockmemory
  rockterashard
  rockyhelmet
  rollerskates
  roomservice
  rootfossil
  roseincense
  roseliberry
  rotombike
  rotomcatalog
  rotomphone
  rowapberry
  ruby
  rulebook
  rustedshield
  rustedsword
  sablenite
  sachet
  safariball
  safetygoggles
  sailfossil
  salacberry
  salamencite
  sandwhich
  sapphire
  scanner
  scarletbook
  sceptilite
  scizorite
  scopelens
  seaincense
  sealbag
  sealcase
  secretkey
  secretpotion
  sharpbeak
  sharpedonite
  shedshell
  shellbell
  shinycharm
  shinystone
  shockdrive
  shucaberry
  silkscarf
  silphscope
  silverpowder
  silverwing
  sitrusberry
  skullfossil
  skyplate
  slowbronite
  slowpoketail
  smoothrock
  snorliumz
  snowball
  softsand
  solganiumz
  soniasbook
  sootsack
  souldew
  sparklingstone
  spelltag
  spelonberry
  splashplate
  spookyplate
  sportball
  sprayduck
  sprinklotad
  squirtbottle
  ssticket
  starfberry
  starsweet
  steelgem
  steeliumz
  steelixite
  steelmemory
  steelterashard
  stick
  stickybarb
  stoneplate
  storagekey
  strawberrysweet
  suitekey
  sunflute
  sunstone
  superpotion
  superrod
  surgebadge
  swampertite
  sweetapple
  tamatoberry
  tangaberry
  tapuniumz
  tartapple
  tea
  teachytv
  teraorb
  terrainextender
  thickclub
  throatspray
  thunderstone
  tidalbell
  timerball
  tmcase
  tmvpass
  townmap
  toxicorb
  toxicplate
  traveltrunk
  tripass
  twistedspoon
  tyranitarite
  ultraball
  ultranecroziumz
  unownreport
  upgrade
  utilityumbrella
  venusaurite
  vilevial
  violetbook
  vsrecorder
  vsseeker
  wacanberry
  wailmerpail
  watergem
  wateriumz
  watermemory
  waterstone
  waterterashard
  watmelberry
  waveincense
  weaknesspolicy
  wepearberry
  whippeddream
  whiteherb
  widelens
  wikiberry
  wiseglasses
  wishingstar
  workskey
  xtransceiver
  yacheberry
  yellowpetal
  zapplate
  zoomlens
  zpowering
  zring
  zygardecube
}

"The supported moves"
enum MovesEnum {
  absorb
  accelerock
  acid
  acidarmor
  aciddownpour
  acidspray
  acrobatics
  acupressure
  aerialace
  aeroblast
  afteryou
  agility
  aircutter
  airslash
  alloutpummeling
  allyswitch
  amnesia
  anchorshot
  ancientpower
  appleacid
  aquacutter
  aquajet
  aquaring
  aquastep
  aquatail
  armorcannon
  armthrust
  aromatherapy
  aromaticmist
  assist
  assurance
  astonish
  astralbarrage
  attackorder
  attract
  aurasphere
  aurawheel
  aurorabeam
  auroraveil
  autotomize
  avalanche
  axekick
  babydolleyes
  baddybad
  banefulbunker
  barbbarrage
  barrage
  barrier
  batonpass
  beakblast
  beatup
  behemothbash
  behemothblade
  belch
  bellydrum
  bestow
  bide
  bind
  bite
  bitterblade
  bittermalice
  blackholeeclipse
  blastburn
  blazekick
  blazingtorque
  bleakwindstorm
  blizzard
  block
  bloomdoom
  blueflare
  bodypress
  bodyslam
  boltbeak
  boltstrike
  boneclub
  bonemerang
  bonerush
  boomburst
  bounce
  bouncybubble
  branchpoke
  bravebird
  breakingswipe
  breakneckblitz
  brickbreak
  brine
  brutalswing
  bubble
  bubblebeam
  bugbite
  bugbuzz
  bulkup
  bulldoze
  bulletpunch
  bulletseed
  burningjealousy
  burnup
  buzzybuzz
  calmmind
  camouflage
  captivate
  catastropika
  ceaselessedge
  celebrate
  charge
  chargebeam
  charm
  chatter
  chillingwater
  chillyreception
  chipaway
  chloroblast
  circlethrow
  clamp
  clangingscales
  clangoroussoul
  clangoroussoulblaze
  clearsmog
  closecombat
  coaching
  coil
  collisioncourse
  combattorque
  cometpunch
  comeuppance
  confide
  confuseray
  confusion
  constrict
  continentalcrush
  conversion
  conversion2
  copycat
  coreenforcer
  corkscrewcrash
  corrosivegas
  cosmicpower
  cottonguard
  cottonspore
  counter
  courtchange
  covet
  crabhammer
  craftyshield
  crosschop
  crosspoison
  crunch
  crushclaw
  crushgrip
  curse
  cut
  darkestlariat
  darkpulse
  darkvoid
  dazzlinggleam
  decorate
  defendorder
  defensecurl
  defog
  destinybond
  detect
  devastatingdrake
  diamondstorm
  dig
  direclaw
  disable
  disarmingvoice
  discharge
  dive
  dizzypunch
  doodle
  doomdesire
  doubleedge
  doublehit
  doubleironbash
  doublekick
  doubleshock
  doubleslap
  doubleteam
  dracometeor
  dragonascent
  dragonbreath
  dragonclaw
  dragondance
  dragondarts
  dragonenergy
  dragonhammer
  dragonpulse
  dragonrage
  dragonrush
  dragontail
  drainingkiss
  drainpunch
  dreameater
  drillpeck
  drillrun
  drumbeating
  dualchop
  dualwingbeat
  dynamaxcannon
  dynamicpunch
  earthpower
  earthquake
  echoedvoice
  eerieimpulse
  eeriespell
  eggbomb
  electricterrain
  electrify
  electroball
  electrodrift
  electroweb
  embargo
  ember
  encore
  endeavor
  endure
  energyball
  entrainment
  eruption
  esperwing
  eternabeam
  expandingforce
  explosion
  extrasensory
  extremeevoboost
  extremespeed
  facade
  fairylock
  fairywind
  fakeout
  faketears
  falsesurrender
  falseswipe
  featherdance
  feint
  feintattack
  fellstinger
  fierydance
  fierywrath
  filletaway
  finalgambit
  fireblast
  firefang
  firelash
  firepledge
  firepunch
  firespin
  firstimpression
  fishiousrend
  fissure
  flail
  flameburst
  flamecharge
  flamethrower
  flamewheel
  flareblitz
  flash
  flashcannon
  flatter
  fleurcannon
  fling
  flipturn
  floatyfall
  floralhealing
  flowershield
  flowertrick
  fly
  flyingpress
  focusblast
  focusenergy
  focuspunch
  followme
  forcepalm
  foresight
  forestscurse
  foulplay
  freezedry
  freezeshock
  freezingglare
  freezyfrost
  frenzyplant
  frostbreath
  frustration
  furyattack
  furycutter
  furyswipes
  fusionbolt
  fusionflare
  futuresight
  gastroacid
  geargrind
  gearup
  genesissupernova
  geomancy
  gigadrain
  gigaimpact
  gigatonhammer
  gigavolthavoc
  glaciallance
  glaciate
  glaiverush
  glare
  glitzyglow
  gmaxbefuddle
  gmaxcannonade
  gmaxcentiferno
  gmaxchistrike
  gmaxcuddle
  gmaxdepletion
  gmaxdrumsolo
  gmaxfinale
  gmaxfireball
  gmaxfoamburst
  gmaxgoldrush
  gmaxgravitas
  gmaxhydrosnipe
  gmaxmalodor
  gmaxmeltdown
  gmaxoneblow
  gmaxrapidflow
  gmaxreplenish
  gmaxresonance
  gmaxsandblast
  gmaxsmite
  gmaxsnooze
  gmaxsteelsurge
  gmaxstonesurge
  gmaxstunshock
  gmaxsweetness
  gmaxtartness
  gmaxterror
  gmaxvinelash
  gmaxvolcalith
  gmaxvoltcrash
  gmaxwildfire
  gmaxwindrage
  grassknot
  grasspledge
  grasswhistle
  grassyglide
  grassyterrain
  gravapple
  gravity
  growl
  growth
  grudge
  guardianofalola
  guardsplit
  guardswap
  guillotine
  gunkshot
  gust
  gyroball
  hail
  hammerarm
  happyhour
  harden
  haze
  headbutt
  headcharge
  headlongrush
  headsmash
  healbell
  healblock
  healingwish
  healorder
  healpulse
  heartstamp
  heartswap
  heatcrash
  heatwave
  heavyslam
  helpinghand
  hex
  hiddenpower
  hiddenpowerbug
  hiddenpowerdark
  hiddenpowerdragon
  hiddenpowerelectric
  hiddenpowerfighting
  hiddenpowerfire
  hiddenpowerflying
  hiddenpowerghost
  hiddenpowergrass
  hiddenpowerground
  hiddenpowerice
  hiddenpowerpoison
  hiddenpowerpsychic
  hiddenpowerrock
  hiddenpowersteel
  hiddenpowerwater
  highhorsepower
  highjumpkick
  holdback
  holdhands
  honeclaws
  hornattack
  horndrill
  hornleech
  howl
  hurricane
  hydrocannon
  hydropump
  hydrovortex
  hyperbeam
  hyperdrill
  hyperfang
  hyperspacefury
  hyperspacehole
  hypervoice
  hypnosis
  iceball
  icebeam
  iceburn
  icefang
  icehammer
  icepunch
  iceshard
  icespinner
  iciclecrash
  iciclespear
  icywind
  imprison
  incinerate
  infernalparade
  inferno
  infernooverdrive
  infestation
  ingrain
  instruct
  iondeluge
  irondefense
  ironhead
  irontail
  jawlock
  jetpunch
  judgment
  jumpkick
  junglehealing
  karatechop
  kinesis
  kingsshield
  knockoff
  kowtowcleave
  landswrath
  laserfocus
  lashout
  lastresort
  lastrespects
  lavaplume
  leafage
  leafblade
  leafstorm
  leaftornado
  leechlife
  leechseed
  leer
  letssnuggleforever
  lick
  lifedew
  lightofruin
  lightscreen
  lightthatburnsthesky
  liquidation
  lockon
  lovelykiss
  lowkick
  lowsweep
  luckychant
  luminacrash
  lunarblessing
  lunardance
  lunge
  lusterpurge
  machpunch
  magicalleaf
  magicaltorque
  magiccoat
  magicpowder
  magicroom
  magikarpsrevenge
  magmastorm
  magnetbomb
  magneticflux
  magnetrise
  magnitude
  makeitrain
  maliciousmoonsault
  matblock
  maxairstream
  maxdarkness
  maxflare
  maxflutterby
  maxgeyser
  maxguard
  maxhailstorm
  maxknuckle
  maxlightning
  maxmindstorm
  maxooze
  maxovergrowth
  maxphantasm
  maxquake
  maxrockfall
  maxstarfall
  maxsteelspike
  maxstrike
  maxwyrmwind
  meanlook
  meditate
  mefirst
  megadrain
  megahorn
  megakick
  megapunch
  memento
  menacingmoonrazemaelstrom
  metalburst
  metalclaw
  metalsound
  meteorassault
  meteorbeam
  meteormash
  metronome
  milkdrink
  mimic
  mindblown
  mindreader
  minimize
  miracleeye
  mirrorcoat
  mirrormove
  mirrorshot
  mist
  mistball
  mistyexplosion
  mistyterrain
  moonblast
  moongeistbeam
  moonlight
  morningsun
  mortalspin
  mountaingale
  mudbomb
  muddywater
  mudshot
  mudslap
  mudsport
  multiattack
  mysticalfire
  mysticalpower
  nastyplot
  naturalgift
  naturepower
  naturesmadness
  needlearm
  neverendingnightmare
  nightdaze
  nightmare
  nightshade
  nightslash
  nobleroar
  noretreat
  noxioustorque
  nuzzle
  oblivionwing
  obstruct
  oceanicoperetta
  octazooka
  octolock
  odorsleuth
  ominouswind
  orderup
  originpulse
  outrage
  overdrive
  overheat
  painsplit
  paleowave
  paraboliccharge
  partingshot
  payback
  payday
  peck
  perishsong
  petalblizzard
  petaldance
  phantomforce
  photongeyser
  pikapapow
  pinmissile
  plasmafists
  playnice
  playrough
  pluck
  poisonfang
  poisongas
  poisonjab
  poisonpowder
  poisonsting
  poisontail
  pollenpuff
  poltergeist
  populationbomb
  pounce
  pound
  powder
  powdersnow
  powergem
  powershift
  powersplit
  powerswap
  powertrick
  powertrip
  poweruppunch
  powerwhip
  precipiceblades
  present
  prismaticlaser
  protect
  psybeam
  psychic
  psychicfangs
  psychicterrain
  psychoboost
  psychocut
  psychoshift
  psychup
  psyshieldbash
  psyshock
  psystrike
  psywave
  pulverizingpancake
  punishment
  purify
  pursuit
  pyroball
  quash
  quickattack
  quickguard
  quiverdance
  rage
  ragefist
  ragepowder
  ragingbull
  ragingfury
  raindance
  rapidspin
  razorleaf
  razorshell
  razorwind
  recover
  recycle
  reflect
  reflecttype
  refresh
  relicsong
  rest
  retaliate
  return
  revelationdance
  revenge
  reversal
  revivalblessing
  risingvoltage
  roar
  roaroftime
  rockblast
  rockclimb
  rockpolish
  rockslide
  rocksmash
  rockthrow
  rocktomb
  rockwrecker
  roleplay
  rollingkick
  rollout
  roost
  rototiller
  round
  ruination
  sacredfire
  sacredsword
  safeguard
  saltcure
  sandattack
  sandsearstorm
  sandstorm
  sandtomb
  sappyseed
  savagespinout
  scald
  scaleshot
  scaryface
  scorchingsands
  scratch
  screech
  searingshot
  searingsunrazesmash
  secretpower
  secretsword
  seedbomb
  seedflare
  seismictoss
  selfdestruct
  shadowball
  shadowbone
  shadowclaw
  shadowforce
  shadowpunch
  shadowsneak
  shadowstrike
  sharpen
  shatteredpsyche
  shedtail
  sheercold
  shellsidearm
  shellsmash
  shelltrap
  shelter
  shiftgear
  shockwave
  shoreup
  signalbeam
  silktrap
  silverwind
  simplebeam
  sing
  sinisterarrowraid
  sizzlyslide
  sketch
  skillswap
  skittersmack
  skullbash
  skyattack
  skydrop
  skyuppercut
  slackoff
  slam
  slash
  sleeppowder
  sleeptalk
  sludge
  sludgebomb
  sludgewave
  smackdown
  smartstrike
  smellingsalts
  smog
  smokescreen
  snaptrap
  snarl
  snatch
  snipeshot
  snore
  snowscape
  soak
  softboiled
  solarbeam
  solarblade
  sonicboom
  soulstealing7starstrike
  spacialrend
  spark
  sparklingaria
  sparklyswirl
  spectralthief
  speedswap
  spicyextract
  spiderweb
  spikecannon
  spikes
  spikyshield
  spinout
  spiritbreak
  spiritshackle
  spite
  spitup
  splash
  splinteredstormshards
  splishysplash
  spore
  spotlight
  springtidestorm
  stealthrock
  steameruption
  steamroller
  steelbeam
  steelroller
  steelwing
  stickyweb
  stockpile
  stokedsparksurfer
  stomp
  stompingtantrum
  stoneaxe
  stoneedge
  storedpower
  stormthrow
  strangesteam
  strength
  strengthsap
  stringshot
  struggle
  strugglebug
  stuffcheeks
  stunspore
  submission
  substitute
  subzeroslammer
  suckerpunch
  sunnyday
  sunsteelstrike
  superfang
  superpower
  supersonic
  supersonicskystrike
  surf
  surgingstrikes
  swagger
  swallow
  sweetkiss
  sweetscent
  swift
  switcheroo
  swordsdance
  synchronoise
  synthesis
  tackle
  tailglow
  tailslap
  tailwhip
  tailwind
  takedown
  takeheart
  tarshot
  taunt
  tearfullook
  teatime
  technoblast
  tectonicrage
  teeterdance
  telekinesis
  teleport
  tenmillionvoltthunderbolt
  terablast
  terrainpulse
  thief
  thousandarrows
  thousandwaves
  thrash
  throatchop
  thunder
  thunderbolt
  thundercage
  thunderfang
  thunderouskick
  thunderpunch
  thundershock
  thunderwave
  tickle
  tidyup
  topsyturvy
  torchsong
  torment
  toxic
  toxicspikes
  toxicthread
  trailblaze
  transform
  triattack
  trick
  trickortreat
  trickroom
  triplearrows
  tripleaxel
  tripledive
  triplekick
  tropkick
  trumpcard
  twinbeam
  twineedle
  twinkletackle
  twister
  uproar
  uturn
  vacuumwave
  vcreate
  veeveevolley
  venomdrench
  venoshock
  victorydance
  vinewhip
  visegrip
  vitalthrow
  voltswitch
  volttackle
  wakeupslap
  waterfall
  watergun
  waterpledge
  waterpulse
  watershuriken
  watersport
  waterspout
  wavecrash
  weatherball
  whirlpool
  whirlwind
  wickedblow
  wickedtorque
  wideguard
  wildboltstorm
  wildcharge
  willowisp
  wingattack
  wish
  withdraw
  wonderroom
  woodhammer
  workup
  worryseed
  wrap
  wringout
  xscissor
  yawn
  zapcannon
  zenheadbutt
  zingzap
  zippyzap
}

"The types in Pokémon"
enum TypesEnum {
  bug
  dark
  dragon
  electric
  fairy
  fighting
  fire
  flying
  ghost
  grass
  ground
  ice
  normal
  poison
  psychic
  rock
  steel
  water
}

"The variants of why an item or move can be non-standard in the current meta or generation."
enum IsNonStandard {
  "When set the item or move is from a past generation. This means it is not available at all in the data of Generation 9."
  Past
  "When set the item or move is available within the generation 9 data, however is cannot currently be obtained. It is safe to presume that Gamefreak/Nintendo will add it in later DLC."
  Unobtainable
  "When set the item or move is from Smogon's CAP project and is not in the official Nintendo games."
  CAP
  "When set the item or move is exclusive to the Let's Go Pikachu / Let's Go Eevee games."
  LetsGoPikachuEevee
  "When set the move can exclusively be used Pokémon Sword and Pokémon Shield as it requires Gigantamaxing your Pokémon."
  Gigantamax
}

`;
