import CapsuleModel from "@/models/capsule.model";
import EmailTemplate from "@/components/EmailTemplate";
import { Resend } from "resend";

const r = new Resend(process.env.RESEND_API_KEY)


export async function GET() {
  if (Request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.status(401).end('Unauthorized');
  }
    const capsules = await CapsuleModel.find();
  
    const today = new Date();
  
    capsules.forEach(async (capsule) => {
      if (
        capsule.locked &&
        (capsule.openingDate).getDate() <= today.getDate()
      ) {
        try {
          const { data, error } = await r.emails.send({
            from: "Reminx <reminix@nidhish.me>",
            to: [capsule.user.email],
            subject: "Your time capsule is ready to be opened!",
            react: EmailTemplate({ capsule: capsule })
          });
  
          if (error) {
            return Response.json({ error });
          }
  
          return Response.json({ data });
        } catch (error) {
          return Response.json({ error });
        }
      } else {
        console.log(capsule.openingDate, today);
      }
    });
    return Response.json({ message: "ok" });
}