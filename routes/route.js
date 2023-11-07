const router = require("express").Router();
const {
  render,
  create,
  update,
  remove,
  success,
} = require("./../controllers/controller");

router.get("/", render);
router.post("/create", create);
router.post("/update/", update);
router.post("/remove/", remove);

module.exports = router;
