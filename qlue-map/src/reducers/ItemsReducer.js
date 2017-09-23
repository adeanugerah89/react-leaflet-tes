const initialState = {
  listItem: []
}

export default (state=initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {...state, listItem: action.payload.listData}  
    default:
      return state
  }
}