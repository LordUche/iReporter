import { Router } from "express";
import IncidentsController from "../controllers/incidents.controller";

const router = new Router();

router.get("/:type(red-flags|interventions)", IncidentsController.index);
router.get("/:type(red-flags|interventions)/:id", IncidentsController.get);
router.post("/:type(red-flags|interventions)/", IncidentsController.create);
router.patch(
  "/:type(red-flags|interventions)/:id/:field(location|comment)",
  IncidentsController.update
);
router.delete(
  "/:type(red-flags|interventions)/:id",
  IncidentsController.delete
);

export default router;
