import { saveUser, signUpUser } from './userThunk'

export const initialState = {
    status: 'idle',
    userIsLogIn: false,
    firstName: '',
    lastName: '',
    userEmail: '',
    userId: '',
    role: '',
    userProfilePic: ''
  }

  export const reducers = {
    add(state, payload) {
      if (payload.payload) {
        const { name, id, email, profile_pic } = payload.payload
        state.firstName = name
        state.userId = id
        state.userEmail = email
        state.userProfilePic = profile_pic
        state.userIsLogIn = true
      }
    },
    logout(state) {
      // Reset the user state to initial empty state
      localStorage.removeItem("accessToken");
      return initialState;
    },
}


export function extraReducers(builder) {
    builder
      //   // save User
      .addCase(saveUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(saveUser.fulfilled, (state, payload) => {
        state.status = 'succeeded'
        if (payload.payload) {
          const { first_name, id, email, profile_pic, role } = payload.payload
          state.firstName = first_name
          state.userId = id
          state.role = role
          state.userEmail = email
          state.userProfilePic = profile_pic
          state.userIsLogIn = true
        }
      })
      .addCase(saveUser.rejected, (state) => {
        state.status = 'failed'
      })
          // Handle signup user
    .addCase(signUpUser.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(signUpUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if (action.payload) {
        const { first_name, id, email, profile_pic, last_name, role } = action.payload;
        state.firstName = first_name;
        state.lastName = last_name;
        state.userId = id;
        state.role = role;
        state.userEmail = email;
        state.userProfilePic = profile_pic;
        state.userIsLogIn = true;
      }
    })
    .addCase(signUpUser.rejected, (state) => {
      state.status = 'failed';
    });
  }