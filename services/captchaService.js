const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

const verifyRecaptcha = async (token) => {
    try {
        const client = new RecaptchaEnterpriseServiceClient({
            keyFilename: 'bookwallet-1725005690392-c150117a661b.json',
        });
        const projectPath = client.projectPath('bookwallet-1725005690392');
    
        const request = {
            assessment: {
                event: {
                    token: token,
                    siteKey: '6Lf4nzIqAAAAABTaHxQjimdmo3uUyOUOlZRp0ba_',
                },
            },
            parent: projectPath,
        };
    
        const [response] = await client.createAssessment(request);
    
        if (!response.tokenProperties.valid) {
            console.log(`Token is invalid: ${response.tokenProperties.invalidReason}`);
            return null;
        }
    
        return response.riskAnalysis.score; 
    } catch (error) {
        console.error("Recaptcha verification error:", error);
        return null;
    }
};

module.exports = { verifyRecaptcha };