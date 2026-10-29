// Configure an existing support-inbox webhook; never report delivery without acknowledgement.
const categories = new Set(["Sign-in","Integrations","Credits and billing","Data and privacy","Other"]);
export async function POST(request: Request) {
 const origin=request.headers.get("origin");
 if(origin&&origin!==new URL(request.url).origin)return Response.json({error:"Request origin is not allowed."},{status:403});
 if(!request.headers.get("content-type")?.includes("application/json"))return Response.json({error:"Send a JSON request."},{status:415});
 let raw:string;try{raw=await request.text()}catch{return Response.json({error:"Unable to read your request."},{status:400})}
 if(raw.length>15000)return Response.json({error:"Your request is too large."},{status:413});
 let body:Record<string,unknown>;try{const data=JSON.parse(raw);if(!data||typeof data!=="object"||Array.isArray(data))throw new Error();body=data}catch{return Response.json({error:"Invalid request."},{status:400})}
 const name=typeof body.name==="string"?body.name.trim():"";const email=typeof body.email==="string"?body.email.trim():"";const category=typeof body.category==="string"?body.category:"";const message=typeof body.message==="string"?body.message.trim():"";
 if(body.website)return Response.json({error:"Unable to send this request."},{status:400});
 if(name.length<1||name.length>120||email.length>254||!/^\S+@\S+\.\S+$/.test(email)||!categories.has(category)||message.length<10||message.length>5000)return Response.json({error:"Please check your name, email, category and message."},{status:400});
 const endpoint=process.env.SUPPORT_WEBHOOK_URL;
 if(!endpoint)return Response.json({error:"The support form is not connected yet. Your request was not sent. Email arine.soem@gmail.com or use WhatsApp."},{status:503});
 try{
  const target=new URL(endpoint);if(target.protocol!=="https:")throw new Error("HTTPS required");
  const response=await fetch(target,{method:"POST",headers:{"Content-Type":"application/json",...(process.env.SUPPORT_WEBHOOK_TOKEN?{Authorization:`Bearer ${process.env.SUPPORT_WEBHOOK_TOKEN}`}:{})},body:JSON.stringify({to:"arine.soem@gmail.com",name,email,category,message}),signal:AbortSignal.timeout(12000),redirect:"error"});
  if(!response.ok)throw new Error("Delivery rejected");
  // The configured endpoint must return an explicit delivery acknowledgement.
  const receipt=await response.json();if(receipt.delivered!==true)throw new Error("No delivery acknowledgement");
  return Response.json({delivered:true});
 }catch{return Response.json({error:"We couldn’t confirm delivery. Please email arine.soem@gmail.com or use WhatsApp."},{status:502})}
}
