let profile = {
    MO: {
        "cryptoPath": "../work/organizations/peerOrganizations/MO.fundflow.com", 
		"keyDirectoryPath": "../work/organizations/peerOrganizations/MO.fundflow.com/users/User1@MO.fundflow.com/msp/keystore/",
        "certPath":     "../work/organizations/peerOrganizations/MO.fundflow.com/users/User1@MO.fundflow.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../work/organizations/peerOrganizations/MO.fundflow.com/peers/peer0.MO.fundflow.com/tls/ca.crt",
		"peerEndpoint": "localhost:9051",
		"peerHostAlias":  "peer0.MO.fundflow.com",
        "mspId": "MOMSP"
    },
    CUSTOMER: {
        "cryptoPath": "../work/organizations/peerOrganizations/CUSTOMER.fundflow.com", 
		"keyDirectoryPath": "../work/organizations/peerOrganizations/CUSTOMER.fundflow.com/users/User1@CUSTOMER.fundflow.com/msp/keystore/",
        "certPath":     "../work/organizations/peerOrganizations/CUSTOMER.fundflow.com/users/User1@CUSTOMER.fundflow.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../work/organizations/peerOrganizations/CUSTOMER.fundflow.com/peers/peer0.CUSTOMER.fundflow.com/tls/ca.crt",
		"peerEndpoint": "localhost:7051",
		"peerHostAlias":  "peer0.CUSTOMER.fundflow.com",
        "mspId": "CUSTOMERMSP"
    },
    DMO: {
        "cryptoPath": "../work/organizations/peerOrganizations/DMO.fundflow.com", 
		"keyDirectoryPath": "../work/organizations/peerOrganizations/DMO.fundflow.com/users/User1@DMO.fundflow.com/msp/keystore/",
        "certPath":     "../work/organizations/peerOrganizations/DMO.fundflow.com/users/User1@DMO.fundflow.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../work/organizations/peerOrganizations/DMO.fundflow.com/peers/peer0.DMO.fundflow.com/tls/ca.crt",
		"peerEndpoint": "localhost:11051",
		"peerHostAlias":  "peer0.DMO.fundflow.com",
        "mspId": "DMOMSP"
    },
    DHS: {
        "cryptoPath": "../work/organizations/peerOrganizations/DHS.fundflow.com", 
		"keyDirectoryPath": "../work/organizations/peerOrganizations/DHS.fundflow.com/users/User1@DHS.fundflow.com/msp/keystore/",
        "certPath":     "../work/organizations/peerOrganizations/DHS.fundflow.com/users/User1@DHS.fundflow.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../work/organizations/peerOrganizations/DHS.fundflow.com/peers/peer0.DHS.fundflow.com/tls/ca.crt",
		"peerEndpoint": "localhost:10051",
		"peerHostAlias":  "peer0.DHS.fundflow.com",
        "mspId": "DHSMSP"
    }
}
module.exports = { profile }