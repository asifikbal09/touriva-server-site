import { Router } from "express";

import { USER_ROLE } from "./user.constant";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { UserValidations } from "./user.validation";

const router = Router();

router.get(
  "/me",
  auth(USER_ROLE.admin, USER_ROLE.tourGuide, USER_ROLE.user),
  UserControllers.getSingleUser
);

router.put(
  '/me',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.updateUserInfo,
);

export const UserRoutes = router;
