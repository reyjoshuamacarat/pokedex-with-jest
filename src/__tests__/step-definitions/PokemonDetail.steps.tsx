import { shallow, ShallowWrapper } from "enzyme"
import { defineFeature, loadFeature } from "jest-cucumber"
import { PokemonDetail, PokemonDetailProps } from "../../pages"
import { mockFetch } from "../../utils"
import { pokemonDetailResponseMock, pokemonMock } from "../../mocks"

const feature = loadFeature("./src/__tests__/features/PokemonDetail.feature")

defineFeature(feature, (test) => {
  let props: any
  beforeEach(() => {
    jest.resetModules()
    jest.resetAllMocks()
    props = {
      navigation: {
        dispatch: jest.fn(),
        setOptions: jest.fn(),
      },
      route: {
        params: {
          pokemon: pokemonMock,
        },
      },
    } as unknown as PokemonDetailProps
    window.fetch = mockFetch(pokemonDetailResponseMock)
  })

  test("Render Pokemon Detail", ({ given, when, then }) => {
    let wrapper: ShallowWrapper
    let instance: PokemonDetail

    given("I am on the Pokemon Detail screen", () => {
      wrapper = shallow(<PokemonDetail {...props} />)
    })

    when("I successfully load Pokemon Detail screen", () => {
      instance = wrapper.instance() as PokemonDetail
      instance.componentDidMount()
    })

    then("I should see details of the Pokemon", () => {
      expect(wrapper).toBeTruthy()
      expect(instance).toBeDefined()
    })
  })
})

