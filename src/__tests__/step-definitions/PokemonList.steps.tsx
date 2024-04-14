import { shallow, ShallowWrapper } from "enzyme"
import { defineFeature, loadFeature } from "jest-cucumber"
import { PokemonList, PokemonListProps } from "../../pages"
import { mockFetch } from "../../utils"
import { pokemonListResponseMock } from "../../mocks"

const feature = loadFeature("./src/__tests__/features/PokemonList.feature")

defineFeature(feature, (test) => {
  let props: any
  beforeEach(() => {
    jest.resetModules()
    jest.resetAllMocks()
    props = {
      navigation: {
        dispatch: jest.fn(),
      },
      route: {},
    } as unknown as PokemonListProps
    window.fetch = mockFetch(pokemonListResponseMock)
  })

  test("Render Pokemon List", ({ given, when, then }) => {
    let wrapper: ShallowWrapper
    let instance: PokemonList

    given("I am on the Pokemon List screen", () => {
      wrapper = shallow(<PokemonList {...props} />)
    })

    when("I successfully load Pokemon List screen", () => {
      instance = wrapper.instance() as PokemonList
      jest.spyOn(instance, "getPokemons")
      instance.componentDidMount()
    })

    then("I should see a list of Pokemon", () => {
      expect(instance.getPokemons).toHaveBeenCalled()
    })
  })
})

