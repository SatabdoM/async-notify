import express,{Request,Response} from "express";
import { z } from "zod";
import { sendEvent } from "../producer";

const router = express.Router();

const schema = z.object({
  userId: z.string(),
  type: z.enum(["FOLLOW", "LIKE", "COMMENT"]),
  content: z.string(),
});
type EventPayload=z.infer<typeof schema>

router.post("/trigger-event", async (req: Request<{}, {}, EventPayload>, res: Response) => {
  try {
    const data = schema.parse(req.body);
    await sendEvent(data);
    return res.status(200).json({
      message: "Event sent to Kafka",
    });
  } 
  catch (error) {
    return res.status(400).json({error: 'Invalid payload'})
  }
});

export default router