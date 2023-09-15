import nodemailer from 'nodemailer';

const {GMAIL_USER, GMAIL_PASSWORD} = process.env
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user:GMAIL_USER,
      pass:GMAIL_PASSWORD
    },
    tls:{
      rejectUnauthorized:false
    }
})

export const mailUserPassword = async(params:Record<string, string>)=>{
    try {
        const info = await transport.sendMail({
            from: process.env.GMAIL_USER,
            to: params.to,
            subject: "PASSWORD NOTIFICATION",
            html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                    }
            
                    .container {
                        max-width: 90%;
                        margin: auto;
                        padding: 20px;
                        border: 1px solid #e0e0e0;
                        border-radius: 10px;
                        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    }
            
                    h2 {
                        color: #1A512E;;
                        text-align: center;
                        font-weight: 800;
                    }
            
                    p {
                        margin-bottom: 30px;
                        color: #777777;
                        text-align: center;
                        font-size: 20px;
                    }
            
                    .otp {
                        font-size: 40px;
                        letter-spacing: 2px;
                        text-align: center;
                        color: #ff9900;
                        display: block;
                        margin-top: 20px;
                    }

                    .change {
                        color: red;
                    }

                    .team {
                        color: #1A512E;
                        font-weight: 800
                    }
            
                    .signature {
                        color: #444444;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Welcome to KOB-ETIBE SAVINGS</h2>
                    <p>Below is your password.</p>
                    <span class="otp">Password: ${params.password}</span>
                    <p> <span class="change">After login, please change you password</span></p>
                    <p class="signature">Thank You<br><span class="team">TEAM KOB-ETIBE</span></p>
                </div>
            </body>
            </html>`
            
        })

        return info;
    } catch (error) {
        console.log(error)
    }
}