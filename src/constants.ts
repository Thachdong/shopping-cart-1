export enum EIconName {
  edit = "edit",
  "square-plus" = "square-plus",
  "right-arrow" = "right-arrow",
  "star-outline" = "star-outline",
  "star-fill" = "star-fill",
  plus = "plus",
  minus = "minus",
  close = "close",
  "close-circle" = "close-circle",
  "add-circle" = "add-circle",
  "upload-img" = "upload-img",
  trash = "trash",
  facebook = "facebook",
  instagram = "instagram",
  tiktok = "tiktok",
  youtube = "youtube",
  shopee = "shopee",
  cart = "cart",
  eyes = "eyes",
  "eyes-slash" = "eyes-slash",
  "sign-out" = "sign-out",
  "caret-circle-right" = "caret-circle-right",
  "caret-circle-left" = "caret-circle-left",
  collections = "collections",
  products = "products",
  blogposts = "blogposts",
  orders = "orders",
  "asset-management" = "asset-management",
  settings = "settings",
  users = "users",
  upload = "upload",
  enter = "enter",
}

export enum EToastType {
  success = "success",
  info = "info",
  warning = "warning",
  error = "error",
}

export enum EButtonType {
  normal = "normal",
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
  outline = "outline",
}

export enum ECurrency {
  "VND" = "VND",
  "USD" = "$",
}

export const MAX_PAGE_SIZE = 30;
export const CURRENT_PAGE = 1;
export const TOAST_TIMEOUT = 5000; // 5S
export enum EToastPositions {
  "bottom-left",
  "bottom-right",
  "bottom-center",
  "top-left",
  "top-right",
  "top-center",
}

export const enum EPath {
  products = "products",
  collections = "collections",
  blogs = "blogs",
  cart = "cart",
  checkout = "checkout",
  login = "auth/login",
  register = "auth/register",
  adminCollections = "admin/collections",
  adminProducts = "admin/products",
  adminOrders = "admin/orders",
  adminBlogposts = "admin/blogposts",
  adminAssetManagement = "admin/asset-management",
  adminSettings = "admin/settings",
  adminUsers = "admin/users",
}
