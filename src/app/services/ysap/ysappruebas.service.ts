import { Injectable } from '@nestjs/common';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

@Injectable()
export class YsapPruebasService {
    connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: QRCodeModal,
      });


    async connectTrush(){
       // console.log(this.connector);
        

        if (!this.connector.connected) {
          this.connector.createSession();
          console.log('conexion creada ');
            console.log(this.connector);
            
        }
      
        this.connector.on("connect", (error, payload) => {
            console.log("connect");
            
          if (error) {
            throw error;
          }
        
          const { accounts, chainId } = payload.params[0];
          console.log(accounts, chainId);
          
        });
        
        this.connector.on("session_update", (error, payload) => {
            console.log('conexion actualizada ');

          if (error) {
            console.log(error);

            throw error;
            
          }
        
          // Get updated accounts and chainId
          const { accounts, chainId } = payload.params[0];
        });
        
        this.connector.on("disconnect", (error, payload) => {
            console.log('conexion desconectada ');

          if (error) {
            console.log(error);

            throw error;
          }
        
          // Delete connector
        });

      /*  //@ts-ignore
        const request = this.connector._formatRequest({
            method: 'get_accounts',
        });
        
        //@ts-ignore
        this.connector._sendCallRequest(request).then(result => {
            // Returns the accounts
            console.log(result);
          })
          .catch(error => {
            // Error returned when rejected
            console.error(error);
          });*/
      
      }


      async sendTrasaction(){
        const provider = new WalletConnectProvider({
            infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
          });

          await provider.enable();

        //const web3 = new Web3(provider)
        //const web3Provider = new providers.Web3Provider(provider);

        /*const message = "My email is john@doe.com - 1537836206101"

        const msgParams = [
          convertUtf8ToHex(message),                                                 // Required
          "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3"                               // Required
        ];
        
        
        // Sign personal message
        this.connector
          .signPersonalMessage(msgParams)
          .then((result) => {
            // Returns signature.
            console.log(result)
          })
          .catch(error => {
            // Error returned when rejected
            console.error(error);
          })
*/

/////////////////////////////////////////////////

        /*const tx = {
            from: "0xd95339Dbf45e97c6C0a25e2Aa47f10866678E633", // Required
            to: "0x5B04A5319d85C9597A435B00fDa2E21a84fEB1A4", // Required (for non contract deployments)
            data: "did:3:bafyreichfgxmiaxvqwsvo3tl7pspfupb4z7ym554agkzqol5qtx3uid73i", // Required
           // gasPrice: "0x02540be400", // Optional
           // gas: "0x9c40", // Optional
           // value: "0x00", // Optional
           // nonce: "0x0114", // Optional
          };
          
          // Send transaction
          this.connector
            .sendTransaction(tx)
            .then((result) => {
              // Returns transaction id (hash)
              console.log(result);
            })
            .catch((error) => {
              // Error returned when rejected
              console.error(error);
            });*/
      }
      
}
