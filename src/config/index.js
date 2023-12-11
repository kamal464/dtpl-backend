const PORT = process.env.PORT;

const MONGODB_CON_URL = 'mongodb+srv://adminuser:pt5AQgBJHIGQrtVI@ssserverless.mglg2.mongodb.net/sas-app?retryWrites=true&w=majority';
const orgId = process.env.orgId || 'abcde';
module.exports = {
    PORT,
    MONGODB_CON_URL,
    orgId,
}