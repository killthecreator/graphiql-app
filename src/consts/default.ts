export const defaultOperations = `

  query (
    $offset: Int
    $take: Int
    $reverse: Boolean
    $offsetFlavorTexts: Int
    $takeFlavorTexts: Int
    $reverseFlavorTexts: Boolean
  ) {
    getAllPokemon(
      offset: $offset
      take: $take
      reverse: $reverse
      offsetFlavorTexts: $offsetFlavorTexts
      takeFlavorTexts: $takeFlavorTexts
      reverseFlavorTexts: $reverseFlavorTexts
    ) {
      key
      backSprite
      baseForme
      baseSpecies
      baseStats {
        attack
        defense
        hp
        specialattack
        specialdefense
        speed
      }
      baseStatsTotal
      bulbapediaPage
      catchRate {
        base
        percentageWithOrdinaryPokeballAtFullHealth
      }
      color
      cosmeticFormes
      eggGroups
      evolutionLevel
      evolutions {
        key
        backSprite
        baseForme
        baseSpecies
        baseStatsTotal
        bulbapediaPage
        color
        cosmeticFormes
        eggGroups
        evolutionLevel
        forme
        formeLetter
        height
        isEggObtainable
        levellingRate
        maximumHatchTime
        minimumHatchTime
        num
        otherFormes
        serebiiPage
        shinyBackSprite
        shinySprite
        smogonPage
        smogonTier
        species
        sprite
        weight
        mythical
        legendary
      }
      evYields {
        attack
        defense
        hp
        specialattack
        specialdefense
        speed
      }
      flavorTexts {
        flavor
        game
      }
      forme
      formeLetter
      gender {
        female
        male
      }
      height
      isEggObtainable
      levellingRate
      maximumHatchTime
      minimumHatchTime
      num
      otherFormes
      preevolutions {
        key
        backSprite
        baseForme
        baseSpecies
        baseStatsTotal
        bulbapediaPage
        color
        cosmeticFormes
        eggGroups
        evolutionLevel
        forme
        formeLetter
        height
        isEggObtainable
        levellingRate
        maximumHatchTime
        minimumHatchTime
        num
        otherFormes
        serebiiPage
        shinyBackSprite
        shinySprite
        smogonPage
        smogonTier
        species
        sprite
        weight
        mythical
        legendary
      }
      serebiiPage
      shinyBackSprite
      shinySprite
      smogonPage
      smogonTier
      species
      sprite
      types {
        name
      }
      weight
      mythical
      legendary
    }
  }` as const;

export const defaultVariables = `
  {
    "offset": 42,
    "take": 42,
    "reverse": true,
    "offsetFlavorTexts": 42,
    "takeFlavorTexts": 42,
    "reverseFlavorTexts": true
  }
` as const;
