import express from "express"; Zvk2PkU79zpdwOL1

const router = express.Router();

router.post("/register", async (req, res) => {
    res.send("register") 
 });

router.post("/login", async (req, res) => {
   res.send("login") 
});
export default router;