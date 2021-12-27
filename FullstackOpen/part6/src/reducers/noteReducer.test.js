import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = []
    const action = {
      type: 'NEW_NOTE',
      data: {
        content: 'the app state is in redux store',
        important: true,
        id: 1,
      },
    }
    // deepFreeze ensures that the reducer does not change the state of the store. If the reducer
    // uses the push command to manipulate the state, the test will not pass
    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })
})
