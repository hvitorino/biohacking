export const NAMESPACE = 'BIOHACKING';

export const user = {
  login: `${NAMESPACE}_USER_LOGIN`,
  loginFailure: `${NAMESPACE}_USER_LOGIN_ERROR`,
  logged: `${NAMESPACE}_USER_LOGGED`,
  loaded: `${NAMESPACE}_USER_LOADED`,
  logout: `${NAMESPACE}_USER_LOGOUT`,
  register: `${NAMESPACE}_USER_REGISTER`,
  registerFailure: `${NAMESPACE}_USER_ERROR`,
  reset: `${NAMESPACE}_USER_RESET_PASSWORD`,
  resetFailure: `${NAMESPACE}_USER_RESET_PASSWORD_ERROR`,
  hasBeenReset: `${NAMESPACE}_USER_HAS_BEEN_RESET_PASSWORD_MESSAGE`,
  change: `${NAMESPACE}_USER_CHANGE_PASSWORD`,
  changeFailure: `${NAMESPACE}_USER_CHANGE_PASSWORD_ERROR`,
  rememberMe: `${NAMESPACE}_USER_REMEMBER_ME`,
};

export const activities = {
  request: `${NAMESPACE}_ACTIVITIES_REQUEST`,
  search: `${NAMESPACE}_ACTIVITIES_SEARCH`,
  requestSuccess: `${NAMESPACE}_ACTIVITIES_REQUEST_SUCCESS`,
  requestFailure: `${NAMESPACE}_ACTIVITIES_REQUEST_FAILURE`,
  edit: `${NAMESPACE}_ACTIVITIES_EDIT`,
  create: `${NAMESPACE}_ACTIVITIES_CREATE`,
  createSuccess: `${NAMESPACE}_ACTIVITIES_CREATE_SUCCESS`,
  update: `${NAMESPACE}_ACTIVITIES_UPDATE`,
  updateSuccess: `${NAMESPACE}_ACTIVITIES_UPDATE_SUCCESS`,
};

export const kinds = {
  request: `${NAMESPACE}_KINDS_REQUEST`,
  requestSucess: `${NAMESPACE}_KINDS_REQUEST_SUCCESS`,
};

export const error = {
  login: `${NAMESPACE}_ERROR_LOGIN`,
};

const actions = {
  error,
  user,
  activities,
  kinds,
};

export const nextAction = type => ({
  success: payload => ({
    type: `${type}_SUCCESS`,
    payload,
  }),
});

export const defaultCrudAction = (
  dispatch, actionType, entity, method = 'GET', url,
) => (
  payload => (
    dispatch({
      entity,
      method,
      url,
      type: actionType,
      payload,
    })
  )
);

export const defaultAction = (dispatch, actionType) => (
  payload => (
    dispatch({
      type: actionType,
      payload,
    })
  )
);

export const kindsAction = dispatch => (
  {
    request: defaultCrudAction(dispatch, kinds.request, 'kinds'),
    create: defaultAction(dispatch, activities.create),
  }
);

export const doLoginAction = dispatch => (
  {
    doSubmit: defaultAction(dispatch, actions.user.login),
    doRemember: defaultAction(dispatch, actions.user.rememberMe),
  }
);

export const doRegisterAction = dispatch => (
  {
    doSubmit: defaultAction(dispatch, actions.user.register),
  }
);

export const doResetAction = dispatch => (
  {
    doSubmit: defaultAction(dispatch, actions.user.reset),
  }
);

export const doChangeAction = dispatch => (
  {
    doSubmit: defaultAction(dispatch, actions.user.change),
  }
);

export const doLogoutAction = dispatch => (
  {
    doLogout: defaultAction(dispatch, actions.user.logout),
  }
);

export const activityMapToDispatch = dispatch => (
  {
    doRequest: defaultCrudAction(dispatch, actions.activities.request, 'activities'),
    doSearch: defaultAction(dispatch, actions.activities.search),
    doUpdate: defaultAction(dispatch, actions.activities.update),
  }
);

export const mapActivitiesDispatchToProps = dispatch => ({
  request: defaultAction(dispatch, actions.activities.request),
  edit: defaultAction(dispatch, actions.activities.edit),
  update: defaultAction(dispatch, actions.activities.update),
});

export default actions;
