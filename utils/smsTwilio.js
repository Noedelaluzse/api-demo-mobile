const twilio = require('twilio');

const client = twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

const sendVerificationSMS = async (phone) => {
    try {
        // Validar el número de teléfono si es necesario
        
        const verification = await client.verify.v2
        .services(process.env.VERIFYSID)
        .verifications.create({ to: phone, channel: "sms" })

        return verification.status;
    } catch (error) {
        console.error('Error al enviar el mensaje de verificación:', error);
        throw error;
    }
};

const verifySmsTwilio = async(phone, code) => {
    console.log(phone);
    console.log(code);
    try {
        const verification = await client.verify.v2
        .services(process.env.VERIFYSID)
        .verificationChecks.create({to: phone, code: code});
        return verification.status;
    } catch (error) {
        console.error('Error al verificar el mensaje de verificación:', error);
        throw error;
    }

}

module.exports = {sendVerificationSMS, verifySmsTwilio};