const NAMESPACE = 'BIOHACKING';

export const user = {
  login: `${NAMESPACE}_USER_LOGIN`,
  loginFailure: `${NAMESPACE}_USER_LOGIN_ERROR`,
  logged: `${NAMESPACE}_USER_LOGGED`,
  loaded: `${NAMESPACE}_USER_LOADED`,
  logout: `${NAMESPACE}_USER_LOGOUT`,
}

export const activities = {
  request: `${NAMESPACE}_ACTIVITIES_REQUEST`,
  search: `${NAMESPACE}_ACTIVITIES_SEARCH`,
  requestSucess: `${NAMESPACE}_ACTIVITIES_REQUEST_SUCCESS`,
  edit: `${NAMESPACE}_ACTIVITIES_EDIT`,
  update: `${NAMESPACE}_ACTIVITIES_UPDATE`,
  updateSuccess: `${NAMESPACE}_ACTIVITIES_UPDATE_SUCCESS`,
}

export const kinds = {
  request: `${NAMESPACE}_KINDS_REQUEST`,
  requestSucess: `${NAMESPACE}_KINDS_REQUEST_SUCCESS`,
}

export const error = {
  login: `${NAMESPACE}_ERROR_LOGIN`,
}

const actions = {
  error,
  user,
  activities,
  kinds,
}

export const nextAction = (type) => ({
  success: (payload) => ({
    type: `${type}_SUCCESS`,
    payload
  })
});

export const defaultCrudAction = (
  dispatch, actionType, entity, method = 'GET', url
) => {
  return (payload) => {
    dispatch({
      entity,
      method,
      url,
      type: actionType,
      payload,
    });
  }
}

export const kindsAction = (dispatch) => {
  return {
    doRequest: defaultCrudAction(dispatch, kinds.request, 'kinds'),
    create: defaultCrudAction(dispatch, activities.update, 'activities', 'POST'),
  }
}


export const defaultAction = (dispatch, actionType) => {
  return (payload) => {
    dispatch({
      type: actionType,
      payload,
    });
  }
}

export const doLoginAction = (dispatch) => {
  return {
    doLogin: defaultAction(dispatch, actions.user.login),
    doRedirectAfterLogged: defaultAction(dispatch, actions.user.logged),
  }
}

export const doLogoutAction = (dispatch) => {
  return {
    doLogout: defaultAction(dispatch, actions.user.logout),
  }
}

export const activityMapToDispatch = (dispatch) => {
  return {
    doRequest: defaultAction(dispatch, actions.activities.request),
    doSearch:  defaultAction(dispatch, actions.activities.search),
    doUpdate: defaultAction(dispatch, actions.activities.update),
  }
}

export default actions;
