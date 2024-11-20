#!/bin/bash

echo ""
echo "create"
echo ""
export CHANNEL_NAME=fundchannel
export FABRIC_CFG_PATH=./peercfg
export CORE_PEER_LOCALMSPID=CUSTOMERMSP
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/CUSTOMER.fundflow.com/peers/peer0.CUSTOMER.fundflow.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/CUSTOMER.fundflow.com/users/Admin@CUSTOMER.fundflow.com/msp
export CORE_PEER_ADDRESS=localhost:9051
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/fundflow.com/orderers/orderer.fundflow.com/msp/tlscacerts/tlsca.fundflow.com-cert.pem
export CUSTOMER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/CUSTOMER.fundflow.com/peers/peer0.CUSTOMER.fundflow.com/tls/ca.crt
export MO=${PWD}/organizations/peerOrganizations/MO.fundflow.com/peers/peer0.CUSTOMER.fundflow.com/tls/ca.crt
export DMO_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/DMO.fundflow.com/peers/peer0.DMO.fundflow.com/tls/ca.crt
export DHS_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/DHS.fundflow.com/peers/peer0.DHS.fundflow.com/tls/ca.crt
sleep 3
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.fundflow.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n basic \
    --peerAddresses localhost:7051 --tlsRootCertFiles $CUSTOMER_PEER_TLSROOTCERT \
    --peerAddresses localhost:9051 --tlsRootCertFiles $MO \
    --peerAddresses localhost:8051 --tlsRootCertFiles $DMO_PEER_TLSROOTCERT \
    --peerAddresses localhost:11051 --tlsRootCertFiles $DHS_PEER_TLSROOTCERT \
    -c '{"function":"createMedicineRequest","Args":["Req-101", "company1", "100","akhil"]}'
sleep 3


echo ""
echo "Exist"
echo ""
export CHANNEL_NAME=fundchannel
export FABRIC_CFG_PATH=./peercfg
export CORE_PEER_LOCALMSPID=CUSTOMERMSP
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/CUSTOMER.fundflow.com/peers/peer0.CUSTOMER.fundflow.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/CUSTOMER.fundflow.com/users/Admin@CUSTOMER.fundflow.com/msp
export CORE_PEER_ADDRESS=localhost:9051
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/fundflow.com/orderers/orderer.fundflow.com/msp/tlscacerts/tlsca.fundflow.com-cert.pem
export CUSTOMER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/CUSTOMER.fundflow.com/peers/peer0.CUSTOMER.fundflow.com/tls/ca.crt
export MO=${PWD}/organizations/peerOrganizations/CUSTOMER.fundflow.com/peers/peer0.CUSTOMER.fundflow.com/tls/ca.crt
export DMO_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/DMO.fundflow.com/peers/peer0.DMO.fundflow.com/tls/ca.crt
export DHS_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/DHS.fundflow.com/peers/peer0.DHS.fundflow.com/tls/ca.crt
sleep 3
peer chaincode query -C $CHANNEL_NAME -n basic -c '{"function":"wasteExist","Args":["Req-101"]}'
sleep 3


echo ""
echo "read"
echo ""
export CHANNEL_NAME=fundchannel
export FABRIC_CFG_PATH=./peercfg
export CORE_PEER_LOCALMSPID=CUSTOMERMSP
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/CUSTOMER.fundflow.com/peers/peer0.CUSTOMER.fundflow.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/CUSTOMER.fundflow.com/users/Admin@CUSTOMER.fundflow.com/msp
export CORE_PEER_ADDRESS=localhost:9051
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/fundflow.com/orderers/orderer.fundflow.com/msp/tlscacerts/tlsca.fundflow.com-cert.pem
export CUSTOMER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/CUSTOMER.fundflow.com/peers/peer0.CUSTOMER.fundflow.com/tls/ca.crt
export MO=${PWD}/organizations/peerOrganizations/CUSTOMER.fundflow.com/peers/peer0.CUSTOMER.fundflow.com/tls/ca.crt
export DMO_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/DMO.fundflow.com/peers/peer0.DMO.fundflow.com/tls/ca.crt
export DHS_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/DHS.fundflow.com/peers/peer0.DHS.fundflow.com/tls/ca.crt
sleep 3
peer chaincode query -C $CHANNEL_NAME -n basic -c '{"function":"readWaste","Args":["Req-101"]}'
sleep 3
