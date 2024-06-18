const Permissions = {
  NONE: "none",
  VIEW_USER: "view_user",
  CREATE_USER: "create_user",
  UPDATE_USER: "update_user",
  DELETE_USER: "delete_user",
  GRANT_VIEW_ACCESS: "grant_view_access",
  RESET_PASSWORD: "reset_password",
  FREEZE_USER: "freeze_user",
  GRANT_CRUD_ACCESS: "grant_crud_access",
  CREATE_CLIENT: "create_client",
  VIEW_CLIENT: "view_client",
  UPDATE_CLIENT: "update_client",
  DELETE_CLIENT: "delete_client",
  GRANT_APPROVAL: "grant_approval",
};

const PermissionType = {
  values: Object.values(Permissions),
  defaultValue: Permissions.NONE,
};

module.exports = { Permissions, PermissionType };
