const Roles = {
  ADMIN: "admin",
  SALES_MANAGER: "sales_manager",
  SALES_REPRESENTATIVE: "sales_representative",
};

const RoleType = {
  values: [Roles.ADMIN, Roles.SALES_MANAGER, Roles.SALES_REPRESENTATIVE],
  defaultValue: Roles.SALES_REPRESENTATIVE,
};

module.exports = { RoleType, Roles };
