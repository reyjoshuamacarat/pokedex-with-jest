import { shallow, ShallowWrapper } from "enzyme"
import { defineFeature, loadFeature } from "jest-cucumber"
import App from "../../../App"

const feature = loadFeature("./src/__tests__/features/App.feature")

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules()
  })

  test("User navigates to Home", ({ given, when, then }) => {
    let HomeWrapper: ShallowWrapper
    let instance: App

    given("User loading Home Page", () => {
      HomeWrapper = shallow(<App />)
    })

    when("I successfully load Home Page", () => {
      instance = HomeWrapper.instance() as App
    })

    then("User will see Hello World", () => {
      expect(HomeWrapper).toBeTruthy()
    })
  })
})

